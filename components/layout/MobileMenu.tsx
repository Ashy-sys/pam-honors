"use client";

import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Nominees", href: "/nominees" },
  { name: "Judges", href: "/judges" },
  { name: "Winners", href: "/winners" },
  { name: "About", href: "/about" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-gold text-2xl"
        aria-label="Open menu"
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-base-surface p-6 border-t border-gold/20">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink hover:text-gold"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}