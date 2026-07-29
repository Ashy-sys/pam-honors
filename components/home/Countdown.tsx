"use client";

import { useEffect, useState } from "react";
import CountdownUnit from "@/components/shared/CountdownUnit";

export default function Countdown() {
  const targetDate = new Date("2026-12-11T20:00:00").getTime();

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 135,
    hours: 3,
    minutes: 26,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

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
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative py-20 bg-base">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[0.4em] text-sm text-gold mb-4">
          The Countdown Begins
        </p>

        <h2 className="font-display text-4xl md:text-5xl text-ink mb-10">
          PAM Honors Night
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <CountdownUnit
            value={timeLeft.days}
            label="Days"
          />

          <CountdownUnit
            value={timeLeft.hours}
            label="Hours"
          />

          <CountdownUnit
            value={timeLeft.minutes}
            label="Minutes"
          />

          <CountdownUnit
            value={timeLeft.seconds}
            label="Seconds"
          />

        </div>

      </div>
    </section>
  );
}