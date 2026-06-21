import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const TOTAL_KEY = "sentio:pings:total";
const BY_VERSION_KEY = "sentio:pings:by_version";
// Set of anonymous machine IDs — SADD is a no-op on repeat IDs, so SCARD
// gives a true unique-install count regardless of how often a machine pings.
const UNIQUE_MACHINES_KEY = "sentio:machines:unique";

export async function GET(request: NextRequest) {
  const version = request.nextUrl.searchParams.get("version") ?? "unknown";
  const id = request.nextUrl.searchParams.get("id");

  if (redis) {
    try {
      await redis.incr(TOTAL_KEY);
      await redis.hincrby(BY_VERSION_KEY, version, 1);
      if (id) {
        await redis.sadd(UNIQUE_MACHINES_KEY, id);
      }
    } catch {
      // A Redis hiccup should never break the response to the CLI.
    }
  }

  const latest = process.env.SENTIO_LATEST_VERSION ?? version;
  return NextResponse.json({ latest });
}
