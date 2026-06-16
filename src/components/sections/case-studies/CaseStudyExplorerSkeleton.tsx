import { Skeleton } from "@/components/ui/Skeleton";

export function CaseStudyExplorerSkeleton() {
  return (
    <section
      className="section-padding bg-[var(--surface)]"
      aria-label="Loading case studies"
      aria-busy
    >
      {/* Header */}
      <div className="content-container mb-10 max-w-2xl">
        <Skeleton className="mb-3 h-4 w-28 rounded-md" />
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-lg rounded-md" />
      </div>

      {/* Engagement type tabs */}
      <div className="content-container mb-8">
        <div className="inline-flex gap-1 rounded-xl border border-[var(--border)] bg-white p-1">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <Skeleton className="mt-2 h-3.5 w-64 rounded-md" />
      </div>

      {/* Secondary filter chips */}
      <div className="content-container mb-12">
        <Skeleton className="mb-3 h-3 w-20 rounded-md" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
        <Skeleton className="mt-3 h-4 w-80 rounded-md" />
      </div>

      {/* Detail card */}
      <div className="content-container">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_16px_48px_rgba(28,30,84,0.08)]">
          {/* Hero image placeholder */}
          <Skeleton className="aspect-[21/9] min-h-[200px] w-full rounded-none sm:min-h-[280px]" />

          <div className="p-6 md:p-10">
            {/* Description lines */}
            <Skeleton className="h-5 w-full max-w-3xl rounded-md" />
            <Skeleton className="mt-2 h-5 w-4/5 rounded-md" />
            <Skeleton className="mt-2 h-5 w-3/5 rounded-md" />

            {/* Client info box */}
            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="mt-2 h-4 w-full max-w-3xl rounded-md" />
              <Skeleton className="mt-1 h-4 w-2/3 rounded-md" />
              <div className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
                <div>
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="mt-1 h-4 w-32 rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-3 w-28 rounded-md" />
                  <Skeleton className="mt-1 h-4 w-36 rounded-md" />
                </div>
              </div>
            </div>

            {/* Improvements grid */}
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
                >
                  <Skeleton className="h-8 w-20 rounded-md" />
                  <Skeleton className="mt-2 h-3.5 w-28 rounded-md" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Before / After cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8"
            >
              <Skeleton className="mb-4 h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="mt-3 h-4 w-full rounded-md" />
              <Skeleton className="mt-1 h-4 w-4/5 rounded-md" />
              <Skeleton className="mt-6 aspect-[16/10] w-full rounded-xl" />
              <div className="mt-6 space-y-2.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--brand-dark)] p-8 md:p-10">
          <Skeleton className="h-8 w-8 rounded-md opacity-30" />
          <Skeleton className="mt-6 h-5 w-full max-w-3xl rounded-md opacity-20" />
          <Skeleton className="mt-2 h-5 w-4/5 rounded-md opacity-20" />
          <Skeleton className="mt-2 h-5 w-3/5 rounded-md opacity-20" />
          <div className="mt-8 border-t border-white/10 pt-8">
            <Skeleton className="h-4 w-40 rounded-md opacity-20" />
            <Skeleton className="mt-1 h-3 w-28 rounded-md opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
