import { motion } from 'framer-motion';

import PageIntro from '../components/PageIntro.jsx';
import Plate from '../components/Plate.jsx';
import Reveal from '../components/Reveal.jsx';
import { casks, cocktails, wines } from '../data/drinks.js';
import { img } from '../data/images.js';

const sectionHeading = {
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

function Row({ children, index }) {
  return (
    <motion.tr
      initial={{ x: -12 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.tr>
  );
}

export default function Drinks() {
  return (
    <main>
      <section style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*1.8) var(--space-8)' }}>
          <PageIntro
            tone="dark"
            kicker="Six casks, forty bottles, one negroni"
            title="The Cellar"
            blurb="Ale kept at twelve degrees and served by gravity where we can. The wine list leans to growers; ask Tom what has just been opened."
          />
        </div>
      </section>

      <div className="wrap drinks-grid" style={{ paddingBlock: 'calc(var(--space-8)*1.8) calc(var(--space-8)*2)' }}>
        <section>
          <Reveal>
            <h2 style={sectionHeading}>On cask</h2>
          </Reveal>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ marginTop: 'var(--space-2)' }}>
              <thead>
                <tr>
                  <th>Beer</th>
                  <th>Brewer</th>
                  <th style={{ textAlign: 'right' }}>Pint</th>
                </tr>
              </thead>
              <tbody>
                {casks.map((c, i) => (
                  <Row key={c.name} index={i}>
                    <td>{c.name}</td>
                    <td className="text-muted">{c.by}</td>
                    <td style={{ textAlign: 'right' }}>{c.price}</td>
                  </Row>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal>
            <h2 style={{ ...sectionHeading, marginTop: 'calc(var(--space-8)*1.4)' }}>Cocktails</h2>
          </Reveal>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ marginTop: 'var(--space-2)' }}>
              <tbody>
                {cocktails.map((c, i) => (
                  <Row key={c.name} index={i}>
                    <td>
                      {c.name}
                      {c.note && <span className="text-muted"> — {c.note}</span>}
                    </td>
                    <td style={{ textAlign: 'right' }}>{c.price}</td>
                  </Row>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <Reveal>
            <h2 style={sectionHeading}>Wine by the glass</h2>
          </Reveal>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ marginTop: 'var(--space-2)' }}>
              <thead>
                <tr>
                  <th>Wine</th>
                  <th style={{ textAlign: 'right' }}>175ml</th>
                  <th style={{ textAlign: 'right' }}>Bottle</th>
                </tr>
              </thead>
              <tbody>
                {wines.map((w, i) => (
                  <Row key={w.name} index={i}>
                    <td>{w.name}</td>
                    <td style={{ textAlign: 'right' }}>{w.glass}</td>
                    <td style={{ textAlign: 'right' }}>{w.bottle}</td>
                  </Row>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal from="up" delay={0.1}>
            <Plate
              src={img.cellar}
              alt="The cellar, casks stillaged"
              style={{ height: 300, marginTop: 'calc(var(--space-8)*1.2)' }}
            />
          </Reveal>
        </section>
      </div>
    </main>
  );
}
