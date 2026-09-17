function pad(n) {
  return String(n).padStart(2, '0');
}

/* Half-hour slots from `startH:startM` to `endH:endM`, inclusive. */
function halfHourRange(startH, startM, endH, endM) {
  const out = [];
  let h = startH;
  let m = startM;
  while (h < endH || (h === endH && m <= endM)) {
    out.push(`${pad(h)}.${pad(m)}`);
    m += 30;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }
  }
  return out;
}

/* Bookable times follow the house's own hours (see the Hours panel on
   /visit): lunch runs noon to half two every day it's served, and dinner
   stretches later on Fri–Sat since the doors stay open past 11. Sunday
   is the roast only — one long sitting, noon till it runs out — so there
   is no separate dinner window. Shared by the reservation form and its
   booking calendar so they can't drift. */
export function sittingsForDate(dateStr) {
  if (!dateStr) return [...halfHourRange(12, 0, 14, 30), ...halfHourRange(18, 0, 21, 0)];
  const day = new Date(`${dateStr}T12:00:00`).getDay();
  if (day === 0) return halfHourRange(12, 0, 15, 0);
  if (day === 5 || day === 6) return [...halfHourRange(12, 0, 14, 30), ...halfHourRange(18, 0, 22, 0)];
  return [...halfHourRange(12, 0, 14, 30), ...halfHourRange(18, 0, 21, 0)];
}
