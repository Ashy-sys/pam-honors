"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative text-center px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.18),transparent_60%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-widest text-yellow-400">
            PAM HONORS
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            African Music Awards of Excellence
          </p>

          <p className="mt-4 max-w-2xl mx-auto text-gray-500">
            Celebrating artists, producers, and creatives shaping the sound of Africa.
          </p>

          <div className="mt-10 flex gap-4 justify-center">
            <button className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:scale-105 transition">
              Nominations Soon
            </button>

            <a
              href="/categories"
              className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-full hover:scale-105 transition"
            >
              View Categories
            </a>
          </div>
        </motion.div>
      </section>

      {/* EVENT */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 py-20 text-center border-t border-gray-900"
      >
        <h2 className="text-2xl text-yellow-400 font-bold mb-4">
          Next Event
        </h2>

        <p className="text-gray-500">
          Awards Night 2026 — Coming Soon
        </p>

        <div className="mt-6 text-4xl font-bold">
          00 : 00 : 00 : 00
        </div>
      </motion.section>

      {/* CATEGORIES */}
      <section className="px-6 py-24 border-t border-gray-900">
        <h2 className="text-center text-3xl font-bold text-yellow-400 mb-12">
          Featured Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Artist of the Year",
            "Song of the Year",
            "Best New Artist",
            "Best Female Artist",
            "Best Male Artist",
            "Best Producer",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-gray-800 p-6 rounded-xl text-center hover:border-yellow-400 hover:scale-105 transition"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-gray-800 text-gray-600">
        <p className="text-yellow-400 font-semibold">PAM HONORS</p>
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
      </footer>

    </main>
  );
}