"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ESCAPES } from "@/lib/escapes";
import type { CalendarSlot } from "@/lib/calendarSlots";
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

function isWithinNextWeek(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysOut = new Date(today);
  sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);
  return date >= today && date < sevenDaysOut;
}

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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
          const isNearTerm = isWithinNextWeek(date);

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
                            : isNearTerm
                              ? `Délai court, sous 7 jours (${slot.label})`
                              : `Réserver ce créneau (${slot.label})`
                        }
                        className={`text-[8px] sm:text-[9px] leading-tight rounded px-1 py-0.5 transition-colors truncate ${
                          slot.isBooked
                            ? "bg-gray-400/80 text-[#fffcf6] cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-[#843400] text-[#fffcf6] font-semibold"
                              : isNearTerm
                                ? "bg-orange-500/80 text-[#fffcf6] hover:bg-orange-500/30 cursor-pointer"
                                : "bg-green-600/80 text-[#fffcf6] hover:bg-green-600/30 cursor-pointer"
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

function CalendarPageContent() {
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

  const [holidaysVersion, setHolidaysVersion] = useState(0);

  useEffect(() => {
    const schoolYearStart =
      today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1;

    fetchAndRegisterSchoolHolidays(schoolYearStart).then((count) => {
      if (count > 0) setHolidaysVersion((v) => v + 1);
    });
  }, []);

  const secondMonth = (baseMonth + 1) % 12;
  const secondYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  const [slotsByDate, setSlotsByDate] = useState<Map<string, CalendarSlot[]>>(
    new Map(),
  );
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadSlots() {
      setIsLoadingSlots(true);
      const monthsToLoad = [
        { year: baseYear, month: baseMonth },
        { year: secondYear, month: secondMonth },
      ];

      try {
        const results = await Promise.all(
          monthsToLoad.map(({ year, month }) =>
            fetch(
              `/api/calendar-slots?year=${year}&month=${month}&escapeId=${
                escapeId ?? ""
              }`,
            ).then((res) => {
              if (!res.ok) throw new Error(`API returned ${res.status}`);
              return res.json() as Promise<{ slots: CalendarSlot[] }>;
            }),
          ),
        );

        if (isCancelled) return;

        const map = new Map<string, CalendarSlot[]>();
        for (const { slots } of results) {
          for (const slot of slots) {
            const existing = map.get(slot.date) ?? [];
            existing.push(slot);
            map.set(slot.date, existing);
          }
        }
        setSlotsByDate(map);
      } catch (err) {
        console.error("Failed to load calendar slots:", err);
        if (!isCancelled) setSlotsByDate(new Map());
      } finally {
        if (!isCancelled) setIsLoadingSlots(false);
      }
    }

    loadSlots();
    return () => {
      isCancelled = true;
    };
  }, [baseYear, baseMonth, secondYear, secondMonth, escapeId, holidaysVersion]);

  const minYear = today.getFullYear();
  const minMonth = today.getMonth();
  const maxMonth = 6; // July (0-indexed) — second month shown will be August 2027
  const maxYear = minMonth > 9 ? minYear + 2 : minYear + 1;

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

        <div className="bg-[#fffcf6] border-2 border-[#733706] rounded-lg p-6 sm:p-8">
          {isLoadingSlots && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#fffcf6]/70 rounded-lg z-10">
              <p className="text-[#733706] font-medium">
                Chargement des disponibilités...
              </p>
            </div>
          )}
          <div className="relative flex flex-col md:flex-row gap-8">
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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600/80 shrink-0" />
              <span className="text-[#3f1f03]">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500/80 shrink-0" />
              <span className="text-[#3f1f03]">Délai court</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400/80 shrink-0" />
              <span className="text-[#3f1f03]">Déjà réservé</span>
            </div>
          </div>
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

export default function CalendarPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16 px-4 bg-[#f7dba7] min-h-screen">
          <div className="max-w-5xl mx-auto text-center text-[#733706]">
            Chargement du calendrier...
          </div>
        </section>
      }
    >
      <CalendarPageContent />
    </Suspense>
  );
}
