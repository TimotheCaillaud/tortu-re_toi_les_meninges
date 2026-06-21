// lib/calendarSlots.ts

import { isTwoSlotDay } from "./frenchHolidays";

export type SlotPeriod = "soir" | "matin" | "apres-midi";

export const PERIOD_LABELS: Record<SlotPeriod, string> = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "Soir",
};

// Actual start time per period — kept for booking records / future use,
// even though the UI now only displays the period name.
const PERIOD_TIMES: Record<SlotPeriod, string> = {
  matin: "10h00",
  "apres-midi": "15h00",
  soir: "20h00",
};

export interface CalendarSlot {
  date: string; // "YYYY-MM-DD"
  period: SlotPeriod;
  label: string; // display name, e.g. "Matin"
  time: string; // actual start time, e.g. "10h00"
  isBooked: boolean;
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns the slot definitions for a single day, based on whether it's
 * a weekday (1 slot, evening) or a weekend/holiday (2 slots: morning + afternoon/evening).
 * Does NOT include booking status — that's merged in separately from mock/real data.
 */
export function getSlotTemplateForDate(
  date: Date,
): Omit<CalendarSlot, "isBooked">[] {
  const dateKey = toDateKey(date);

  const periods: SlotPeriod[] = isTwoSlotDay(date)
    ? ["matin", "apres-midi"]
    : ["soir"];

  return periods.map((period) => ({
    date: dateKey,
    period,
    label: PERIOD_LABELS[period],
    time: PERIOD_TIMES[period],
  }));
}

const MOCK_BOOKED_SLOTS = new Set<string>([
  // A few illustrative fake bookings — remove once real data is wired up.
  "2026-06-24:soir",
  "2026-06-27:matin",
  "2026-07-04:apres-midi",
]);

export function getBookedSlots(_escapeId: string): Set<string> {
  return MOCK_BOOKED_SLOTS;
}

export function getSlotsForMonth(
  year: number,
  month: number, // 0-indexed, like JS Date
  escapeId: string,
): CalendarSlot[] {
  const bookedSlots = getBookedSlots(escapeId);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const slots: CalendarSlot[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const template = getSlotTemplateForDate(date);
    for (const slot of template) {
      const key = `${slot.date}:${slot.period}`;
      slots.push({ ...slot, isBooked: bookedSlots.has(key) });
    }
  }

  return slots;
}
