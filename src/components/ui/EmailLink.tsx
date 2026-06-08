import { cn } from "@/lib/cn";

type EmailLinkProps = {
  /** The address shown; also the default `mailto:` target. */
  email: string;
  /**
   * Override the link target. Defaults to `mailto:${email}`; pass a path (e.g.
   * the contact page) when the address should not open a mail client.
   */
  href?: string;
  /** Per-use type/spacing classes; the shared underline styling is built in. */
  className?: string;
};

/**
 * A festival email address with the shared underline styling and a `<wbr>` break
 * opportunity after the `@`, so long addresses wrap cleanly. Keeps foreningen and
 * kontakt in sync instead of re-hand-rolling the markup on each page.
 */
export function EmailLink({ email, href, className }: EmailLinkProps) {
  const [name, domain] = email.split("@");

  return (
    <a
      href={href ?? `mailto:${email}`}
      className={cn(
        "underline decoration-petroleum/30 underline-offset-4 transition-colors hover:text-rust hover:decoration-rust",
        className,
      )}
    >
      {domain ? (
        <>
          {name}
          <wbr />@{domain}
        </>
      ) : (
        email
      )}
    </a>
  );
}
