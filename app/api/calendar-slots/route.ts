import { NextRequest, NextResponse } from "next/server";
import { getSlotsForMonth } from "@/lib/calendarSlots";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const yearParam = searchParams.get("year");
  const monthParam = searchParams.get("month"); // 0-indexed, matches JS Date
  const escapeId = searchParams.get("escapeId") ?? "";

  const year = yearParam ? parseInt(yearParam, 10) : NaN;
  const month = monthParam ? parseInt(monthParam, 10) : NaN;

  if (Number.isNaN(year) || Number.isNaN(month) || month < 0 || month > 11) {
    return NextResponse.json(
      { error: "Invalid or missing year/month query parameters." },
      { status: 400 },
    );
  }

  try {
    const slots = await getSlotsForMonth(year, month, escapeId);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("[/api/calendar-slots] Failed to build slots:", err);
    return NextResponse.json(
      { error: "Failed to load calendar slots." },
      { status: 500 },
    );
  }
}
