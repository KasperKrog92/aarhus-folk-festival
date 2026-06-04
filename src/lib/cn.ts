/**
 * Tiny class-name joiner. Filters out falsy values so conditional classes
 * stay readable without pulling in an extra dependency.
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
