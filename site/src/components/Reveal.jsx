import { motion } from 'framer-motion';

const offsets = {
  up: { y: 26, x: 0 },
  down: { y: -26, x: 0 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  as = 'div',
  from = 'up',
  delay = 0,
  duration = 0.75,
  amount = 0.18,
  className,
  style,
  fade = true,
}) {
  const M = motion[as] ?? motion.div;
  const offset = offsets[from] ?? offsets.up;

  return (
    <M
      className={className}
      style={style}
      initial={{ ...(fade ? { opacity: 0 } : null), ...offset }}
      whileInView={{ ...(fade ? { opacity: 1 } : null), x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* Staggers its children in sequence. Pair with <RevealItem>. */
export function RevealGroup({ children, className, style, stagger = 0.12, delay = 0, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

/* `fade={false}` animates position only — use it above the fold, where the
   route container's own fade would otherwise hide the content twice over. */
export function RevealItem({ children, as = 'div', className, style, from = 'up', fade = true }) {
  const M = motion[as] ?? motion.div;
  const offset = offsets[from] ?? offsets.up;

  return (
    <M
      className={className}
      style={style}
      variants={{
        hidden: { ...(fade ? { opacity: 0 } : null), ...offset },
        shown: {
          ...(fade ? { opacity: 1 } : null),
          x: 0,
          y: 0,
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </M>
  );
}
