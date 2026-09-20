"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-16">

        <Link
          href="/"
          className="font-display text-2xl font-semibold text-gold"
          onClick={() => setOpen(false)}
        >
          PAMH
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/categories" className="text-sm text-ink hover:text-gold">
            Categories
          </Link>

          <Link href="/nominees" className="text-sm text-ink hover:text-gold">
            Nominees
          </Link>

          <Link href="/judges" className="text-sm text-ink hover:text-gold">
            Judges
          </Link>

          <Link href="/governance" className="text-sm text-ink hover:text-gold">
            Governance
          </Link>

          <Link href="/about" className="text-sm text-ink hover:text-gold">
            About
          </Link>

          <Link
            href="/vote"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-base transition hover:-translate-y-1"
          >
            Vote Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="text-2xl text-gold lg:hidden"
        >
          ☰
        </button>

      </nav>

      {open && (
        <div className="border-t border-white/10 bg-base px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            <Link
              href="/categories"
              className="text-ink hover:text-gold"
              onClick={() => setOpen(false)}
            >
              Categories
            </Link>

            <Link
              href="/nominees"
              className="text-ink hover:text-gold"
              onClick={() => setOpen(false)}
            >
              Nominees
            </Link>

            <Link
              href="/judges"
              className="text-ink hover:text-gold"
              onClick={() => setOpen(false)}
            >
              Judges
            </Link>

            <Link
              href="/governance"
              className="text-ink hover:text-gold"
              onClick={() => setOpen(false)}
            >
              Governance
            </Link>

            <Link
              href="/about"
              className="text-ink hover:text-gold"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <Link
              href="/vote"
              className="text-gold"
              onClick={() => setOpen(false)}
            >
              Vote Now
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
