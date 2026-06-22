import { google } from "googleapis";

function getAuthClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY environment variables.",
    );
  }

  const privateKey = rawKey.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
}

export async function getBusyDatesFromGoogleCalendar(
  startDate: Date,
  endDate: Date,
): Promise<Set<string>> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error("Missing GOOGLE_CALENDAR_ID environment variable.");
  }

  const auth = getAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  const response = await calendar.events.list({
    calendarId,
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const busyDates = new Set<string>();
  const events = response.data.items ?? [];

  for (const event of events) {
    const startStr = event.start?.date ?? event.start?.dateTime;
    const endStr = event.end?.date ?? event.end?.dateTime;
    if (!startStr || !endStr) continue;

    const eventStart = parseCalendarDateOnly(startStr);
    const isAllDay = !!event.start?.date;
    const eventEndRaw = parseCalendarDateOnly(endStr);
    const eventEnd = isAllDay
      ? new Date(
          eventEndRaw.getFullYear(),
          eventEndRaw.getMonth(),
          eventEndRaw.getDate() - 1,
        )
      : eventEndRaw;

    const current = new Date(eventStart);
    while (current <= eventEnd) {
      busyDates.add(toDateKey(current));
      current.setDate(current.getDate() + 1);
    }
  }

  return busyDates;
}

function parseCalendarDateOnly(isoString: string): Date {
  const datePart = isoString.slice(0, 10);
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
