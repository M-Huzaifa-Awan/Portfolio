const TTL_MS = 45_000;
const UMAMI_CACHE_MS = 10_000;
const SESSION_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type PresenceMap = Map<string, number>;

const g = globalThis as typeof globalThis & {
  __haPresence?: PresenceMap;
  __haUmamiCache?: { count: number; exp: number };
};

export function isSessionId(id: unknown): id is string {
  return typeof id === "string" && SESSION_RE.test(id);
}

function memoryStore(): PresenceMap {
  if (!g.__haPresence) g.__haPresence = new Map();
  return g.__haPresence;
}

function prune(now: number) {
  const store = memoryStore();
  for (const [id, ts] of store) {
    if (now - ts > TTL_MS) store.delete(id);
  }
}

function memoryHeartbeat(id: string): number {
  const now = Date.now();
  const store = memoryStore();
  store.set(id, now);
  prune(now);
  return store.size;
}

function memoryCount(): number {
  prune(Date.now());
  return memoryStore().size;
}

async function redisCommand(cmds: (string | number)[][]): Promise<unknown[] | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmds),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as Array<{ result?: unknown }>;
  return rows.map((row) => row.result);
}

async function redisHeartbeat(id: string): Promise<number | null> {
  const now = Date.now();
  const cutoff = now - TTL_MS;
  const results = await redisCommand([
    ["ZADD", "ha:presence", now, id],
    ["ZREMRANGEBYSCORE", "ha:presence", 0, cutoff],
    ["ZCARD", "ha:presence"],
  ]);
  if (!results) return null;
  const card = Number(results[2] ?? 0);
  return Number.isFinite(card) ? card : 0;
}

async function redisCount(): Promise<number | null> {
  const cutoff = Date.now() - TTL_MS;
  const results = await redisCommand([
    ["ZREMRANGEBYSCORE", "ha:presence", 0, cutoff],
    ["ZCARD", "ha:presence"],
  ]);
  if (!results) return null;
  const card = Number(results[1] ?? 0);
  return Number.isFinite(card) ? card : 0;
}

async function umamiCount(): Promise<number | null> {
  const key = process.env.UMAMI_API_KEY;
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  if (!key || !websiteId) return null;

  const cached = g.__haUmamiCache;
  if (cached && cached.exp > Date.now()) return cached.count;

  const base = process.env.UMAMI_API_URL ?? "https://api.umami.is/v1";
  const res = await fetch(`${base}/websites/${websiteId}/active`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;

  const data = (await res.json()) as { visitors?: number; x?: number };
  const count = Number(data.visitors ?? data.x ?? 0);
  if (!Number.isFinite(count)) return null;

  g.__haUmamiCache = { count, exp: Date.now() + UMAMI_CACHE_MS };
  return count;
}

/** Record a viewer heartbeat and return how many sessions are still live. */
export async function recordPresence(id: string): Promise<number> {
  const umami = await umamiCount();
  if (umami != null) return umami;

  const redis = await redisHeartbeat(id);
  if (redis != null) return redis;

  return memoryHeartbeat(id);
}

export async function currentPresence(): Promise<number> {
  const umami = await umamiCount();
  if (umami != null) return umami;

  const redis = await redisCount();
  if (redis != null) return redis;

  return memoryCount();
}
