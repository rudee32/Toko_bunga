/** Route-level loading state. Shaped like a page so the layout does not jump. */
export default function PageSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Memuat halaman…</span>
      <div className="skeleton h-4 w-28" />
      <div className="skeleton mt-5 h-12 w-3/4 max-w-xl" />
      <div className="skeleton mt-3 h-4 w-full max-w-md" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton aspect-square w-full rounded-card" />
        ))}
      </div>
    </div>
  );
}
