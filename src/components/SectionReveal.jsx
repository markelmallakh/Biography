import { motion } from 'framer-motion'

/**
 * Wraps a section in a soft fade-in as it scrolls into view — a minimal, elegant
 * section entrance. Opacity only (no transform/filter) so it never breaks the
 * Portfolio's position:sticky stacking or the Get In Touch mix-blend.
 */
export default function SectionReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
