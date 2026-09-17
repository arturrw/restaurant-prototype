/* Sittings follow the house's own hours (see the Hours panel on /visit):
   Sunday is the one-sitting roast, Fri–Sat stay open later so get a
   fourth, later sitting, and Mon–Thu keep the standard three. Shared by
   the reservation form and its booking calendar so they can't drift. */
export function sittingsForDate(dateStr) {
  if (!dateStr) return ['12.00', '18.30', '20.30'];
  const day = new Date(`${dateStr}T12:00:00`).getDay();
  if (day === 0) return ['12.00'];
  if (day === 5 || day === 6) return ['12.00', '18.30', '20.30', '21.30'];
  return ['12.00', '18.30', '20.30'];
}
