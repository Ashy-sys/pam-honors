import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        bg-surface
        border
        border-transparent
        transition-all
        duration-300
        ease-[var(--ease-premium)]
        hover:-translate-y-1
        hover:shadow-xl

        before:absolute
        before:inset-0
        before:rounded-2xl
        before:p-px
        before:bg-gradient-to-br
        before:from-gold/40
        before:to-gold/5
        before:-z-10

        ${className}
      `}
    >
      {children}
    </div>
  );
}