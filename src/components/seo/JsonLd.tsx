/**
 * Renders one or more schema.org graphs as `<script type="application/ld+json">`.
 * Server component (no `"use client"`); pass it the plain objects built by
 * `lib/structured-data.ts`. An array emits one script tag per entry.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const graphs = Array.isArray(data) ? data : [data];

  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Server-rendered from our own static data — no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
