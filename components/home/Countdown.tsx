"use client";

import { useEffect, useState } from "react";

function CountdownBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex min-w-[90px] flex-col items-center rounded-2xl border border-gold/20 bg-base-surface px-6 py-5">
      <span className="font-mono text-3xl text-gold md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-2 text-xs uppercase tracking-widest text-ink-muted">
        {label}
      </span>
    </div>
  );
}

const kampalaDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Africa/Kampala",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function Countdown() {
  // PAMH 2027
  // Event day: 12 February 2027 in Kampala (East Africa Time)
  const targetDay = Date.UTC(2027, 1, 12);

  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<
    { status: "countdown"; days: number } | { status: "event-day" } | { status: "past" } | null
  >(null);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const parts = kampalaDateFormatter.formatToParts(new Date());
      const year = Number(parts.find((part) => part.type === "year")?.value);
      const month = Number(parts.find((part) => part.type === "month")?.value);
      const day = Number(parts.find((part) => part.type === "day")?.value);
      const today = Date.UTC(year, month - 1, day);
      const daysRemaining = Math.round((targetDay - today) / 86400000);

      if (daysRemaining === 0) {
        setCountdown({ status: "event-day" });
      } else if (daysRemaining < 0) {
        setCountdown({ status: "past" });
      } else {
        setCountdown({ status: "countdown", days: daysRemaining });
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDay]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative bg-base py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-gold">
          {countdown?.status === "event-day" ? "12 February 2027" : "The Countdown Begins"}
        </p>

        <h2 className="mb-10 font-display text-4xl text-ink md:text-5xl">
          The Honor Night
        </h2>

        {countdown?.status === "countdown" ? (
          <div className="flex justify-center">
            <CountdownBox value={countdown.days} label="Days Remaining" />
          </div>
        ) : countdown?.status === "event-day" ? (
          <p role="status" className="font-display text-3xl text-gold md:text-4xl">
            Event Day
          </p>
        ) : countdown?.status === "past" ? (
          <p role="status" className="font-display text-2xl text-ink-muted">
            The event date has passed.
          </p>
        ) : null}
      </div>
    </section>
  );
}
