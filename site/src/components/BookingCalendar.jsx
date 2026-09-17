import { useState } from 'react';
import { sittingsForDate } from '../data/sittings.js';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/* Local-calendar-date formatting, deliberately not `Date#toISOString`: that
   converts to UTC first, which silently shifts every cell back a day for
   anyone west of Greenwich at any positive UTC offset — including here. */
function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* A Cal.com-style booking widget — a month grid on the left, that day's
   sittings on the right — built in-house so it stays a static prototype
   with no account, API key, or third party involved. */
export default function BookingCalendar({ value, onSelectDate, sitting, onSelectSitting }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = value ? new Date(`${value}T12:00:00`) : null;
  const [viewMonth, setViewMonth] = useState(startOfMonth(selected ?? today));

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const canGoPrev = startOfMonth(today) < viewMonth;
  const sittingOptions = sittingsForDate(value);

  return (
    <div className="booking-grid">
      <div>
        <div className="cal-head">
          <button
            type="button" className="cal-nav" disabled={!canGoPrev}
            onClick={() => setViewMonth(new Date(year, month - 1, 1))}
            aria-label="Previous month"
          >
            ‹
          </button>
          <span>{viewMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
          <button
            type="button" className="cal-nav"
            onClick={() => setViewMonth(new Date(year, month + 1, 1))}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
        <div className="cal-weekdays">
          {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
        </div>
        <div className="cal-days">
          {cells.map((d, i) => {
            if (!d) return <span key={`empty-${i}`} aria-hidden="true" />;
            const iso = toISODate(d);
            const isPast = d < today;
            return (
              <button
                type="button"
                key={iso}
                className="cal-day"
                data-selected={selected ? isSameDay(d, selected) : false}
                data-today={isSameDay(d, today)}
                disabled={isPast}
                aria-label={d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                onClick={() => onSelectDate(iso)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="cal-slots">
        {!value ? (
          <p className="cal-slots-empty">Choose a date — Sunday and Fri–Sat have their own sittings.</p>
        ) : (
          <>
            <p className="cal-slots-date">
              {selected.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <div className="cal-slots-list">
              {sittingOptions.map((s) => (
                <button
                  type="button"
                  key={s}
                  className="cal-slot"
                  data-selected={sitting === s}
                  onClick={() => onSelectSitting(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="cal-slots-hint">
              {sittingOptions.length === 1
                ? 'Sunday is one sitting only — the roast, noon until it runs out.'
                : sittingOptions.length === 4
                  ? 'Open later Fri–Sat, so there is a fourth, 21.30 sitting.'
                  : 'The usual three sittings, Monday to Thursday.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
