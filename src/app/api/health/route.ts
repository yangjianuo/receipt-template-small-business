import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "editreceipt",
    timestamp: new Date().toISOString(),
  });
}
