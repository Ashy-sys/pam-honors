"use client";

import { useEffect, useState } from "react";

const articles = [
  {
    number: "01",
    title: "Name, Purpose, Host Destination & Eligibility",
  },
  {
    number: "02",
    title: "Branches of Power & Governance",
  },
  {
    number: "03",
    title: "Winner Selection Process, Voting Architecture & Content Restrictions",
  },
  {
    number: "04",
    title: "Confidentiality & Integrity",
  },
  {
    number: "05",
    title: "Anti-Lobbying Law",
  },
  {
    number: "06",
    title: "Amendments & Future Expansion",
  },
];

export default function GovernancePage() {
  const [activeArticle, setActiveArticle] = useState("article-1");

  useEffect(() => {
    const sections = articles
      .map((article) => document.getElementById(`article-${article.number}`))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveArticle(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-base text-ink">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-hero pt-36 pb-24 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-wine/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1180px] px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
                Official Governance Document
              </span>
            </div>

            <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Constitution
              <br />
              <span className="text-gold">&amp; Governance Manual</span>
            </h1>

            <div className="mt-10 border-l border-gold/40 pl-5">
              <p className="font-display text-xl text-ink sm:text-2xl">
                Pan Africa Music Honors (PAMH)
              </p>

              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink-muted">
                Inaugural Uganda Edition
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Effective Edition
                </span>

                <span className="ml-3 text-sm text-ink">
                  2026/2027
                </span>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Founding Hub
                </span>

                <span className="ml-3 text-sm text-ink">
                  Kampala, Uganda
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT */}
      <section className="mx-auto max-w-[1180px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* CONTENTS */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-t border-gold/40 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                Contents
              </p>

              <nav className="mt-6 space-y-2">
                {articles.map((article) => {
                  const id = `article-${article.number}`;
                  const active = activeArticle === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollTo(id)}
                      className={`group flex w-full items-start gap-3 rounded-r-lg border-l px-3 py-3 text-left transition ${
                        active
                          ? "border-gold bg-white/[0.05]"
                          : "border-white/10 hover:border-gold/40 hover:bg-white/[0.025]"
                      }`}
                    >
                      <span
                        className={`shrink-0 font-mono text-[10px] ${
                          active ? "text-gold" : "text-ink-muted"
                        }`}
                      >
                        {article.number}
                      </span>

                      <span
                        className={`text-xs leading-5 ${
                          active ? "text-ink" : "text-ink-muted"
                        }`}
                      >
                        {article.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-10 hidden border-t border-white/10 pt-5 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                PAMH
              </p>

              <p className="mt-2 text-xs leading-5 text-ink-muted">
                Inaugural Uganda Edition
                <br />
                2026/2027
              </p>
            </div>
          </aside>

          {/* MAIN DOCUMENT */}
          <article className="min-w-0">
            {/* PREAMBLE */}
            <section className="mb-24 border-b border-white/10 pb-20">
              <DocumentLabel>PREAMBLE</DocumentLabel>

              <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
                “We, the architects, custodians, and creators of Ugandan music
                and creative arts, hereby establish the Pan Africa Music Honors
                (PAMH) - Inaugural Uganda Edition.”
              </blockquote>

              <p className="mt-8 max-w-3xl text-base leading-8 text-ink-muted">
                Our core mission is to celebrate excellence, protect artistic
                integrity, and honor every voice across Uganda&apos;s vibrant
                regions. This Constitution binds all Legends, Judges, Voters,
                Nominees, and Executive Staff. No individual or entity is above
                these laws.
              </p>
            </section>

            {/* ARTICLE 1 */}
            <section
              id="article-1"
              className="scroll-mt-28 border-b border-white/10 pb-24"
            >
              <ArticleHeader
                number="01"
                title="Name, Purpose, Host Destination & Eligibility"
              />

              <Clause number="1.1" title="Official Name">
                <p>
                  Pan Africa Music Honors (PAMH) Inaugural Uganda Edition.
                </p>
              </Clause>

              <Clause number="1.2" title="Purpose">
                <p>
                  Award, benchmark, and elevate Ugandan musical excellence
                  through transparent, data-driven, culturally rooted
                  evaluation.
                </p>

                <QuoteLine>
                  “Zero corruption. 100 percent honor.”
                </QuoteLine>
              </Clause>

              <Clause number="1.3" title="Exclusive Host Destination">
                <p>
                  The inaugural edition, live broadcast gala, and flagship
                  award ceremony shall be held strictly in Kampala, Uganda on
                  12 February 2027. Kampala shall remain the permanent
                  founding hub.
                </p>
              </Clause>

              <Clause number="1.4" title="Focus & Scope">
                <p>
                  All category entries, nominations, voting processes, and
                  spotlight honors shall focus exclusively on Ugandan
                  recording artists, producers, directors, and music industry
                  contributors.
                </p>
              </Clause>

              <Clause number="1.5" title="Official Eligibility Window">
                <p>
                  Works including singles, EPs, albums, audiovisual projects,
                  and sound productions must have been publicly released
                  between November 1st, 2025 and November 30th, 2026.
                </p>
              </Clause>

              <Clause number="1.6" title="Artist of the Year Requirement">
                <p>
                  A Ugandan artist must demonstrate verified, continuous
                  commercial success, streaming dominance, media airplay, and
                  distinct cultural impact over three years covering 2024,
                  2025, and 2026.
                </p>
              </Clause>
            </section>

            {/* ARTICLE 2 */}
            <section
              id="article-2"
              className="scroll-mt-28 border-b border-white/10 py-24"
            >
              <ArticleHeader
                number="02"
                title="Branches of Power & Governance"
              />

              <Clause number="2.1" title="Executive">
                <p>
                  <strong className="text-ink">
                    Executive Producer:
                  </strong>{" "}
                  controlled exclusively by Ramulah Nansereko and Honors Media
                  Group SMC Limited.
                </p>

                <p>
                  <strong className="text-ink">Power:</strong> overall
                  execution, brand partnerships, international media
                  distribution, and production logistics.
                </p>

                <p>
                  The Executive branch has zero voting rights on award winners.
                </p>
              </Clause>

              <Clause number="2.2" title="Legislative">
                <p>
                  <strong className="text-ink">
                    PAMH Uganda Legends Council:
                  </strong>{" "}
                  respected Ugandan music veterans, pioneers, and cultural
                  custodians representing the central, northern, eastern, and
                  western regions.
                </p>

                <p>
                  <strong className="text-ink">Power:</strong> audit nominee
                  categories, verify historical context, and uphold
                  constitutional integrity.
                </p>
              </Clause>

              <Clause number="2.3" title="Judicial">
                <p>
                  <strong className="text-ink">
                    PAMH Judicial Panel:
                  </strong>{" "}
                  nine independent vetted judges.
                </p>

                <p>
                  <strong className="text-ink">Power:</strong> review, score,
                  and approve final category winners based strictly on verified
                  metrics supplied by the Data Team.
                </p>

                <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6">
                  <p className="font-display text-xl text-ink">
                    Two-thirds majority
                  </p>

                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    At least 6 of 9 judges are required to confirm the official
                    winner.
                  </p>
                </div>
              </Clause>

              <Clause
                number="2.3.1"
                title="Panel Composition & Corporate Allocation"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoCard
                    number="05"
                    title="Corporate Seats"
                    text="1 Title Sponsor representative and 4 compliance/legal officers appointed by major Co-Sponsors."
                  />

                  <InfoCard
                    number="04"
                    title="Artistic Seats"
                    text="4 legendary retired non-performing recording artists or veteran music critics representing Uganda's diverse regional music landscape."
                  />
                </div>
              </Clause>

              <Clause number="2.4" title="Voting">
                <p>
                  <strong className="text-ink">
                    PAMH Academy & Public Voting Council:
                  </strong>{" "}
                  vetted Ugandan entertainment journalists, DJs, industry
                  professionals, and the voting public.
                </p>

                <p>
                  Its power is to narrow open entries to official nominees.
                  Public voting is strictly restricted to fan-driven
                  categories, such as the Fans&apos; Choice Award and Social
                  Media Influencer Award. Technical and professional categories
                  are strictly metric and jury-driven.
                </p>
              </Clause>
            </section>

            {/* ARTICLE 3 */}
            <section
              id="article-3"
              className="scroll-mt-28 border-b border-white/10 py-24"
            >
              <ArticleHeader
                number="03"
                title="Winner Selection Process, Voting Architecture & Content Restrictions"
              />

              <Step number="3.1">
                Voting Council and Public pull open community entries down to
                five official nominees per category.
              </Step>

              <Step number="3.2">
                The five nominees are forwarded to the Legends Council to audit,
                vet, and verify eligibility under Article 1.5.
              </Step>

              <Step number="3.3">
                The Voting Council narrows the verified list to two final
                contenders based on public or academy voting data.
              </Step>

              <Step number="3.4">
                <p>
                  The Data Team uses verified digital metrics and analytical
                  tools to score the final two across three pillars:
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <MetricCard number="01" label="Audio Quality" />
                  <MetricCard number="02" label="Video Quality" />
                  <MetricCard number="03" label="Virality / Airplay" />
                </div>
              </Step>

              <Step number="3.5">
                The Judicial Panel reviews the Data Team metrics. A two-thirds
                majority confirms the winner.
              </Step>

              <Step number="3.6">
                Confirmed winners are secured under strict envelope lock 21 days
                before the live broadcast gala. Winners are revealed live on
                stage, with signed NDAs for all technical and judicial
                handlers.
              </Step>

              {/* ARTICLE 3.7 */}
              <div className="mt-14 rounded-3xl border border-gold/30 bg-wine-deep/60 p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Article 3.7
                  </span>

                  <span className="rounded-full border border-gold/30 bg-black/20 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-gold-pale">
                    Mandatory Exclusion Clause
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
                  The X-Factor & Content Restrictions
                </h3>

                <div className="mt-8 space-y-8">
                  <div>
                    <p className="font-mono text-xs text-gold">
                      3.7.1 — Vulgarity and Violence Prohibition
                    </p>

                    <p className="mt-3 text-sm leading-7 text-ink sm:text-base">
                      No overly vulgar songs or songs promoting, encouraging,
                      or glorifying violence can be nominated or advanced.
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <p className="font-mono text-xs text-gold">
                      3.7.2 — X-Factor Exception
                    </p>

                    <p className="mt-3 text-sm leading-7 text-ink sm:text-base">
                      Unique artistic edge, avant-garde creativity, and
                      cultural subculture expression are welcome only if
                      broadcast appropriate and without explicit excessive
                      vulgarity or physical violence. Any violating nominated
                      song is immediately disqualified by executive or
                      judicial veto.
                    </p>
                  </div>
                </div>
              </div>
              {/* ARTICLE 3.8 */}
              <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Article 3.8
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white/50">
                    Three-Tier Voting Architecture
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
                  Public, Peer-Vetted & Supreme Guild Recognition
                </h3>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-ink/70 sm:text-base">
                  To ensure a balanced evaluation that recognizes fan popularity,
                  technical mastery, artistic merit, and long-term cultural impact,
                  PAMH shall operate through three distinct voting and
                  recognition streams.
                </p>

                <div className="mt-10 space-y-10">
                  <div>
                    <p className="font-mono text-xs text-gold">
                      3.8.1 - Tier 1: Public & Popular Engagement Categories
                    </p>

                    <p className="mt-4 text-sm leading-7 text-ink sm:text-base">
                      <strong>Mechanism:</strong> 100% fan-driven through approved
                      public participation systems, including official social media
                      engagement tracking and verified telecommunications voting
                      platforms or SMS shortcodes.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-ink sm:text-base">
                      <strong>Scope:</strong> This tier shall apply primarily to
                      established, high-volume artist and popular music categories
                      where measurable public support, audience reach, market
                      dominance, and established fanbases form an essential part of
                      determining the winner.
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-10">
                    <p className="font-mono text-xs text-gold">
                      3.8.2 - Tier 2: Technical & Peer-Vetted Categories
                    </p>

                    <p className="mt-4 text-sm leading-7 text-ink sm:text-base">
                      <strong>Mechanism:</strong> 100% peer-vetted through an
                      independent and duly authorized panel of qualified audio
                      producers, video producers, academy members, and approved
                      industry professionals.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-ink sm:text-base">
                      <strong>Scope:</strong> This tier is designed particularly to
                      protect and uplift emerging and new-generation talent from pure
                      popularity contests. Entries shall be assessed on relevant
                      professional criteria including vocal execution, songwriting,
                      audio engineering, production quality, visual production,
                      originality, creative direction, and innovation.
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-10">
                    <p className="font-mono text-xs text-gold">
                      3.8.3 - Tier 3: Supreme Guild Recognition & Special Honors
                    </p>

                    <p className="mt-4 text-sm leading-7 text-ink sm:text-base">
                      <strong>Mechanism:</strong> 100% guild-driven and decided
                      exclusively by the Judicial Panel and Legends Council in
                      accordance with this Constitution and approved judging
                      criteria.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-ink sm:text-base">
                      <strong>Scope:</strong> This tier is reserved for the highest
                      institutional recognitions of PAMH. Consideration may
                      include verified industry data, artistic excellence, cultural
                      influence, sustained contribution, professional legacy, and
                      long-term impact on the music industry.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-ink sm:text-base">
                      This tier shall include premier recognitions including
                      <strong> Artist of the Year</strong> and the
                      <strong> Lifetime Achievement / Honorary Awards</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ARTICLE 4 */}
            <section
              id="article-4"
              className="scroll-mt-28 border-b border-white/10 py-24"
            >
              <ArticleHeader
                number="04"
                title="Confidentiality & Integrity"
              />

              <Clause number="4.1" title="Winner Confidentiality">
                <p>
                  Winner status is strictly confidential until the live
                  envelope opening during the broadcast gala.
                </p>
              </Clause>

              <Clause number="4.2" title="Leaks & Compromised Integrity">
                <p>
                  Any Judge, Data Team member, or Honors Media Group staff
                  member who leaks, reveals, or hints at a winner before the
                  live announcement faces immediate criminal termination and
                  legal prosecution.
                </p>

                <p>
                  If an artist or team induced, bribed, or partnered in a leak,
                  the nominee is immediately disqualified and the honor
                  automatically transfers to the verified runner-up.
                </p>
              </Clause>
            </section>

            {/* ARTICLE 5 */}
            <section
              id="article-5"
              className="scroll-mt-28 border-b border-white/10 py-24"
            >
              <ArticleHeader number="05" title="Anti-Lobbying Law" />

              <Clause number="5.1" title="Zero Tolerance">
                <p>
                  Any Legend, Judge, Staff member, or Voter accepting gifts,
                  corporate favors, private requests, or lobbying for an artist
                  is immediately disqualified and permanently removed.
                </p>
              </Clause>

              <Clause number="5.2" title="Reporting">
                <p>
                  Anyone witnessing lobbying or unethical influence shall
                  report it to the Executive Producer within 24 hours.
                </p>
              </Clause>
            </section>

            {/* ARTICLE 6 */}
            <section
              id="article-6"
              className="scroll-mt-28 py-24"
            >
              <ArticleHeader
                number="06"
                title="Amendments & Future Expansion"
              />

              <Clause number="6.1" title="Constitutional Scope">
                <p>
                  This Constitution governs the 2026/2027 Uganda Edition.
                </p>
              </Clause>

              <Clause number="6.2" title="Continental Expansion">
                <p>
                  After inaugural execution and broadcast in Kampala, the
                  Executive Producer and Honors Media Group reserve exclusive
                  right to activate the Continental Expansion Protocol,
                  transitioning governance to include international regional
                  chambers for later African editions.
                </p>
              </Clause>

              <Clause number="6.3" title="Sole Executive Signatory">
                <p>
                  Only the Executive Producer of Honors Media Group SMC Limited
                  can sign award certificates, issue official executive
                  announcements, and represent the platform publicly.
                </p>
              </Clause>
            </section>

            {/* RATIFICATION */}
            <section className="border-t border-gold/30 pt-20">
              <DocumentLabel>RATIFIED & AUTHORIZED BY</DocumentLabel>

              <div className="mt-8 max-w-2xl">
                <p className="font-display text-4xl text-ink sm:text-5xl">
                  Ramulah Nansereko
                </p>

                <p className="mt-3 text-sm text-gold">
                  Founder & Executive Producer
                </p>

                <p className="mt-1 text-sm text-ink-muted">
                  Pan Africa Music Honors / Honors Media Group SMC Limited
                </p>

                <div className="mt-10 h-px w-full bg-gradient-to-r from-gold/50 via-white/10 to-transparent" />

                <div className="mt-6 flex flex-wrap justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    PAMH · Inaugural Uganda Edition
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    2026/2027
                  </span>
                </div>
              </div>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------
   COMPONENTS
--------------------------------------------- */

function DocumentLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
      {children}
    </p>
  );
}

function ArticleHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <header className="mb-14">
      <div className="flex items-end gap-5">
        <span className="font-mono text-5xl font-medium leading-none text-gold/30 sm:text-6xl">
          {number}
        </span>

        <div className="pb-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Article {number}
          </p>

          <h2 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-8 h-px bg-gradient-to-r from-gold/40 via-white/10 to-transparent" />
    </header>
  );
}

function Clause({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-5 sm:grid-cols-[70px_minmax(0,1fr)]">
      <div className="font-mono text-xs text-gold">
        {number}
      </div>

      <div>
        <h3 className="font-display text-2xl text-ink">
          {title}
        </h3>

        <div className="mt-4 space-y-5 text-sm leading-7 text-ink-muted sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7 grid gap-4 sm:grid-cols-[50px_minmax(0,1fr)]">
      <span className="pt-1 font-mono text-xs text-gold">
        {number}
      </span>

      <div className="text-sm leading-7 text-ink-muted sm:text-base">
        {children}
      </div>
    </div>
  );
}

function QuoteLine({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-l-2 border-gold/50 pl-4 font-display text-lg italic text-gold-pale">
      {children}
    </div>
  );
}

function InfoCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
      <div className="flex items-center justify-between">
        <span className="font-display text-3xl text-gold">
          {number}
        </span>

        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
          Seats
        </span>
      </div>

      <h4 className="mt-5 font-display text-xl text-ink">
        {title}
      </h4>

      <p className="mt-3 text-sm leading-6 text-ink-muted">
        {text}
      </p>
    </div>
  );
}

function MetricCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-gold/[0.035] p-5">
      <span className="font-mono text-[10px] text-gold">
        {number}
      </span>

      <p className="mt-4 font-display text-lg leading-tight text-ink">
        {label}
      </p>
    </div>
  );
}
