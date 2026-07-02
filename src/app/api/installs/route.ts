import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export const revalidate = 300; // cache for 5 minutes

export async function GET() {
  if (!redis) {
    return NextResponse.json({ count: null });
  }
  const count = await redis.get<number>("sentio:pings:total");
  return NextResponse.json({ count });
}
