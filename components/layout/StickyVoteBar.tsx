"use client";

export default function StickyVoteBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-base-surface border-t border-gold/20 p-4">
      <a
        href="/vote"
        className="block text-center rounded-full bg-gold py-3 font-semibold text-base"
      >
        Vote Now
      </a>
    </div>
  );
}