import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const TOTAL_KEY = "sentio:pings:total";
const BY_VERSION_KEY = "sentio:pings:by_version";

export async function GET(request: NextRequest) {
  const version = request.nextUrl.searchParams.get("version") ?? "unknown";

  if (redis) {
    try {
      await redis.incr(TOTAL_KEY);
      await redis.hincrby(BY_VERSION_KEY, version, 1);
    } catch {
      // A Redis hiccup should never break the response to the CLI.
    }
  }

  const latest = process.env.SENTIO_LATEST_VERSION ?? version;
  return NextResponse.json({ latest });
}
