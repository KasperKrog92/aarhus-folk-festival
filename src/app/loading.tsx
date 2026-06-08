import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <section className="py-16 sm:py-20" aria-hidden="true">
      <Container>
        <div className="max-w-2xl animate-pulse">
          <div className="h-3 w-32 rounded-full bg-content/15" />
          <div className="mt-5 h-10 w-full max-w-lg rounded-full bg-content/15 sm:h-12" />
          <div className="mt-3 h-10 w-3/4 rounded-full bg-content/15 sm:h-12" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded-full bg-content/10" />
            <div className="h-4 w-5/6 rounded-full bg-content/10" />
          </div>
        </div>

        <div className="my-10 h-px w-full bg-line/10" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="min-h-64 rounded-2xl border border-line/10 bg-surface-raised p-4 shadow-sm"
            >
              <div className="aspect-[4/3] animate-pulse rounded-xl bg-content/10" />
              <div className="mt-5 h-3 w-24 animate-pulse rounded-full bg-content/15" />
              <div className="mt-4 h-6 w-3/4 animate-pulse rounded-full bg-content/15" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-content/10" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded-full bg-content/10" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
