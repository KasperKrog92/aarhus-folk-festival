# Plan: Refactoring (deduplication pass)

A plan for removing the duplication that has begun to drift across the site. The
codebase is healthy — clean data/component separation, consistent i18n,
server-first — so this is housekeeping, not a rewrite. Every item below collapses
copy-pasted markup or content into a single source of truth, in the spirit of the
"edit in one place" rule the architecture doc already states for acts.

> Status: complete. Findings are from an audit on 2026-06-08. Each phase is
> independently shippable; the suggested order runs low-risk wins first, then the
> larger structural dedupe. No behaviour or visual change is intended — these are
> pure refactors, so verify with `pnpm build` + a visual pass after each phase.
>
> **Phases 1–3 done (2026-06-08).** See per-item notes below.

## Guiding constraints

- **No visual or copy change.** The resolved DOM/classes should be identical
  before and after. Where two copies differ slightly today (e.g. the page-intro
  eyebrow tracking), pick the page version as canonical and note it.
- **Keep the conventions.** Server components by default; data stays plain in
  `src/data/`; UI chrome stays in `dictionaries.ts`; no new dependencies.
- **Update the docs map** as the last step of any phase that changes a convention
  or adds a shared component (architecture.md / i18n.md).

---

## Phase 1 — Low-risk wins ✅ done (2026-06-08)

### 1a. A page-intro variant on `SectionHeading` ✅

The eyebrow + `<h1>` + intro block is hand-rolled, with identical classes, on six
pages:
[program](../../src/app/program/page.tsx),
[kunstnere](../../src/app/kunstnere/page.tsx),
[workshops](../../src/app/workshops/page.tsx),
[foreningen](../../src/app/foreningen/page.tsx),
[kontakt](../../src/app/kontakt/page.tsx),
and the header of [om-festivalen](../../src/app/om-festivalen/page.tsx).

[SectionHeading](../../src/components/ui/SectionHeading.tsx) already exists but is
sized for in-page `<h2>` sections (`text-3xl/4xl`, `tracking-[0.2em]`, `text-xs`
eyebrow), so pages don't use it. The page pattern is larger
(`text-4xl/5xl`, `tracking-[0.18em]`, `text-sm` eyebrow).

**Do:** add a `size?: "section" | "page"` prop to `SectionHeading` (default
`"section"` keeps current behaviour). The `"page"` size applies the larger type
and defaults `as` to `"h1"`. Replace the six hand-rolled blocks with
`<SectionHeading size="page" as="h1" eyebrow={…} title={…} intro={…} />`.

- Canonical values for `"page"`: eyebrow `text-sm … tracking-[0.18em]`, title
  `text-4xl … sm:text-5xl`, intro `text-lg … mt-5`.
- om-festivalen's header also has a `lead` paragraph and a different intro layout
  (multi-paragraph, grid). Convert only the eyebrow/title; leave its bespoke lead
  and intro list as-is, or pass them as children. Don't force it into the mould.

**Risk:** low. One component, additive prop.

**Done:** `size` prop added (default `"section"` unchanged). All six blocks now use
`<SectionHeading size="page" … />`; program/kunstnere/workshops keep their
`max-w-2xl` via `className`, foreningen/kontakt inherit the wrapper's `max-w-3xl`,
and om-festivalen converts only eyebrow/title (its lead + intro grid stay as
siblings). Canonical `"page"` title is `text-4xl sm:text-5xl leading-tight` (no
`tracking-tight`) — this changed om-festivalen's `<h1>` from `leading-[1.1]` to
`leading-tight` to match the other five pages; the rest is class-identical.
architecture.md's conventions note now documents both sizes.

### 1b. Move `backLabel` out of content data into the dictionary ✅

`{ da: "Tilbage til forsiden", en: "Back to the homepage" }` is repeated as
content data in five files:
[artists.ts](../../src/data/artists.ts),
[workshops.ts](../../src/data/workshops.ts),
[program.ts](../../src/data/program.ts),
[association.ts](../../src/data/association.ts),
[contact.ts](../../src/data/contact.ts).

This is UI chrome, not content, so it belongs in
[dictionaries.ts](../../src/i18n/dictionaries.ts) under `common` (next to
`back` / `readMore`), removing a translation-drift risk.

**Do:** add `common.backToHome` to the dictionary. Delete `backLabel` from the
five data files and the type. Update the bottom-of-page back `<Button>` on each
page to read `t.common.backToHome`.

**Risk:** low. Touches data + five call sites; `pnpm build` catches any miss via
the derived `Dictionary` type.

