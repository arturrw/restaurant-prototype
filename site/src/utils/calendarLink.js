function pad(n) {
  return String(n).padStart(2, '0');
}

function stamp(d) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

/* Builds a Google Calendar "quick add" link and a downloadable .ics file
   for the confirmed booking — both work from static data with no backend,
   account, or API key: Google's render endpoint takes a plain query
   string, and .ics is just text served as a data: URI. */
export function buildCalendarLinks({ name, guests, date, sitting }) {
  const [h, m] = sitting.split('.').map(Number);
  const start = new Date(`${date}T${pad(h)}:${pad(m)}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // a two-hour sitting

  const title = `Table for ${guests} — The Marigold Arms`;
  const location = '14 Elder Street, Kensington, London W8 4QT';
  const details = `Reservation for ${name}, party of ${guests}.`;

  const googleUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${stamp(start)}/${stamp(end)}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(location)}`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Marigold Arms//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${start.getTime()}@marigoldarms.co.uk`,
    `DTSTAMP:${stamp(new Date())}Z`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${details}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return { googleUrl, icsHref };
}
