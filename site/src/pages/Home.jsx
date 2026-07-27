import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import HeroSlider from '../components/HeroSlider.jsx';
import Plate from '../components/Plate.jsx';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { heroSlides, img } from '../data/images.js';
import { signatures } from '../data/menus.js';

const heroChild = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const features = [
  {
    numeral: 'I.',
    title: 'The kitchen',
    body: 'Ten plates a day, market-led and mostly British. Dorset crab, Tamworth pork, gooseberries from Kent while they last.',
    cta: { to: '/menus', label: 'Read the menu' },
    key: 'featKitchen',
  },
  {
    numeral: 'II.',
    title: 'The cellar',
    body: 'Six cask lines kept properly, forty wines by the bottle and eleven by the glass, and a negroni that has not changed since 1998.',
    cta: { to: '/drinks', label: 'See the list' },
    key: 'featBar',
  },
  {
    numeral: 'III.',
    title: 'The flowers',
    body: 'Replanted each season, lit from October, and photographed rather a lot. Come at dusk in December for the full effect.',
    cta: { to: '/gallery', label: 'Open the gallery' },
    key: 'featFlowers',
  },
];

export default function Home() {
  return (
    <main>
      <HeroSlider slides={heroSlides}>
        <motion.div
          initial="hidden"
          animate="shown"
          variants={{ shown: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
          style={{ textAlign: 'center', maxWidth: 860, color: 'var(--paper)' }}
        >
          <motion.p
            variants={heroChild}
            style={{
              fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase',
              color: 'var(--color-accent-300)', margin: '0 0 var(--space-4)',
            }}
          >
            A Kensington public house
          </motion.p>
          <motion.h1
            variants={heroChild}
            style={{
              fontSize: 'clamp(42px, 7vw, 96px)', fontWeight: 400,
              lineHeight: 1.02, margin: 0, letterSpacing: '-0.02em',
            }}
          >
            Two thousand blooms,<br />one very good kitchen
          </motion.h1>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
            style={{
              width: 88, height: 1, background: 'var(--color-accent-400)',
              margin: 'var(--space-6) auto',
            }}
          />
          <motion.p
            variants={heroChild}
            style={{
              fontSize: 17, lineHeight: 1.7, margin: '0 auto var(--space-6)',
              maxWidth: '52ch', color: 'color-mix(in srgb, var(--paper) 86%, transparent)',
            }}
          >
            Since 1848 we have poured cask ale under a hanging garden. Today the back room serves
            a short, seasonal British menu that Londoners book two weeks ahead.
          </motion.p>
          <motion.div
            variants={heroChild}
            style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', pointerEvents: 'auto' }}
          >
            <Link
              to="/menus"
              className="btn btn-primary"
              style={{
                color: 'var(--ink)', background: 'var(--color-accent-300)',
                borderColor: 'var(--color-accent-300)',
                letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12, padding: '12px 24px',
              }}
            >
              See the menus
            </Link>
            <Link
              to="/visit"
              className="btn btn-secondary"
              style={{
                color: 'var(--paper)', borderColor: 'color-mix(in srgb, var(--paper) 62%, transparent)',
                background: 'color-mix(in srgb, var(--ink) 30%, transparent)',
                letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12, padding: '12px 24px',
              }}
            >
              Reserve
            </Link>
          </motion.div>
        </motion.div>
      </HeroSlider>

      {/* Accolades ticker. */}
      <section style={{ borderBottom: '1px solid var(--color-divider)', background: 'var(--color-surface)', overflow: 'hidden' }}>
        <RevealGroup
          className="accolades"
          stagger={0.14}
          style={{
            maxWidth: 1180, margin: '0 auto',
            padding: 'var(--space-4) var(--space-6)',
            display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)',
            justifyContent: 'center', alignItems: 'center',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--color-text) 58%, transparent)',
            textAlign: 'center',
          }}
        >
          <RevealItem as="span">Good Pub Guide — London Pub of the Year 2024</RevealItem>
          <RevealItem as="span" className="hidden sm:block" style={{ width: 1, height: 14, background: 'var(--color-divider)' }} />
          <RevealItem as="span">Cask Marque accredited</RevealItem>
          <RevealItem as="span" className="hidden sm:block" style={{ width: 1, height: 14, background: 'var(--color-divider)' }} />
          <RevealItem as="span">Chelsea Flower Show, gold 2019 &amp; 2023</RevealItem>
        </RevealGroup>
      </section>

      {/* Our story. */}
      <section className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*2.2)' }}>
        <div className="story-grid">
          <Reveal from="right">
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 38px)', fontWeight: 400, lineHeight: 1.1, margin: 0 }}>
              The pub at the corner of Elder Street
            </h2>
            <p
              style={{
                marginTop: 'var(--space-4)', fontSize: 13, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--color-accent-700)',
              }}
            >
              Our story
            </p>
          </Reveal>
          <div className="story-rule" />
          <Reveal from="left" delay={0.1} className="story-copy">
            <p style={{ marginTop: 0 }}>
              <span
                style={{
                  float: 'left', fontFamily: 'var(--font-heading)', fontSize: 56,
                  lineHeight: 0.82, padding: '4px 8px 0 0', color: 'var(--color-accent-700)',
                }}
              >
                W
              </span>
              e have been a licensed house for one hundred and seventy-eight years, and a flower shop by
              accident for forty of them. What began as one landlord's window box now runs the length of
              the building — some two thousand blooms, replanted four times a year by the same family in
              Wandsworth.
            </p>
            <p>
              Inside, little has moved. The mahogany horseshoe bar is original, the chamber pots on the
              ceiling arrived in 1984 and have not been counted since. What has changed is the food. In
              2016 we handed the back kitchen to Rosalind Vane, who cooks a short menu from the day's
              market: nine or ten plates, written out each morning, gone by ten at night.
            </p>
            <p style={{ marginBottom: 0 }}>
              We keep six cask lines, a small list of grower Champagne, and a fire in the snug from
              October. No televisions. No reservations at the bar — only in the dining room, where we
              would very much like to see you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* This week — dark band. */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*2)' }}>
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                gap: 'var(--space-6)', flexWrap: 'wrap',
                borderBottom: '1px solid color-mix(in srgb, var(--paper) 22%, transparent)',
                paddingBottom: 'var(--space-4)',
              }}
            >
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 34px)', fontWeight: 400, margin: 0 }}>
                This week at the Marigold
              </h2>
              <p
                style={{
                  margin: 0, fontSize: 11, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--color-accent-300)',
                }}
              >
                Written 27 July
              </p>
            </div>
          </Reveal>

          <RevealGroup className="feature-grid" stagger={0.16} style={{ marginTop: 'var(--space-8)' }}>
            {features.map((f) => (
              <RevealItem
                as="article"
                key={f.title}
                className="feature-cell"
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
              >
                <Plate src={img[f.key]} alt={f.title} style={{ height: 280 }} />
                <p
                  style={{
                    margin: 0, fontFamily: 'var(--font-heading)', fontSize: 15,
                    letterSpacing: '0.16em', color: 'var(--color-accent-300)',
                  }}
                >
                  {f.numeral}
                </p>
                <h3 style={{ fontSize: 27, fontWeight: 400, margin: 0 }}>{f.title}</h3>
                <p
                  style={{
                    margin: 0, fontSize: 14, lineHeight: 1.75, flex: 1,
                    color: 'color-mix(in srgb, var(--paper) 76%, transparent)',
                  }}
                >
                  {f.body}
                </p>
                <Link
                  to={f.cta.to}
                  className="btn btn-ghost"
                  style={{
                    alignSelf: 'flex-start', color: 'var(--color-accent-300)', paddingLeft: 0,
                    letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11,
                  }}
                >
                  {f.cta.label} <span className="arrow">→</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Signature dishes. */}
      <section className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*2.2)' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <p
            style={{
              margin: '0 0 var(--space-2)', fontSize: 11, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--color-accent-700)',
            }}
          >
            From tonight's card
          </p>
          <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 40px)', fontWeight: 400, margin: '0 0 var(--space-4)' }}>
            Three things worth crossing town for
          </h2>
          <div className="rule-flourish" aria-hidden>✦</div>
        </Reveal>

        <RevealGroup className="sig-grid" stagger={0.14}>
          {signatures.map((s) => (
            <RevealItem as="figure" key={s.name}>
              <Plate src={img[s.key]} alt={s.name} style={{ height: 330 }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <h3 style={{ margin: 0, fontSize: 23, fontWeight: 400 }}>{s.name}</h3>
                <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 19 }}>{s.price}</span>
              </div>
              <figcaption
                style={{
                  fontSize: 13.5, lineHeight: 1.7, marginTop: 6,
                  color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
                }}
              >
                {s.desc}
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
          <Link
            to="/menus"
            className="btn btn-primary"
            style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 12, padding: '12px 26px' }}
          >
            The full menu
          </Link>
        </Reveal>
      </section>

      {/* Dining room. */}
      <section style={{ borderTop: '1px solid var(--color-divider)', background: 'var(--color-surface)' }}>
        <div className="wrap dining-grid" style={{ paddingBlock: 'calc(var(--space-8)*1.8)' }}>
          <Reveal from="right">
            <p
              style={{
                margin: '0 0 var(--space-3)', fontSize: 11, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--color-accent-700)',
              }}
            >
              The dining room
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 36px)', fontWeight: 400, margin: '0 0 var(--space-4)' }}>
              Twenty-six covers, two sittings, one long table
            </h2>
            <p
              style={{
                fontSize: 15, lineHeight: 1.8, margin: '0 0 var(--space-6)',
                color: 'color-mix(in srgb, var(--color-text) 78%, transparent)',
              }}
            >
              Upstairs holds twenty-six. We seat at six-thirty and again at half past eight, and hold the
              long oak table for parties of eight or more. Sunday is one sitting from noon until the beef
              runs out, which is usually four.
            </p>
            <RevealGroup style={{ display: 'grid', gap: 'var(--space-3)', fontSize: 14 }} stagger={0.09}>
              {[
                ['Mon – Thu', 'Noon – 11pm · kitchen till 9.30'],
                ['Fri – Sat', 'Noon – midnight · kitchen till 10'],
                ['Sunday', 'Noon – 10.30pm · roast till 4'],
              ].map(([days, hours], i) => (
                <RevealItem
                  key={days}
                  from="left"
                  style={{
                    display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap',
                    paddingBottom: i < 2 ? 'var(--space-3)' : 0,
                    borderBottom: i < 2 ? '1px solid var(--color-divider)' : 'none',
                  }}
                >
                  <span style={{ width: 120, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)' }}>{days}</span>
                  <span>{hours}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Link
              to="/visit"
              className="btn btn-primary"
              style={{
                marginTop: 'var(--space-6)', letterSpacing: '0.1em',
                textTransform: 'uppercase', fontSize: 12, padding: '12px 26px',
              }}
            >
              Reserve a table
            </Link>
          </Reveal>
          <Reveal from="left" delay={0.12}>
            <Plate src={img.dining} alt="The upstairs dining room" style={{ height: 520 }} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
