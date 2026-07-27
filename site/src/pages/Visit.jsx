import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import PageIntro from '../components/PageIntro.jsx';
import Plate from '../components/Plate.jsx';
import Reveal from '../components/Reveal.jsx';
import { img } from '../data/images.js';

const sittings = ['12.00', '18.30', '20.30'];

const emptyForm = { name: '', phone: '', date: '', guests: '2', sitting: '18.30', notes: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please tell us who the table is for.';
  if (!/^[\d\s+()-]{7,}$/.test(form.phone.trim())) errors.phone = 'A telephone number we can reach you on.';
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

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = (e) => {
    e.preventDefault();
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
                style={{
                  padding: 'var(--space-6)',
                  border: '1px solid var(--color-accent-300)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-accent-100)',
                }}
              >
                <motion.svg
                  width="42" height="42" viewBox="0 0 42 42" fill="none"
                  style={{ marginBottom: 'var(--space-3)' }}
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
                  Thank you, {form.name.split(' ')[0]}
                </h3>
                <p style={{ margin: '0 0 var(--space-4)', fontSize: 14.5, lineHeight: 1.8 }}>
                  A table for {form.guests} on{' '}
                  {new Date(`${form.date}T12:00:00`).toLocaleDateString('en-GB', {
                    weekday: 'long', day: 'numeric', month: 'long',
                  })}{' '}
                  at {form.sitting}. We will telephone {form.phone} to confirm.
                </p>
                <p style={{ margin: '0 0 var(--space-4)', fontSize: 12, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>
                  This is a prototype — nothing was sent.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => { setForm(emptyForm); setStatus('idle'); }}
                  style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12 }}
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
                <div className="form-grid">
                  <Field label="Name" error={errors.name}>
                    <input
                      className="input" type="text" placeholder="Your name" value={form.name}
                      onChange={set('name')} aria-invalid={!!errors.name} autoComplete="name"
                    />
                  </Field>
                  <Field label="Telephone" error={errors.phone}>
                    <input
                      className="input" type="tel" placeholder="07…" value={form.phone}
                      onChange={set('phone')} aria-invalid={!!errors.phone} autoComplete="tel"
                    />
                  </Field>
                  <Field label="Date" error={errors.date}>
                    <input
                      className="input" type="date" value={form.date}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={set('date')} aria-invalid={!!errors.date}
                    />
                  </Field>
                  <Field label="Guests" error={errors.guests}>
                    <input
                      className="input" type="number" min="1" max="12" value={form.guests}
                      onChange={set('guests')} aria-invalid={!!errors.guests}
                    />
                  </Field>
                </div>

                <div className="field" style={{ marginTop: 'var(--space-4)' }}>
                  <label>Sitting</label>
                  <div className="seg" style={{ marginTop: 4 }}>
                    {sittings.map((s) => (
                      <label className="seg-opt" key={s}>
                        <input
                          type="radio" name="sitting" value={s}
                          checked={form.sitting === s}
                          onChange={set('sitting')}
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
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
                <p
                  style={{
                    fontSize: 12, textAlign: 'center', marginTop: 'var(--space-3)',
                    color: 'color-mix(in srgb, var(--color-text) 50%, transparent)',
                  }}
                >
                  A prototype — nothing is sent.
                </p>
              </motion.form>
            )}
        </Reveal>

        <Reveal as="section" from="left" delay={0.12} fade={false} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Plate src={img.visitMap} alt="Elder Street, Kensington" style={{ height: 300 }} />

          <div>
            <h3 style={asideHeading}>Finding us</h3>
            <p style={{ margin: 'var(--space-4) 0 0', fontSize: 15, lineHeight: 1.9 }}>
              14 Elder Street<br />
              Kensington, London W8 4QT<br />
              <a href="tel:+442079460014">020 7946 0014</a><br />
              <a href="mailto:table@marigoldarms.co.uk">table@marigoldarms.co.uk</a>
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
