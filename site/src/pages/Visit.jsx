import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import PageIntro from '../components/PageIntro.jsx';
import LocationMap from '../components/LocationMap.jsx';
import BookingCalendar from '../components/BookingCalendar.jsx';
import Reveal from '../components/Reveal.jsx';
import Honeypot from '../components/Honeypot.jsx';
import { useFormGuard } from '../hooks/useFormGuard.js';
import { sittingsForDate } from '../data/sittings.js';
import { buildCalendarLinks } from '../utils/calendarLink.js';

const emptyForm = { name: '', phone: '', date: '', guests: '2', sitting: '18.30', notes: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please tell us who the table is for.';
  if (!/^\d{7,15}$/.test(form.phone.trim())) errors.phone = 'A telephone number we can reach you on.';
  if (!form.date) errors.date = 'Which day would you like?';
  else if (form.date < new Date().toISOString().slice(0, 10)) errors.date = 'That date has passed.';
  const guests = Number(form.guests);
  if (!guests || guests < 1 || guests > 12) errors.guests = 'Between one and twelve; write to us for more.';
  return errors;
}

export default function Visit() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const { isBot } = useFormGuard();

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  // Filtered variants for fields where only certain characters make sense —
  // stripped as you type rather than merely flagged after the fact.
  const setFiltered = (key, filter) => (e) => {
    setForm((f) => ({ ...f, [key]: filter(e.target.value) }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };
  const setName = setFiltered('name', (v) => v.replace(/[^\p{L}\s'-]/gu, ''));
  const setPhone = setFiltered('phone', (v) => v.replace(/\D/g, '').slice(0, 15));
  const setGuests = setFiltered('guests', (v) => {
    const digits = v.replace(/\D/g, '');
    return digits === '' ? '' : String(Math.min(Number(digits), 12));
  });

  const selectDate = (iso) => {
    setForm((f) => {
      const options = sittingsForDate(iso);
      return { ...f, date: iso, sitting: options.includes(f.sitting) ? f.sitting : options[0] };
    });
    setErrors((prev) => (prev.date ? { ...prev, date: undefined } : prev));
  };
  const selectSitting = (s) => setForm((f) => ({ ...f, sitting: s }));

  const submit = (e) => {
    e.preventDefault();

    // A filled honeypot or a suspiciously instant submit reads as automated.
    // We don't tip it off — just skip straight to the same confirmation a
    // real guest would see, without validating or "sending" anything.
    if (isBot(honeypot)) {
      setStatus('sent');
      return;
    }

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    // A prototype: no request is made, we only simulate the round trip.
    setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <main className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*1.6) calc(var(--space-8)*2)' }}>
      <PageIntro kicker="Elder Street, W8" title="Come and See Us" />

      <div className="visit-grid" style={{ marginTop: 'calc(var(--space-8)*1.4)' }}>
        <Reveal as="section" from="right" fade={false}>
          <h2 style={{ fontSize: 30, fontWeight: 400, margin: '0 0 var(--space-4)' }}>Reserve the dining room</h2>
          <p
            style={{
              fontSize: 14.5, lineHeight: 1.8, margin: '0 0 var(--space-6)',
              color: 'color-mix(in srgb, var(--color-text) 70%, transparent)',
            }}
          >
            Tables are held for fifteen minutes. For parties of nine or more, or the whole upstairs room,
            write to us and we will call you back.
          </p>

          {/* Enter-only. Same reason as the menu tabs: an `AnimatePresence
              mode="wait"` here would deadlock the route-level one in App.jsx. */}
          {status === 'sent' ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                  <motion.svg
                    width="42" height="42" viewBox="0 0 42 42" fill="none"
                    style={{ margin: '0 auto var(--space-3)' }}
                    aria-hidden
                  >
                    <motion.circle
                      cx="21" cy="21" r="19" stroke="var(--color-accent)" strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M13 21.5 18.5 27 29 15.5" stroke="var(--color-accent)" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.5, ease: 'easeOut' }}
                    />
                  </motion.svg>
                  <h3 style={{ fontSize: 24, fontWeight: 400, margin: '0 0 var(--space-2)' }}>
                    Thank you, {form.name.split(' ')[0] || 'friend'}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, color: 'color-mix(in srgb, var(--color-text) 68%, transparent)' }}>
                    Your table is booked — we'll ring to confirm.
                  </p>
                </div>

                <div className="confirm-card">
                  <div className="confirm-row">
                    <span className="confirm-label">What</span>
                    <span>Dinner for {form.guests || '—'} at The Marigold Arms</span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">When</span>
                    <span>
                      {form.date
                        ? new Date(`${form.date}T12:00:00`).toLocaleDateString('en-GB', {
                            weekday: 'long', day: 'numeric', month: 'long',
                          })
                        : '—'}
                      <br />{form.sitting}
                    </span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Who</span>
                    <span>
                      {form.name || '—'}
                      <br /><span className="text-muted">{form.phone}</span>
                    </span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Where</span>
                    <span>14 Elder Street, Kensington, London W8 4QT</span>
                  </div>
                </div>

                {form.date && form.sitting && (() => {
                  const { googleUrl, icsHref } = buildCalendarLinks(form);
                  return (
                    <div className="confirm-actions">
                      <p className="confirm-actions-label">Add to calendar</p>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <a
                          href={googleUrl} target="_blank" rel="noreferrer"
                          className="btn btn-secondary"
                          style={{ fontSize: 12.5, letterSpacing: '0.02em' }}
                        >
                          Google Calendar
                        </a>
                        <a
                          href={icsHref} download="marigold-arms-booking.ics"
                          className="btn btn-secondary"
                          style={{ fontSize: 12.5, letterSpacing: '0.02em' }}
                        >
                          Apple / Outlook (.ics)
                        </a>
                      </div>
                    </div>
                  );
                })()}

                <p style={{ margin: 'var(--space-4) 0 0', fontSize: 12, textAlign: 'center', color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>
                  This is a prototype — nothing was sent.
                </p>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => { setForm(emptyForm); setHoneypot(''); setStatus('idle'); }}
                  style={{ marginTop: 'var(--space-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12 }}
                >
                  Book another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Honeypot value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="company" />
                <div className="form-grid">
                  <Field label="Name" error={errors.name}>
                    <input
                      className="input" type="text" placeholder="e.g. James Whitfield" value={form.name}
                      onChange={setName} aria-invalid={!!errors.name} autoComplete="name"
                    />
                  </Field>
                  <Field label="Telephone" error={errors.phone}>
                    <input
                      className="input" type="tel" inputMode="numeric" placeholder="e.g. 07700 900123"
                      value={form.phone} onChange={setPhone} aria-invalid={!!errors.phone}
                      autoComplete="tel" maxLength={15}
                    />
                  </Field>
                  <Field label="Guests" error={errors.guests}>
                    <input
                      className="input" type="text" inputMode="numeric" maxLength={2}
                      value={form.guests} onChange={setGuests} aria-invalid={!!errors.guests}
                    />
                  </Field>
                </div>

                <div style={{ marginTop: 'var(--space-4)' }}>
                  <Field label="Date & sitting" error={errors.date}>
                    <div style={{ marginTop: 4 }}>
                      <BookingCalendar
                        value={form.date}
                        onSelectDate={selectDate}
                        sitting={form.sitting}
                        onSelectSitting={selectSitting}
                      />
                    </div>
                  </Field>
                </div>

                <div className="field" style={{ marginTop: 'var(--space-4)' }}>
                  <label>Anything we should know</label>
                  <textarea
                    className="input" placeholder="Allergies, a birthday, a dog"
                    value={form.notes} onChange={set('notes')}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={status === 'sending'}
                  style={{
                    marginTop: 'var(--space-4)', letterSpacing: '0.1em',
                    textTransform: 'uppercase', fontSize: 12, padding: 13,
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Request the table'}
                </button>
              </motion.form>
            )}
        </Reveal>

        <Reveal as="section" from="left" delay={0.12} fade={false} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <LocationMap />

          <div>
            <h3 style={asideHeading}>Finding us</h3>
            <p style={{ margin: 'var(--space-4) 0 0', fontSize: 15, lineHeight: 1.9 }}>
              14 Elder Street<br />
              Kensington, London W8 4QT<br />
              <a href="tel:+442079460014">020 7946 0014</a><br />
              <a href="mailto:table@marigoldarms.co.uk"><span className="email-hover">table@marigoldarms.co.uk</span></a>
            </p>
            <p
              style={{
                margin: 'var(--space-4) 0 0', fontSize: 13.5, lineHeight: 1.8,
                color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
              }}
            >
              Notting Hill Gate or High Street Kensington, seven minutes on foot from either. No car
              park; the meters are free after six.
            </p>
          </div>

          <div>
            <h3 style={asideHeading}>Hours</h3>
            <div style={{ display: 'grid', gap: 'var(--space-2)', marginTop: 'var(--space-4)', fontSize: 14 }}>
              {[
                ['Monday – Thursday', 'Noon – 11pm'],
                ['Friday – Saturday', 'Noon – midnight'],
                ['Sunday', 'Noon – 10.30pm'],
              ].map(([days, hours], i) => (
                <div
                  key={days}
                  style={{
                    display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)',
                    paddingBottom: i < 2 ? 'var(--space-2)' : 0,
                    borderBottom: i < 2 ? '1px solid var(--color-divider)' : 'none',
                  }}
                >
                  <span className="text-muted">{days}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="private-hire" style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)' }}>
            <h3 style={asideHeading}>Private hire</h3>
            <p style={{ margin: 'var(--space-4) 0 0', fontSize: 14, lineHeight: 1.8, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
              The room upstairs seats twenty-eight, has its own bar, and can be booked whole for
              a party, a wake, or an office that has earned a long lunch.
            </p>
            <a href="mailto:events@marigoldarms.co.uk" style={{ display: 'inline-block', marginTop: 'var(--space-2)', fontSize: 14 }}>
              <span className="email-hover">events@marigoldarms.co.uk</span>
            </a>
          </div>

          <div id="careers" style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)' }}>
            <h3 style={asideHeading}>Work with us</h3>
            <p style={{ margin: 'var(--space-4) 0 0', fontSize: 14, lineHeight: 1.8, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
              We're usually looking for kitchen porters, front of house, and the odd cellar hand
              who doesn't mind a cold morning. No CV needed — tell us what you've done.
            </p>
            <a href="mailto:jobs@marigoldarms.co.uk" style={{ display: 'inline-block', marginTop: 'var(--space-2)', fontSize: 14 }}>
              <span className="email-hover">jobs@marigoldarms.co.uk</span>
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            style={{ margin: '4px 0 0', fontSize: 12, color: '#a2453f', overflow: 'hidden' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const asideHeading = {
  fontSize: 13,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'var(--color-accent-700)',
  fontWeight: 400,
  fontFamily: 'var(--font-body)',
  paddingBottom: 'var(--space-2)',
  borderBottom: '1px solid var(--color-accent-300)',
  margin: 0,
};
