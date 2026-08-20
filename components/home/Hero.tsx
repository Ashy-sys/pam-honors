"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* Red carpet background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03]"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Heavy left-side gradient for typography */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      {/* Wine atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(122,31,43,0.30),transparent_40%)]" />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.85)]" />

      {/* Decorative vertical lines */}
      <div className="absolute left-[7%] top-0 h-full w-px bg-white/10" />
      <div className="absolute right-[7%] top-0 h-full w-px bg-white/10" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 lg:px-10">

        <div className="max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />

            <p className="text-xs font-medium uppercase tracking-[0.45em] text-gold">
              PAM Honors 2026
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-6xl font-semibold leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            Celebrating
            <br />

            <span className="text-gold">
              Excellence.
            </span>

            <br />

            Creativity.
            <br />

            Achievement.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-9 max-w-2xl text-base leading-8 text-white/70 md:text-lg"
          >
            PAM Honors celebrates outstanding artists, creators and
            contributors across East Africa through a celebration of music,
            creativity and achievement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/vote"
              className="group inline-flex items-center gap-4 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-gold-foil"
            >
              Vote Now
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-black/30 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-black/50"
            >
              Explore Categories
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex flex-wrap gap-10 border-t border-white/15 pt-7"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Event
              </p>
              <p className="mt-2 text-sm text-white/80">
                PAM Honors 2026
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Date
              </p>
              <p className="mt-2 text-sm text-white/80">
                11 December 2026
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Awards
              </p>
              <p className="mt-2 text-sm text-white/80">
                26 Categories
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">
          Scroll
        </span>

        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>

    </section>
  );
}