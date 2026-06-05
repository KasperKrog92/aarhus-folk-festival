import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconHeart, IconArrowRight } from "@/components/icons";

export function AboutSection() {
  return (
    <section
      id="om"
      aria-labelledby="om-overskrift"
      className="scroll-mt-24 bg-petroleum py-16 text-cream-100 sm:py-24"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Festival community photo */}
        <div className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/sammen.jpg"
              alt="Festivalgæster danser sammen i en fyldt sal"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
              Sammen om musikken
            </span>
          </div>
          {/* decorative hearts */}
          <div
            aria-hidden
            className="absolute -right-3 -top-3 flex gap-1 text-pink-200"
          >
            <IconHeart className="size-6 fill-current" />
            <IconHeart className="size-4 fill-current opacity-70" />
          </div>
        </div>

        {/* Warm intro to the festival */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
            Om festivalen
          </span>
          <h2
            id="om-overskrift"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-4xl"
          >
            Festivalen er vi sammen om
          </h2>

          <div className="mt-5 space-y-4 text-base leading-relaxed text-cream-100/85 sm:text-lg">
            <p>
              Aarhus Folk Festival er et mødested for alle, der holder af
              levende musik. Her klinger spillemandens violin op ad
              kirkemuren, fødderne finder rytmen i dansen, og fremmede bliver
              til venner over en fælles melodi.
            </p>
            <p>
              Vi dyrker nysgerrigheden og traditionen på én gang — den gamle
              folkemelodi og det nye, vi skaber sammen. Kom som du er, lyt med,
              syng med, eller tag instrumentet under armen. Der er plads til
              både den garvede musiker og den, der hører folkemusik for
              første gang.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#om" variant="solidLight" size="lg">
              Læs mere om festivalen
              <IconArrowRight className="size-5" />
            </Button>
            <p className="text-sm text-cream-100/70">
              Musik · dans · nysgerrighed · fællesskab
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
