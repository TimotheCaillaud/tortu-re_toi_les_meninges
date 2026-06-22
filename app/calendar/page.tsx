// app/calendar/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ESCAPES } from "@/lib/escapes";
import { getSlotsForMonth, CalendarSlot } from "@/lib/calendarSlots";
import { fetchAndRegisterSchoolHolidays } from "@/lib/frenchHolidays";

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_LABELS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/** Builds a 7-column grid of cells for one month, including leading/trailing
 *  blanks so the first day lines up under the correct weekday column. */
function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // JS getDay(): 0 = Sunday ... 6 = Saturday. We want Monday-first columns.
  const firstWeekday = (firstDay.getDay() + 6) % 7; // 0 = Monday ... 6 = Sunday

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

function MonthGrid({
  year,
  month,
  slotsByDate,
  selectedSlot,
  onSelectSlot,
  onPrevious,
  onNext,
  showPrevious,
  isPrevDisabled,
  isNextDisabled,
}: {
  year: number;
  month: number;
  slotsByDate: Map<string, CalendarSlot[]>;
  selectedSlot: { date: string; period: string } | null;
  onSelectSlot: (slot: CalendarSlot) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious: boolean;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}) {
  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);

  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        {showPrevious ? (
          <button
            type="button"
            onClick={onPrevious}
            disabled={isPrevDisabled}
            aria-label="Mois précédent"
            aria-disabled={isPrevDisabled}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors shrink-0 ${
              isPrevDisabled
                ? "border-[#733706]/20 text-[#733706]/30 cursor-not-allowed"
                : "border-[#733706] text-[#733706] hover:bg-[#733706]/10"
            }`}
          >
            ‹
          </button>
        ) : (
          <span className="w-8 h-8 shrink-0" aria-hidden="true" />
        )}

        <h3 className="text-xl font-bold text-[#3f1f03] text-center flex-1">
          {MONTH_LABELS[month]} {year}
        </h3>

        {!showPrevious ? (
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            aria-label="Mois suivant"
            aria-disabled={isNextDisabled}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors shrink-0 ${
              isNextDisabled
                ? "border-[#733706]/20 text-[#733706]/30 cursor-not-allowed"
                : "border-[#733706] text-[#733706] hover:bg-[#733706]/10"
            }`}
          >
            ›
          </button>
        ) : (
          <span className="w-8 h-8 shrink-0" aria-hidden="true" />
        )}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-xs font-semibold text-[#733706]/70 uppercase tracking-wide py-1"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} className="aspect-square" />;

          const dateKey = toDateKey(date);
          const slots = slotsByDate.get(dateKey) ?? [];
          const past = isPast(date);

          return (
            <div
              key={idx}
              className={`aspect-square border rounded-md p-1 flex flex-col gap-0.5 ${
                past
                  ? "border-[#733706]/10 bg-[#3f1f03]/[0.02]"
                  : "border-[#733706]/30 bg-[#fffcf6]"
              }`}
            >
              <span
                className={`text-[11px] font-semibold ${
                  past ? "text-[#3f1f03]/30" : "text-[#3f1f03]"
                }`}
              >
                {date.getDate()}
              </span>

              {!past && (
                <div className="flex flex-col gap-0.5 flex-1 justify-end">
                  {slots.map((slot) => {
                    const isSelected =
                      selectedSlot?.date === slot.date &&
                      selectedSlot?.period === slot.period;

                    return (
                      <button
                        key={slot.period}
                        type="button"
                        disabled={slot.isBooked}
                        onClick={() => onSelectSlot(slot)}
                        title={
                          slot.isBooked
                            ? "Déjà réservé"
                            : `Réserver ce créneau (${slot.label})`
                        }
                        className={`text-[8px] sm:text-[9px] leading-tight rounded px-1 py-0.5 transition-colors truncate ${
                          slot.isBooked
                            ? "bg-gray-400/10 text-gray-500/40 cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-[#843400] text-[#fffcf6] font-semibold"
                              : "bg-green-600/15 text-green-900 hover:bg-green-600/30 cursor-pointer"
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const escapeId = searchParams.get("escapeId");
  const escape = ESCAPES.find((e) => String(e.id) === escapeId);

  const today = new Date();
  const [baseYear, setBaseYear] = useState(today.getFullYear());
  const [baseMonth, setBaseMonth] = useState(today.getMonth()); // 0-indexed

  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    period: string;
    label: string;
    time: string;
  } | null>(null);

  // Bumped after fetchAndRegisterSchoolHolidays() resolves, purely to force
  // slotsByDate to recompute below — the actual fetched data lives in
  // frenchHolidays.ts's module-level cache, not in this counter's value.
  const [holidaysVersion, setHolidaysVersion] = useState(0);

  useEffect(() => {
    // French school years run September -> August, so if "today" falls in
    // Jan-Aug, the current school year actually started the PREVIOUS
    // calendar year (e.g. January 2027 is still the 2026-2027 school year).
    const schoolYearStart =
      today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1;

    // Pulls live Zone C school holiday dates from the Ministry of Education
    // API and merges them into the same cache the static fallback dates use.
    // If this fails or returns nothing, the static dates in frenchHolidays.ts
    // are still in effect — see that file's comments for details.
    fetchAndRegisterSchoolHolidays(schoolYearStart).then((count) => {
      if (count > 0) setHolidaysVersion((v) => v + 1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Second month shown alongside the first, handling year rollover.
  const secondMonth = (baseMonth + 1) % 12;
  const secondYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  const slotsByDate = useMemo(() => {
    const map = new Map<string, CalendarSlot[]>();
    const monthsToLoad = [
      { year: baseYear, month: baseMonth },
      { year: secondYear, month: secondMonth },
    ];

    for (const { year, month } of monthsToLoad) {
      const slots = getSlotsForMonth(year, month, escapeId ?? "");
      for (const slot of slots) {
        const existing = map.get(slot.date) ?? [];
        existing.push(slot);
        map.set(slot.date, existing);
      }
    }

    return map;
    // holidaysVersion is intentionally included even though it's not read
    // directly here — it's a signal that frenchHolidays.ts's internal cache
    // changed, which getSlotsForMonth() depends on indirectly.
  }, [baseYear, baseMonth, secondYear, secondMonth, escapeId, holidaysVersion]);

  // Navigation bounds: can't go earlier than the current month, and can't
  // go later than the point where the SECOND visible month would exceed
  // August 2027 (end of the 2026-2027 school year — the latest year we
  // have any school-holiday data for). Since the view always shows
  // baseMonth + the following month, baseMonth itself is capped at July
  // 2027 so the second month never passes August 2027.
  const minYear = today.getFullYear();
  const minMonth = today.getMonth();
  const maxYear = 2027;
  const maxMonth = 6; // July (0-indexed) — second month shown will be August 2027

  function isAtMinMonth(year: number, month: number): boolean {
    return year === minYear && month === minMonth;
  }

  function isAtMaxMonth(year: number, month: number): boolean {
    return year === maxYear && month === maxMonth;
  }

  function goToPreviousMonth() {
    if (isAtMinMonth(baseYear, baseMonth)) return;
    setSelectedSlot(null);
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear((y) => y - 1);
    } else {
      setBaseMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (isAtMaxMonth(baseYear, baseMonth)) return;
    setSelectedSlot(null);
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear((y) => y + 1);
    } else {
      setBaseMonth((m) => m + 1);
    }
  }

  function handleSelectSlot(slot: CalendarSlot) {
    setSelectedSlot({
      date: slot.date,
      period: slot.period,
      label: slot.label,
      time: slot.time,
    });
  }

  function handleConfirm() {
    // Placeholder — wire this up to your real booking submission later.
    if (!selectedSlot) return;
    alert(
      `Réservation : ${escape?.title ?? "Escape"} — ${selectedSlot.date}, ${selectedSlot.label} (${selectedSlot.time})`,
    );
  }

  return (
    <section className="py-16 px-4 bg-[#f7dba7] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#3f1f03] mb-2">
          Réserver une session
        </h1>

        {escape ? (
          <h2 className="text-center text-[#733706] font-semibold mb-10 text-3xl">
            {escape.title}
          </h2>
        ) : (
          <p className="text-center text-[#733706]/70 mb-10">
            Aucun escape sélectionné — choisissez un créneau ci-dessous.
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-8 bg-[#fffcf6] border-2 border-[#733706] rounded-lg p-6 sm:p-8">
          <MonthGrid
            year={baseYear}
            month={baseMonth}
            slotsByDate={slotsByDate}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onPrevious={goToPreviousMonth}
            showPrevious={true}
            isPrevDisabled={isAtMinMonth(baseYear, baseMonth)}
          />
          <MonthGrid
            year={secondYear}
            month={secondMonth}
            slotsByDate={slotsByDate}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onNext={goToNextMonth}
            showPrevious={false}
            isNextDisabled={isAtMaxMonth(baseYear, baseMonth)}
          />
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          {selectedSlot && (
            <p className="text-[#3f1f03]">
              Créneau sélectionné :{" "}
              <span className="font-semibold">
                {selectedSlot.date} — {selectedSlot.label} ({selectedSlot.time})
              </span>
            </p>
          )}
          <button
            type="button"
            disabled={!selectedSlot}
            onClick={handleConfirm}
            className={`px-6 py-3 rounded font-semibold transition-colors ${
              selectedSlot
                ? "bg-[#843400] text-[#fffcf6]  hover:bg-[#9f3f00] cursor-pointer"
                : "bg-[#733706]/20 text-[#733706]/50 cursor-not-allowed"
            }`}
          >
            Demande de réservation
          </button>
        </div>
      </div>
    </section>
  );
}
