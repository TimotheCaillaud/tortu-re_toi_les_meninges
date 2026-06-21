function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseIsoCalendarDate(isoString: string): Date {
  const datePart = isoString.slice(0, 10); // "2027-02-22" from "2027-02-22T00:00:00+01:00"
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getFrenchHolidays(year: number): Set<string> {
  const easter = getEasterSunday(year);

  const holidays: Date[] = [
    new Date(year, 0, 1), // Jour de l'An
    addDays(easter, 1), // Lundi de Pâques
    new Date(year, 4, 1), // Fête du Travail
    new Date(year, 4, 8), // Victoire 1945
    addDays(easter, 39), // Ascension
    addDays(easter, 50), // Lundi de Pentecôte
    new Date(year, 6, 14), // Fête nationale
    new Date(year, 7, 15), // Assomption
    new Date(year, 10, 1), // Toussaint
    new Date(year, 10, 11), // Armistice 1918
    new Date(year, 11, 25), // Noël
  ];

  return new Set(holidays.map(toDateKey));
}

export function isFrenchHoliday(date: Date): boolean {
  return getFrenchHolidays(date.getFullYear()).has(toDateKey(date));
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
}

export function isTwoSlotDay(date: Date): boolean {
  return isWeekend(date) || isFrenchHoliday(date) || isSchoolHoliday(date);
}

interface DateRange {
  start: Date;
  end: Date;
}

const schoolHolidayRanges: DateRange[] = [];

function addSchoolHolidayRange(start: Date, end: Date): void {
  schoolHolidayRanges.push({ start, end });
}

export function isSchoolHoliday(date: Date): boolean {
  const key = toDateKey(date);
  return schoolHolidayRanges.some(
    (range) => key >= toDateKey(range.start) && key <= toDateKey(range.end),
  );
}

const fetchedSchoolYears = new Set<number>();

const EDUCATION_API_URL =
  "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";

interface EducationApiRecord {
  start_date?: string; // e.g. "2026-10-17T00:00:00+00:00"
  end_date?: string;
  zones?: string; // e.g. "Zone C"
  location?: string; // e.g. "Paris"
  population?: string; // e.g. "Enseignants" (teachers) or "-" (general) or "Élèves" (students)
  description?: string; // e.g. "Vacances de la Toussaint"
}

interface EducationApiResponse {
  results?: EducationApiRecord[];
}

export async function fetchAndRegisterSchoolHolidays(
  schoolYearStart: number,
): Promise<number> {
  if (fetchedSchoolYears.has(schoolYearStart)) {
    return 0; // already fetched this session — avoid duplicate ranges
  }
  fetchedSchoolYears.add(schoolYearStart);

  const todayLiteral = `date'${toDateKey(new Date())}'`;

  const queryParts = [
    "limit=100",
    "lang=fr",
    "timezone=Europe/Paris",
    `refine=${encodeURIComponent('zones:"Zone C"')}`,
    `refine=${encodeURIComponent('location:"Paris"')}`,
    `where=${encodeURIComponent(`end_date >= ${todayLiteral}`)}`,
    `order_by=${encodeURIComponent("start_date asc")}`,
  ];

  try {
    const response = await fetch(
      `${EDUCATION_API_URL}?${queryParts.join("&")}`,
    );
    if (!response.ok) {
      console.warn(
        `[frenchHolidays] Ministry API returned ${response.status} — no school holiday data available for this session.`,
      );
      return 0;
    }

    const data: EducationApiResponse = await response.json();
    const records = data.results ?? [];

    let addedCount = 0;
    for (const record of records) {
      if (!record.start_date || !record.end_date) continue;

      const start = new Date(record.start_date);
      const rawEnd = parseIsoCalendarDate(record.end_date);
      const end = new Date(
        rawEnd.getFullYear(),
        rawEnd.getMonth(),
        rawEnd.getDate() - 1,
      );

      addSchoolHolidayRange(start, end);
      addedCount++;
    }

    if (addedCount === 0) {
      console.warn(
        "[frenchHolidays] Ministry API responded but no matching records were found. " +
          'This query stacks three exact-match filters (zones:"Zone C", location:"Paris", ' +
          'population:"Enseignants") — if any one facet value doesn\'t match the dataset ' +
          "exactly (case, accents, or wording), the combined query returns zero rows. " +
          "Inspect a request without the where/refine filters to see the real facet values, " +
          "then adjust the refine values above to match exactly.",
      );
    }

    return addedCount;
  } catch (err) {
    console.warn(
      "[frenchHolidays] Failed to fetch Ministry of Education school calendar — no school holiday data available for this session.",
      err,
    );
    return 0;
  }
}
