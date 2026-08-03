import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Editorial statement text that writes itself in on entry — the words warm from a
 * muted tone to full contrast one after another, and re-run every time the section
 * comes back into view.
 *
 * Framer animates raw colour values rather than classes, so the two palette steps
 * each tone travels between are mirrored from the Figma tokens here.
 */
const TONES = {
  onLight: { from: '#ADADAD', to: '#333132' }, // Gray 4 → Text/Primary Dark
  onDark: { from: '#5C5A5B', to: '#EBEAEA' }, // Gray Dark 8 → Text/Secondary Light
}

const EASE = [0.22, 1, 0.36, 1]

export default function HighlightText({ text, className = '', tone = 'onLight' }) {
  const ref = useRef(null)
  // No `once` — leaving and re-entering the section replays the write-on.
  const inView = useInView(ref, { amount: 0.35 })
  const { from, to } = TONES[tone] ?? TONES.onLight

  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        show: { transition: { staggerChildren: 0.035 } },
        hidden: { transition: { staggerChildren: 0.008, staggerDirection: -1 } },
      }}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { color: from, transition: { duration: 0.25, ease: 'linear' } },
            show: { color: to, transition: { duration: 0.45, ease: EASE } },
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.p>
  )
}
