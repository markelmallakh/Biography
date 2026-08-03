import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Cta from './ui/Cta.jsx'
import { faqs } from '../data/faqs.js'

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faqs" className="flex flex-col lg:h-screen lg:flex-row">
      {/* Left media */}
      <div className="h-[420px] w-full overflow-hidden lg:h-auto lg:w-[632px] lg:shrink-0">
        <img src="/assets/home-hero.png" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Right accordion panel */}
      <div className="flex flex-1 flex-col justify-center gap-[60px] bg-primary-black p-[60px]">
        <Reveal className="flex flex-col gap-2">
          <h2 className="text-h3 font-bold leading-[1.2] text-primary-white">Frequently Asked Questions</h2>
          <p className="text-regular-light font-light text-text-secondary-light">
            Find answers to common questions about Biography
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-6" delay={0.1}>
          {faqs.slice(0, 5).map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="flex flex-col gap-4 border-b border-white/15 pb-6 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg-light font-light text-primary-white">{item.q}</span>
                  <span
                    className={`grid size-6 shrink-0 place-items-center transition-colors ${
                      isOpen ? 'bg-primary-rose' : 'border border-primary-rose'
                    }`}
                  >
                    {isOpen ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="#333132" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="#D1BCC7" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden text-regular-light font-light text-text-secondary-light"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>

        <Reveal delay={0.15}>
          <Cta label="Explore All FAQs" href="/faqs" variant="outlineWhite" />
        </Reveal>
      </div>
    </section>
  )
}
