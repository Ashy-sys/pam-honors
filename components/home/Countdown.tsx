"use client";

import { useEffect, useState } from "react";
import CountdownUnit from "@/components/shared/CountdownUnit";

export default function Countdown() {

  const targetDate = new Date("December 11, 2026 20:00:00").getTime();

  const calculateTime = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
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
    };
  };


  const [time, setTime] = useState(calculateTime());


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <section className="relative -mt-20 z-20 px-6">
      <div className="max-w-5xl mx-auto bg-base-surface border border-gold/20 rounded-3xl p-6 md:p-10 shadow-2xl">

        <div className="text-center mb-8">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">
            The Countdown Begins
          </p>

          <h2 className="font-display text-3xl text-ink mt-3">
            PAM Honors Night
          </h2>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">

          <CountdownUnit value={time.days} label="Days" />

          <CountdownUnit value={time.hours} label="Hours" />

          <CountdownUnit value={time.minutes} label="Minutes" />

          <CountdownUnit value={time.seconds} label="Seconds" />

        </div>

      </div>
    </section>
  );
}