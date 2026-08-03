import { useId } from 'react'
import { motion } from 'framer-motion'

/**
 * Filter chips. The dark pill is a shared-layout element, so on selection it
 * slides from the old chip to the new one instead of blinking between them.
 * `useId` keeps the pill scoped to its own group when several chip rows are
 * on screen at once.
 */
export default function Chips({ items, value, onChange, className = '' }) {
  const groupId = useId()

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => {
        const selected = item === value
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-pressed={selected}
            className={`relative rounded-[4px] px-3 py-1.5 text-small-normal font-medium uppercase tracking-[0.04em] transition-colors duration-300 ${
              // No borders — unselected chips carry a white fill instead, which
              // reads on both the rose heroes and the off-white masterplan band.
              selected
                ? 'text-primary-white'
                : 'bg-primary-white text-text-secondary-dark hover:text-primary-black'
            }`}
          >
            {selected && (
              <motion.span
                layoutId={`${groupId}-pill`}
                aria-hidden
                className="absolute inset-0 rounded-[4px] bg-primary-black"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{item}</span>
          </button>
        )
      })}
    </div>
  )
}
