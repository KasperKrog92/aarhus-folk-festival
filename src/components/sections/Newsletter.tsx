"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { IconMail, IconArrowRight } from "@/components/icons";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  // No backend yet — just acknowledge the sign-up locally for this concept.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="nyhedsbrev"
      aria-labelledby="nyhedsbrev-overskrift"
      className="scroll-mt-24 pb-20 pt-4"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-pink-200/60 bg-gradient-to-br from-pink-100 via-cream-50 to-cream-100 px-6 py-10 sm:px-12 sm:py-14">
          {/* decorative dots */}
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-pink/20"
          >
            <defs>
              <pattern
                id="news-dots"
                width="18"
                height="18"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#news-dots)" />
          </svg>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
                <IconMail className="size-4" />
                Nyhedsbrev 2026
              </span>
              <h2
                id="nyhedsbrev-overskrift"
                className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Vær først med det hele
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
                Få besked, når programmet løftes, billetterne åbner, og de
                første kunstnere offentliggøres. Ingen spam — kun folkemusik.
              </p>
            </div>

            <div>
              {submitted ? (
                <p
                  role="status"
                  className="rounded-2xl bg-petroleum px-5 py-4 text-center font-semibold text-cream-50"
                >
                  Tak! Vi skriver til dig, så snart der er nyt. 🎶
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                  noValidate
                >
                  <div className="flex-1">
                    <label htmlFor="nyhedsbrev-email" className="sr-only">
                      Din e-mailadresse
                    </label>
                    <input
                      id="nyhedsbrev-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="din@email.dk"
                      className="w-full rounded-full border border-ink/15 bg-white px-5 py-3.5 text-base text-ink placeholder:text-ink-muted focus:border-petroleum focus:outline-none focus:ring-2 focus:ring-petroleum/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-6 py-3.5 font-semibold text-white shadow-sm shadow-pink/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-600"
                  >
                    Tilmeld
                    <IconArrowRight className="size-5" />
                  </button>
                </form>
              )}
              <p className="mt-3 text-xs text-ink-muted">
                Demo — formularen sender ikke noget endnu.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
