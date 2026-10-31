import { NextResponse } from "next/server";
import { computeNextBatch } from "@/lib/batch";

export const dynamic = "force-dynamic";

/** GET /api/next-batch - the authoritative "next batch" date (the date only changes once a month, so cache it briefly). */
export function GET() {
  const body = computeNextBatch(new Date(), { BATCH_DAY: process.env.BATCH_DAY, BATCH_DATE: process.env.BATCH_DATE });
  return NextResponse.json(body, { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } });
}
