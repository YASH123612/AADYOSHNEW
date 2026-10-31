import { NextResponse, type NextRequest } from "next/server";
import { handleForm } from "@/lib/forms";

export const dynamic = "force-dynamic";

/** POST /api/leads | /api/support | /api/ambassador | /api/mentor-request */
export async function POST(req: NextRequest, ctx: { params: Promise<{ form: string }> }) {
  const { form } = await ctx.params;
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const { status, body } = await handleForm(form, req.headers.get("content-type"), await req.text(), ip);
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
