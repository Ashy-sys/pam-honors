import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section
      className={`
        w-full
        py-16
        sm:py-24
        lg:py-32
        px-5
        sm:px-10
        lg:px-16
        max-w-[1280px]
        mx-auto
        ${className}
      `}
    >
      {children}
    </section>
  );
}