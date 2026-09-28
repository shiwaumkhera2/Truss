import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead";
import { deliverLead } from "@/lib/server/lead-delivery";

export const runtime = "nodejs";

/**
 * POST /api/lead
 * Body: { name, email, phone, company, website?: honeypot, source?: string }
 *
 * Responds { ok: true } once the lead has been delivered (or logged, when no channel is configured),
 * { ok: false, invalid: string[] } on validation errors, and { ok: false, error } with status 502
 * when a configured delivery channel fails, so the form can show its fallback contact details.
 * Delivery lives in lib/server/lead-delivery.ts.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Expected a JSON body." }, { status: 400 });
  }

  const record = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Honeypot: bots fill the hidden "website" field. Pretend it worked and drop it.
  if (typeof record.website === "string" && record.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(record);
  if (!result.ok) {
    return NextResponse.json({ ok: false, invalid: result.invalid }, { status: 422 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const delivery = await deliverLead({
    ...result.data,
    submittedAt: new Date().toISOString(),
    source: typeof record.source === "string" ? record.source.slice(0, 64) : undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: forwardedFor ? forwardedFor.split(",")[0].trim() : undefined,
  });

  if (delivery.configured && delivery.delivered.length === 0) {
    return NextResponse.json({ ok: false, error: "Lead could not be delivered." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Use POST." }, { status: 405 });
}
