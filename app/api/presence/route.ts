import { NextResponse } from "next/server";
import {
  currentPresence,
  isSessionId,
  recordPresence,
} from "@/lib/presence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const count = await currentPresence();
  return NextResponse.json({ count });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = (body as { id?: unknown }).id;
  if (!isSessionId(id)) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const count = await recordPresence(id);
  return NextResponse.json({ count });
}
