import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "gold" | "wine" | "live";
};

export default function Badge({
  children,
  variant = "gold",
}: BadgeProps) {
  const styles = {
    gold:
      "bg-gold/10 text-gold border-gold/30",
    wine:
      "bg-wine/20 text-[#E8919E] border-wine/40",
    live:
      "bg-gold/10 text-gold border-gold/30 pl-5 relative",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        border
        px-3 py-1
        text-xs
        font-semibold
        uppercase
        tracking-wider
        ${styles[variant]}
      `}
    >
      {variant === "live" && (
        <span
          className="
            absolute left-2
            h-1.5 w-1.5
            rounded-full
            bg-gold
            animate-pulse
          "
        />
      )}

      {children}
    </span>
  );
}