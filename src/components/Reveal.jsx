import { motion } from 'framer-motion'

/**
 * Scroll-reveal wrapper — fades + rises its children into view once.
 * Used across sections for the smooth, neat scroll feel.
 */
export default function Reveal({ children, className = '', delay = 0, y = 32, as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
