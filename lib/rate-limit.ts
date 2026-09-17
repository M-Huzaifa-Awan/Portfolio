const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

type Bucket = { count: number; resetAt: number };

const g = globalThis as typeof globalThis & {
  __haSubmitLimit?: Map<string, Bucket>;
};

function memoryStore(): Map<string, Bucket> {
  if (!g.__haSubmitLimit) g.__haSubmitLimit = new Map();
  return g.__haSubmitLimit;
}

async function redisLimited(ip: string): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const key = `ha:rl:submit:${ip}`;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, WINDOW_MS / 1000, "NX"],
    ]),
    cache: "no-store",
  });
  if (!res.ok) return null;

  const rows = (await res.json()) as Array<{ result?: unknown }>;
  const count = Number(rows[0]?.result ?? 0);
  return count > MAX_HITS;
}

function memoryLimited(ip: string): boolean {
  const now = Date.now();
  const store = memoryStore();
  const current = store.get(ip);

  if (!current || now >= current.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_HITS;
}

/** True when this IP has already used its submit budget. */
export async function isSubmitRateLimited(ip: string): Promise<boolean> {
  try {
    const redis = await redisLimited(ip);
    if (redis != null) return redis;
  } catch {
    // Fall through to the in-process limiter.
  }
  return memoryLimited(ip);
}
