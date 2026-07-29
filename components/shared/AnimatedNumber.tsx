"use client";

import { useEffect, useState } from "react";

type AnimatedNumberProps = {
  value: number;
};

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.max(1, Math.ceil(value / 50));

    const timer = setInterval(() => {
      current += increment;

      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}