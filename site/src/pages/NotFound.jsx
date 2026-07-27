import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*3)', textAlign: 'center' }}>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--color-accent-700)', margin: '0 0 var(--space-3)',
        }}
      >
        Four hundred and four
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 400, margin: 0 }}
      >
        Nothing on that table
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.24 }}
        style={{
          margin: 'var(--space-4) auto var(--space-6)', maxWidth: '46ch',
          fontSize: 15, lineHeight: 1.8,
          color: 'color-mix(in srgb, var(--color-text) 68%, transparent)',
        }}
      >
        The page you asked for has been cleared away. The bar, happily, is still open.
      </motion.p>
      <Link
        to="/"
        className="btn btn-primary"
        style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 12, padding: '12px 26px' }}
      >
        Back to the pub
      </Link>
    </main>
  );
}
