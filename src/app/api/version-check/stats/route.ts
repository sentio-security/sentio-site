import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const TOTAL_KEY = "sentio:pings:total";
const BY_VERSION_KEY = "sentio:pings:by_version";
const UNIQUE_MACHINES_KEY = "sentio:machines:unique";

// Simple token check so the counts aren't publicly readable.
// Set STATS_SECRET in Vercel env vars and pass it as ?secret=<value>.
const SECRET = process.env.STATS_SECRET;

export async function GET(request: NextRequest) {
  if (SECRET) {
    const provided = request.nextUrl.searchParams.get("secret");
    if (provided !== SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  if (!redis) {
    return NextResponse.json({ error: "redis not configured" }, { status: 503 });
  }

  const [total, uniqueMachines, byVersionRaw] = await Promise.all([
    redis.get<number>(TOTAL_KEY),
    redis.scard(UNIQUE_MACHINES_KEY),
    redis.hgetall<Record<string, number>>(BY_VERSION_KEY),
  ]);

  return NextResponse.json({
    total_pings: total ?? 0,
    unique_machines: uniqueMachines ?? 0,
    by_version: byVersionRaw ?? {},
  });
}
