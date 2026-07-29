import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-gradient-to-br from-gold to-gold-foil text-base font-semibold shadow-lg hover:-translate-y-1",
    secondary:
      "border border-ink/25 text-ink hover:border-gold hover:bg-gold/10",
    ghost:
      "text-gold underline underline-offset-4 decoration-gold/40",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-full px-8 py-3
        transition-all duration-300
        ease-[var(--ease-premium)]
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}