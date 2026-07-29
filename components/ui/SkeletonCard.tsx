export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-base-surface">
      <div className="h-56 bg-white/10" />

      <div className="space-y-3 p-6">
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="h-6 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
      </div>
    </div>
  );
}