import Link from "next/link";
import {
  IconPin,
  IconBed,
  IconBus,
  IconCup,
  IconAccessibility,
  IconArrowRight,
} from "@/components/icons";
import type { PracticalIcon, PracticalItem } from "@/data/practical";
import type { Locale } from "@/i18n/config";

const icons: Record<PracticalIcon, React.ComponentType<{ className?: string }>> = {
  pin: IconPin,
  bed: IconBed,
  bus: IconBus,
  cup: IconCup,
  accessibility: IconAccessibility,
};

export function PracticalCard({
  item,
  locale,
}: {
  item: PracticalItem;
  locale: Locale;
}) {
  const Icon = icons[item.icon];

  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col gap-5 rounded-2xl border border-petroleum/15 bg-cream-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-petroleum/30 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-petroleum/10 text-petroleum transition-colors group-hover:bg-petroleum group-hover:text-cream-50">
          <Icon className="size-6" />
        </span>
        <h3 className="min-w-0 font-display text-lg font-semibold leading-snug text-ink">
          {item.title[locale]}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">
        {item.description[locale]}
      </p>
      <IconArrowRight className="mt-auto size-5 text-teal transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
