import { useEffect, useRef, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [value]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

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
          <p className="cal-slots-empty">Choose a date — Sunday and Fri–Sat keep different hours.</p>
        ) : (
          <>
            <p className="cal-slots-date">
              {selected.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>

            <div className="cal-slot-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="cal-slot-trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
              >
                <span>{sitting || 'Select a time'}</span>
                <svg width="11" height="7" viewBox="0 0 11 7" aria-hidden="true">
                  <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open && (
                <ul className="cal-slot-list" role="listbox" aria-label="Sitting time">
                  {sittingOptions.map((s) => (
                    <li key={s} role="option" aria-selected={sitting === s}>
                      <button
                        type="button"
                        className="cal-slot-option"
                        data-selected={sitting === s}
                        onClick={() => { onSelectSitting(s); setOpen(false); }}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="cal-slots-hint">
              {selected.getDay() === 0
                ? 'Sunday is the roast — one long sitting, noon till three.'
                : selected.getDay() === 5 || selected.getDay() === 6
                  ? 'Lunch till half two; dinner runs later, Fri–Sat, till ten.'
                  : 'Lunch till half two; dinner from six till nine.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
