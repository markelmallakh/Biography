import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Cursor from './ui/Cursor.jsx'
import { partners } from '../data/partners.js'

function LogoPlate({ partner, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(partner)}
      aria-label={`Read about our partnership with ${partner.name}`}
      className="flex h-[84px] w-[200px] shrink-0 items-center justify-center px-4 transition-transform duration-300 hover:scale-105"
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-full max-w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </button>
  )
}

// The track holds two copies of the set so the loop is seamless; it pauses on hover
// so the logos underneath stay clickable.
function Row({ items, direction, onOpen }) {
  return (
    <div className="marquee-mask group w-full overflow-hidden">
      <div
        className={`flex w-max gap-10 group-hover:[animation-play-state:paused] ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-10" aria-hidden={dup === 1}>
            {items.map((partner) => (
              <LogoPlate key={partner.name} partner={partner} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PartnersSection() {
  const [active, setActive] = useState(null)
  const row2 = [...partners].reverse()

  return (
    <section className="flex flex-col items-center gap-[60px] bg-primary-white py-[100px]">
      <Reveal className="w-full px-4 lg:px-[60px]">
        <h2 className="text-center text-m-h2 font-bold text-primary-black lg:text-h3">
          <Cursor />Strategic Consultants
        </h2>
      </Reveal>
      <Reveal className="flex w-full flex-col gap-8" delay={0.1}>
        <Row items={partners} direction="left" onOpen={setActive} />
        <Row items={row2} direction="right" onOpen={setActive} />
      </Reveal>

      <PartnerDialog partner={active} onClose={() => setActive(null)} />
    </section>
  )
}

function PartnerDialog({ partner, onClose }) {
  useEffect(() => {
    if (!partner) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    // Freeze the Lenis-driven page scroll while the dialog is up.
    document.documentElement.classList.add('lenis-stopped')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('lenis-stopped')
    }
  }, [partner, onClose])

  return (
    <AnimatePresence>
      {partner && (
        <div data-lenis-prevent className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-16">
          <motion.div
            className="absolute inset-0 bg-primary-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[672px]"
          >
            {/* Straddles the panel's top edge, inset 12px from its right edge */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-[21px] right-3 z-10 grid h-[42px] w-[42px] place-items-center bg-primary-black text-white transition-colors duration-300 hover:bg-primary-rose hover:text-primary-black"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <div
              data-lenis-prevent
              className="max-h-[76vh] overflow-y-auto bg-primary-white p-6 sm:p-8 lg:p-10"
            >
              <img src={partner.logo} alt={partner.name} className="h-[44px] w-auto object-contain sm:h-[52px]" />
              <h3 id="partner-dialog-title" className="mt-6 text-m-h4 font-bold leading-[1.25] text-primary-black sm:text-h4">
                {partner.title}
              </h3>
              <div className="mt-4 flex flex-col gap-4 text-regular-light font-light leading-[1.5] text-text-secondary-dark">
                {partner.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
