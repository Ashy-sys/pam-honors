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

export default function Countdown() {
  // PANH 2027
  // Event date: 14 February 2027 at 8:00 PM
  const targetDate = new Date("2027-02-14T20:00:00").getTime();

  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const difference = targetDate - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative bg-base py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-gold">
          The Countdown Begins
        </p>

        <h2 className="mb-10 font-display text-4xl text-ink md:text-5xl">
          The Honor Night
        </h2>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <CountdownBox value={timeLeft.days} label="Days" />
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <CountdownBox value={timeLeft.minutes} label="Minutes" />
          <CountdownBox value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
