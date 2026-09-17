import { NextResponse } from "next/server";
import { isSubmitRateLimited } from "@/lib/rate-limit";
import { turnstileConfigured, verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const MIN_AGE_MS = 2_500;
const MAX_AGE_MS = 30 * 60 * 1000;
const MAX_MESSAGE = 2_000;
const MAX_NAME = 120;
const MAX_EMAIL = 254;

type Kind = "contact" | "feedback";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-vercel-forwarded-for") ||
    "unknown"
  );
}

function asString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const kind = body.kind === "feedback" ? "feedback" : body.kind === "contact" ? "contact" : null;
  if (!kind) {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }

  // Honeypot: bots that fill hidden fields get a fake success, no email.
  if (asString(body.website, 200) || asString(body.botcheck, 200)) {
    return NextResponse.json({ success: true });
  }

  const openedAt = Number(body.openedAt);
  if (!Number.isFinite(openedAt)) {
    return NextResponse.json({ error: "Couldn't verify this submission." }, { status: 403 });
  }
  const age = Date.now() - openedAt;
  if (age < MIN_AGE_MS || age > MAX_AGE_MS) {
    return NextResponse.json({ error: "Couldn't verify this submission." }, { status: 403 });
  }

  const ip = clientIp(request);
  if (turnstileConfigured()) {
    const token = asString(body.turnstileToken, 2048);
    const ok = await verifyTurnstile(token, ip === "unknown" ? null : ip);
    if (!ok) {
      return NextResponse.json(
        { error: "Human verification failed. Refresh and try again." },
        { status: 403 },
      );
    }
  }

  if (await isSubmitRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a bit." },
      { status: 429 },
    );
  }

  const message = asString(body.message, MAX_MESSAGE);
  if (message.length < 2) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 });
  }

  const accessKey =
    process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "Form delivery isn't configured." }, { status: 503 });
  }

  const payload: Record<string, string> = {
    access_key: accessKey,
    message,
  };

  if (kind === "contact") {
    const name = asString(body.name, MAX_NAME);
    const email = asString(body.email, MAX_EMAIL);
    if (!name || !isEmail(email)) {
      return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
    }
    payload.subject = `Portfolio enquiry from ${name}`;
    payload.from_name = "Portfolio";
    payload.name = name;
    payload.email = email;
  } else {
    const place = asString(body.approx_location, 80) || "Unknown";
    payload.subject = `Anonymous feedback — ${place}`;
    payload.from_name = "Anonymous (Portfolio)";
    payload.approx_location = place;
    payload.page = asString(body.page, 300);
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const text = await res.text();
    let json: { success?: boolean; message?: string };
    try {
      json = JSON.parse(text) as { success?: boolean; message?: string };
    } catch {
      console.error("Web3Forms non-JSON:", res.status, text.slice(0, 500));
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }
    if (!json.success) {
      console.error("Web3Forms rejected submit:", res.status, json);
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }
}
