"use client";

import { useEffect, useState } from "react";
import { PrimaryButton } from "../PrimaryButton";
import { Screen, ScreenHeading, ScreenSub } from "../Screen";
import type { OrderingFor } from "../../types";

type Props = {
  value: string; // ISO "YYYY-MM-DD"
  onChange: (iso: string) => void;
  onNext: () => void;
  orderingFor: OrderingFor;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i); // newest first

const pad = (n: number) => String(n).padStart(2, "0");
const daysInMonth = (year: number, month1: number) =>
  new Date(year, month1, 0).getDate(); // month1 is 1-12

function ageFrom(year: number, month1: number, day: number): number {
  let age = CURRENT_YEAR - year;
  const m = NOW.getMonth() + 1;
  const d = NOW.getDate();
  if (m < month1 || (m === month1 && d < day)) age -= 1;
  return age;
}

const selectClass =
  "w-full appearance-none rounded-xl2 border border-forest/15 bg-cream px-4 py-4 text-lg text-forest focus:border-leaf-600 min-h-[56px]";

export function Dob({ value, onChange, onNext, orderingFor }: Props) {
  const parsed = value ? value.split("-").map(Number) : [];
  const [year, setYear] = useState<string>(parsed[0] ? String(parsed[0]) : "");
  const [month, setMonth] = useState<string>(parsed[1] ? String(parsed[1]) : "");
  const [day, setDay] = useState<string>(parsed[2] ? String(parsed[2]) : "");

  const complete = year !== "" && month !== "" && day !== "";

  // Clamp the day if the chosen month/year can't hold it (e.g. Feb 30).
  const maxDay = month && year ? daysInMonth(Number(year), Number(month)) : 31;
  useEffect(() => {
    if (day && Number(day) > maxDay) setDay(String(maxDay));
  }, [day, maxDay]);

  // Push the composed ISO value up (empty until all three are chosen).
  useEffect(() => {
    onChange(complete ? `${year}-${pad(Number(month))}-${pad(Number(day))}` : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day]);

  const heading =
    orderingFor === "loved_one"
      ? "What’s her date of birth?"
      : "What’s your date of birth?";

  const formatted = complete
    ? `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`
    : "";
  const age = complete ? ageFrom(Number(year), Number(month), Number(day)) : 0;

  return (
    <Screen>
      <ScreenHeading>{heading}</ScreenHeading>
      <ScreenSub>This helps us tailor your testing and care plan.</ScreenSub>

      <form
        className="mt-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (complete) onNext();
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-forest">Month</span>
            <select
              className={selectClass}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label="Month of birth"
            >
              <option value="" disabled>Month</option>
              {MONTHS.map((name, i) => (
                <option key={name} value={i + 1}>{name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-forest">Day</span>
            <select
              className={selectClass}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              aria-label="Day of birth"
            >
              <option value="" disabled>Day</option>
              {Array.from({ length: maxDay }, (_, i) => i + 1).map((dnum) => (
                <option key={dnum} value={dnum}>{dnum}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-forest">Year</span>
            <select
              className={selectClass}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-label="Year of birth"
            >
              <option value="" disabled>Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>
        </div>

        {complete && (
          <div className="mt-6 rounded-2xl border border-leaf/30 bg-mint-50 px-5 py-4">
            <p className="text-sm text-forest/55">You selected</p>
            <p className="font-display text-2xl text-forest">{formatted}</p>
            <p className="mt-0.5 text-sm text-forest/60">
              {age} year{age === 1 ? "" : "s"} old
            </p>
          </div>
        )}

        <div className="mt-8">
          <PrimaryButton type="submit" disabled={!complete}>
            Continue
          </PrimaryButton>
        </div>
      </form>
    </Screen>
  );
}