**Docs:** note in [i18n.md](../../i18n.md) that nav/chrome labels live in the
dictionary, not per-page data.

**Done:** `common.backToHome` added to both locales; `backLabel` deleted from all
five data files; every back button now reads `t.common.backToHome`
(program/foreningen/kontakt gained the `getDictionary` import). i18n.md updated.
`pnpm build` (incl. typecheck) passes — the derived `Dictionary` type confirms no
call site was missed.

---

## Phase 2 — Act listing & detail consolidation ✅ done (2026-06-08)

These two items hinge on the same idea: normalize an artist or workshop into a
shared shape, so the near-identical pages collapse. Do them together.

### 2a. Shared listing render

[kunstnere/page.tsx](../../src/app/kunstnere/page.tsx) and
[workshops/page.tsx](../../src/app/workshops/page.tsx) are character-identical
except the data import and field accessors (`artist.genre`/`artist.name` string
vs `workshop.category`/`workshop.name[locale]`).

**Do:** extract an `ActListing` server component (in `components/sections/`) that
takes the resolved page copy (eyebrow/title/intro) and a pre-mapped
`ActCard`-props list. Each page resolves its own list — that mapping is the only
type-specific part — and renders `<ActListing … />`. The grid, `FolkStripe`, and
back button live in `ActListing`.

**Done:** `components/sections/ActListing.tsx` now owns the page section,
`Container`, page `SectionHeading`, `FolkStripe`, card grid and back-to-home
button. `ActCardProps` is exported from `ActCard`; `/kunstnere` and `/workshops`
now only resolve locale/page data and map acts into those card props.

### 2b. Shared detail mapping + metadata helper

[kunstnere/[slug]/page.tsx](../../src/app/kunstnere/[slug]/page.tsx) and
[workshops/[slug]/page.tsx](../../src/app/workshops/[slug]/page.tsx) share:

- the `shows.map(show => ({ day: formatDay(show.dayId, locale), time, venue:
  show.venue[locale] }))` block — verbatim, and
- the `generateMetadata` OpenGraph builder — same logic, different field access.

**Do:**

- Add `actDetailShows(shows, locale)` (in [program.ts](../../src/data/program.ts),
  next to `formatDay` / `Show` / `ActDetailShow`) returning `ActDetailShow[]`.
- Add an `actMetadata({ name, tagline, image, href }, locale)` helper (a small
  `lib/` module or alongside the detail component) that builds the
  title/description/canonical/OpenGraph object both detail pages currently
  hand-roll.
- Both `[slug]` pages shrink to: look up act → `notFound()` guard → call helpers.

**Risk:** medium — touches the data layer and four route files. Build + a click
through `/kunstnere/[slug]` and `/workshops/[slug]` in both locales.

**Docs:** update [architecture.md](../../architecture.md) "Programme & acts" to
mention `ActListing`, `actDetailShows`, and the metadata helper as the reuse
points for new listing/detail pages.

**Done:** `data/program.ts` now exports `ActDetailShow` and `actDetailShows()`;
both act detail routes use it. `lib/metadata.ts` now exports `actMetadata()`;
both detail routes use it for title/description/canonical/OpenGraph. The
"Programme & acts" section of `architecture.md` documents the new reuse points.
`pnpm build` passes. Browser verification was skipped because a dev server was
already active on port 3000, per the project guide.

---

## Phase 3 — Component polish ✅ done (2026-06-08)

Independent, smaller wins. All four implemented as pure refactors; `pnpm build`
(incl. typecheck + static generation of all routes) passes. Browser verification
was left to the owner per the project guide (dev server assumed running).

### 3a. Card shell / image extraction ✅

[ActCard](../../src/components/ui/ActCard.tsx) and
[EventCard](../../src/components/ui/EventCard.tsx) share the same outer `<article>`
(`group relative flex h-full flex-col overflow-hidden rounded-2xl border
border-line/[0.07] bg-surface-raised shadow-sm transition-all duration-200
hover:-translate-y-1 hover:shadow-lg`) and the same image-or-`ImagePlaceholder`
block at `aspect-[4/3]`.

