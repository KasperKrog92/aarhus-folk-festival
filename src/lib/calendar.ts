export const calendarTimeZone = "Europe/Copenhagen";

export type CalendarEvent = {
  title: string;
  startDateIso: string;
  startTime: string;
  durationMinutes: number;
  location: string;
  details?: string;
  url?: string;
  uid: string;
};

function parseLocalDateTime(dateIso: string, time: string) {
  const [year, month, day] = dateIso.split("-").map(Number);
  const [hour, minute] = time.split(".").map(Number);

  return { year, month, day, hour, minute };
}

function shiftedLocalDateTime(
  dateIso: string,
  time: string,
  durationMinutes: number,
) {
  const { year, month, day, hour, minute } = parseLocalDateTime(dateIso, time);
  const timestamp = Date.UTC(year, month - 1, day, hour, minute + durationMinutes);
  const shifted = new Date(timestamp);

  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

/**
 * The UTC offset (e.g. "+02:00") for `calendarTimeZone` at the given wall-clock
 * moment. Derived via `Intl` so DST is handled correctly without a date library
 * — accurate outside the brief DST-transition hour (irrelevant for the festival,
 * which runs in late September / CEST).
 */
function zoneOffset(parts: ReturnType<typeof parseLocalDateTime>) {
  const asUtc = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute),
  );
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: calendarTimeZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(asUtc)
    .find((part) => part.type === "timeZoneName")?.value;

  return formatted?.replace("GMT", "") || "+00:00";
}

function formatIsoDateTime(parts: ReturnType<typeof parseLocalDateTime>) {
  const { year, month, day, hour, minute } = parts;
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${zoneOffset(parts)}`;
}

/**
 * Local "HH.MM" show time → an ISO-8601 `startDate`/`endDate` pair with the
 * correct `Europe/Copenhagen` offset, for structured data (JSON-LD `MusicEvent`
 * etc.). Shares the same local-datetime parsing the calendar links use.
 */
export function showDateTimeIso(
  dateIso: string,
  time: string,
  durationMinutes: number,
) {
  return {
    start: formatIsoDateTime(parseLocalDateTime(dateIso, time)),
    end: formatIsoDateTime(shiftedLocalDateTime(dateIso, time, durationMinutes)),
  };
}

function formatCalendarDateTime({
  year,
  month,
  day,
  hour,
  minute,
}: ReturnType<typeof parseLocalDateTime>) {
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
}

function eventStart(event: CalendarEvent) {
  return formatCalendarDateTime(parseLocalDateTime(event.startDateIso, event.startTime));
}

function eventEnd(event: CalendarEvent) {
  return formatCalendarDateTime(
    shiftedLocalDateTime(event.startDateIso, event.startTime, event.durationMinutes),
  );
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function nowUtcStamp() {
  const now = new Date();

  return [
    now.getUTCFullYear(),
    pad(now.getUTCMonth() + 1),
    pad(now.getUTCDate()),
    "T",
    pad(now.getUTCHours()),
    pad(now.getUTCMinutes()),
    pad(now.getUTCSeconds()),
    "Z",
  ].join("");
}

function calendarFileName(title: string) {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "aarhus-folk-festival"}.ics`;
}

export function googleCalendarHref(event: CalendarEvent) {
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", event.title);
  url.searchParams.set("dates", `${eventStart(event)}/${eventEnd(event)}`);
  url.searchParams.set("ctz", calendarTimeZone);
  url.searchParams.set("location", event.location);

  if (event.details) {
    url.searchParams.set("details", event.details);
  }

  return url.toString();
}

export function icsCalendarHref(event: CalendarEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aarhus Folk Festival//Calendar//DA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${nowUtcStamp()}`,
    `DTSTART;TZID=${calendarTimeZone}:${eventStart(event)}`,
    `DTEND;TZID=${calendarTimeZone}:${eventEnd(event)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.details ?? "")}`,
    `LOCATION:${escapeIcsText(event.location)}`,
  ];

  if (event.url) {
    lines.push(`URL:${event.url}`);
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function calendarDownloadName(title: string) {
  return calendarFileName(title);
}
