import { motion } from 'framer-motion';

/* Position only. The route container owns the fade — see App.jsx. */
const child = {
  hidden: { y: 18 },
  shown: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function PageIntro({ kicker, title, blurb, tone = 'light' }) {
  const onDark = tone === 'dark';

  return (
    <motion.div
      initial="hidden"
      animate="shown"
      variants={{ shown: { transition: { staggerChildren: 0.12 } } }}
      style={{
        textAlign: 'center',
        paddingBottom: 'var(--space-8)',
        borderBottom: onDark ? 'none' : '1px solid var(--color-divider)',
      }}
    >
      <motion.p
        variants={child}
        style={{
          margin: '0 0 var(--space-3)', fontSize: 11, letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: onDark ? 'var(--color-accent-300)' : 'var(--color-accent-700)',
        }}
      >
        {kicker}
      </motion.p>
      <motion.h1
        variants={child}
        style={{ fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 400, margin: 0 }}
      >
        {title}
      </motion.h1>
      {blurb && (
        <motion.p
          variants={child}
          style={{
            margin: 'var(--space-4) auto 0', maxWidth: '56ch', fontSize: 15, lineHeight: 1.8,
            color: onDark
              ? 'color-mix(in srgb, var(--paper) 78%, transparent)'
              : 'color-mix(in srgb, var(--color-text) 68%, transparent)',
          }}
        >
          {blurb}
        </motion.p>
      )}
    </motion.div>
  );
}