**Do:** extract a `CardShell` wrapper and/or a `CardImage` sub-component (handles
the `<Image fill>` vs `ImagePlaceholder` branch + `sizes`). Keep the per-card
content (`EventCard`'s time badge + `FavouriteButton`) as children.
[ExperienceCard](../../src/components/ui/ExperienceCard.tsx) and
[PracticalCard](../../src/components/ui/PracticalCard.tsx) share the icon-chip +
title + description + arrow skeleton — same idea, lower priority.

**Done:** new `components/ui/CardShell.tsx` exports `CardShell` (the shared
`<article>` frame, `group` set here) and `CardImage` (the 4:3 `<Image fill>` vs
`ImagePlaceholder` branch, with a `sizes` prop and optional placeholder `icon`).
`ActCard` and `EventCard` now compose both; `EventCard` keeps its time badge +
`FavouriteButton` as siblings of `CardImage` inside the existing `relative` wrapper.
Class output is identical. The lower-priority `ExperienceCard`/`PracticalCard`
icon-chip merge was left alone — their borders, hover states, icon sizes and layout
differ enough that a shared shell would add branching without real dedupe.

### 3b. `EmailLink` component ✅

mailto styling (`underline decoration-petroleum/30 underline-offset-4 …
hover:text-rust hover:decoration-rust`) is duplicated in
[foreningen](../../src/app/foreningen/page.tsx) and
[kontakt](../../src/app/kontakt/page.tsx), and the `<wbr>` email-splitting logic
lives inline in foreningen. The recent "Mail visual fix on foreningen" commit
shows this spot is actively drifting.

**Do:** extract `EmailLink` (handles the `<wbr>` break-on-`@` + the shared
styling) so both pages stay in sync.

**Done:** new `components/ui/EmailLink.tsx` owns the underline styling plus the
`<wbr>`-after-`@` split; per-use type/spacing comes in via `className`, and `href`
defaults to `mailto:${email}` (foreningen overrides it to its contact-page link).
Both pages now render `<EmailLink>`; foreningen dropped its inline `emailName`/
`emailDomain` split. kontakt's address gains the same `<wbr>` break opportunity —
a DOM-only addition (invisible, no visual/copy change) that is the intended sync.

### 3c. `pageMetadata` helper ✅

Every page repeats `const locale = await getLocale(); return { title, description,
alternates: { canonical } }`. A `pageMetadata({ title, description, href },
locale)` helper trims ~5 lines per page and standardizes canonicals. (The act
detail pages use the richer `actMetadata` from 2b instead.)

**Done:** `pageMetadata({ title, description, href }, locale)` added to
[lib/metadata.ts](../../src/lib/metadata.ts) next to `actMetadata`. It takes the
`Localized` title/description objects and resolves them for `locale` (which is why
it keeps the `locale` param, whereas `actMetadata` receives already-resolved
strings and takes none), then returns title + description + `alternates.canonical`.
All six standard pages (program, kunstnere, workshops, foreningen, kontakt,
om-festivalen) call it; om-festivalen passes its `metaTitle`/`metaDescription`.
architecture.md's SEO section now points new routes at the helper.

### 3d. `HeartDivider` decorative ✅

The `<span h-px> + IconHeart + <span h-px>` motif repeats in
[ExperienceSection](../../src/components/sections/ExperienceSection.tsx) and the
community block of [om-festivalen](../../src/app/om-festivalen/page.tsx), with
light/dark colour variants. A small `HeartDivider` in `components/decorative/`
with a `tone` prop fits the existing decorative set.

**Done:** new `components/decorative/HeartDivider.tsx` renders the rule +
`IconHeart` + rule motif with a `tone` prop (`dark` = pink, default; `light` =
pink-200 for petroleum backgrounds) and a `className` escape hatch.
`ExperienceSection` uses `<HeartDivider />`; om-festivalen's community block uses
`<HeartDivider tone="light" className="mx-auto justify-center" />`. Same class set
either way.

---

## Explicitly out of scope

- **Icon-key → component maps** (`Record<XIcon, ComponentType>`) recur in
  om-festivalen, `ExperienceCard`, `PracticalCard`, and `EventCard`'s
  `categoryIcon`. This is the *intended* pattern — data stays plain (string keys),
  components map to SVGs. Leave it.

## Suggested sequencing

1. ~~**Phase 1 (1a + 1b)** — one small PR, low risk, immediate clarity.~~ ✅ done (2026-06-08).
2. **Phase 2 (2a + 2b)** — the biggest structural dedupe; do as one PR since both
   rely on act normalization. Update architecture.md.
3. ~~**Phase 3** — polish, cherry-picked as time allows.~~ ✅ done (2026-06-08); all four items shipped.

After each phase: `pnpm build`, a visual pass in both locales, then check the docs
map per the AGENTS.md commit checklist before pushing.
