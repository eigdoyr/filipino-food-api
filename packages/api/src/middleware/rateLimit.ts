import { Context, Next } from "hono";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 60;

export async function rateLimit(c: Context, next: Next) {
  const kv = (c.env as any)?.RATE_LIMIT;

  if (!kv) {
    await next();
    return;
  }

  const ip = c.req.header("cf-connecting-ip") ?? "unknown";
  const key = `rate:${ip}`;
  const now = Date.now();

  const raw = await kv.get(key);
  const data = raw ? JSON.parse(raw) : { count: 0, start: now };

  if (now - data.start > WINDOW_MS) {
    data.count = 0;
    data.start = now;
  }

  if (data.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - data.start)) / 1000);
    return c.json({ error: "Rate limit exceeded" }, 429, {
      "Retry-After": String(retryAfter),
    });
  }

  data.count++;
  await kv.put(key, JSON.stringify(data), { expirationTtl: 60 });

  await next();
}
