import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/**
 * Counts 0 → target the first time it scrolls into view, keeping any prefix or
 * suffix on the value ("+20", "15K+", "100%", "2.8 KM"). Decimals are animated at
 * their own precision; anything with no number in it renders untouched.
 */
const PATTERN = /^(\D*)(\d+(?:\.\d+)?)(.*)$/s

export default function Counter({ value, className = '', duration = 1.6 }) {
  const text = String(value)
  const match = text.match(PATTERN)
  const prefix = match ? match[1] : ''
  const suffix = match ? match[3] : ''
  const target = match ? parseFloat(match[2]) : 0
  const decimals = match ? (match[2].split('.')[1]?.length ?? 0) : 0

  // `match` is a fresh array on every render, so it must never be a dependency —
  // as a dep it restarted the count on each re-render (the glass panels resize
  // often) and the number never arrived. Depend on the primitive instead.
  const countable = Boolean(match)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(() => (0).toFixed(decimals))

  useEffect(() => {
    if (!inView || !countable) return undefined
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
      // Land exactly on the target rather than wherever the last frame fell.
      onComplete: () => setDisplay(target.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, target, duration, decimals, countable])

  // No number to count — show the value as written.
  if (!match) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </p>
  )
}
