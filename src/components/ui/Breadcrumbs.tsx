import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  label,
  className,
}: {
  items: BreadcrumbItem[];
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-content-soft">
        {items.map((item, index) => {
          const current = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-content-muted">
                  /
                </span>
              ) : null}
              {item.href && !current ? (
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors hover:text-rust"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={current ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
