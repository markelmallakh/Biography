import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * FAQ accordion. `tone="light"` is the standalone FAQs page (white rows, hairline
 * dividers); `tone="dark"` is the panel on the home page.
 */
const TONES = {
  light: {
    row: 'border-b border-gray-2 last:border-b-0',
    question: 'text-regular-normal font-medium text-primary-black',
    answer: 'text-regular-light font-light text-text-secondary-dark',
    openBox: 'bg-primary-rose text-primary-black',
    closedBox: 'border border-gray-3 text-text-secondary-dark',
  },
  dark: {
    row: 'border-b border-white/15 last:border-b-0',
    question: 'text-lg-light font-light text-primary-white',
    answer: 'text-regular-light font-light text-text-secondary-light',
    openBox: 'bg-primary-rose text-primary-black',
    closedBox: 'border border-primary-rose text-primary-rose',
  },
}

export default function Accordion({ items, tone = 'light', defaultOpen = 0, className = '' }) {
  const [open, setOpen] = useState(defaultOpen)
  const t = TONES[tone]

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`flex flex-col ${t.row}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className={t.question}>{item.q}</span>
              <span className={`grid size-6 shrink-0 place-items-center transition-colors duration-300 ${isOpen ? t.openBox : t.closedBox}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  {isOpen ? (
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  ) : (
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  )}
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`pb-6 pr-10 ${t.answer}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
