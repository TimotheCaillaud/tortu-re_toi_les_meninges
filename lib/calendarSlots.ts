import { isTwoSlotDay } from "./frenchHolidays";

export type SlotPeriod = "soir" | "matin" | "apres-midi";

export const PERIOD_LABELS: Record<SlotPeriod, string> = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "Soir",
};

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

async function getBusyDatesForMonth(
  year: number,
  month: number,
): Promise<Set<string>> {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59);

  try {
    const { getBusyDatesFromGoogleCalendar } = await import("./googleCalendar");
    return await getBusyDatesFromGoogleCalendar(monthStart, monthEnd);
  } catch (err) {
    console.error(
      "[calendarSlots] Failed to fetch Google Calendar availability — treating month as fully open.",
      err,
    );
    return new Set<string>();
  }
}

export async function getSlotsForMonth(
  year: number,
  month: number,
  escapeId: string,
): Promise<CalendarSlot[]> {
  const busyDates = await getBusyDatesForMonth(year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const slots: CalendarSlot[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = toDateKey(date);
    const isDayBusy = busyDates.has(dateKey);
    const template = getSlotTemplateForDate(date);

    for (const slot of template) {
      slots.push({ ...slot, isBooked: isDayBusy });
    }
  }

  return slots;
}
