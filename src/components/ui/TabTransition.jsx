import { AnimatePresence, motion } from 'framer-motion'

/**
 * Shared transition for tabbed content, used by every tab group on the site.
 *
 * The outgoing panel sinks away while the incoming one drifts up through it,
 * slightly scaled and on a slower curve — two layers moving at different speeds
 * in opposite directions, which is what reads as parallax rather than a flat
 * swap. `popLayout` lets the two overlap instead of queueing.
 *
 * Key the panel with `id`; whenever it changes the transition runs.
 */
export default function TabTransition({ id, className = '', children }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0, y: 28, scale: 1.015 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -20, scale: 0.995, transition: { duration: 0.3, ease: 'easeIn' } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
