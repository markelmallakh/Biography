import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Annotated masterplan, per Figma 292:3809. Pins sit at percentage coordinates on
 * the plan so they stay glued to their facility at any width. A closed pin pulses
 * to draw the eye; opening it turns the + into an × and raises a small card with
 * the facility photo, name and a one-line description. One pin open at a time;
 * Escape or clicking anywhere else closes it.
 */
export default function Masterplan({ image, alt, pins = [] }) {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open === null) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    const onClick = (e) => {
      if (!e.target.closest('[data-masterplan-pin]')) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  return (
    <div className="relative w-full">
      <img src={image} alt={alt} className="w-full" />
      {pins.map((pin, i) => (
        <Pin key={pin.title} pin={pin} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  )
}

function Pin({ pin, open, onToggle }) {
  // Card placement flips away from whichever edge the pin is close to.
  const below = pin.y < 35
  const align = pin.x < 15 ? 'left' : pin.x > 85 ? 'right' : 'center'

  return (
    <div
      data-masterplan-pin
      // Zero-size anchor: the in-flow button would otherwise give this box its
      // 28px size, and the card's bottom-7 would resolve 28px low — exactly over
      // the pin.
      className={`absolute h-0 w-0 ${open ? 'z-30' : 'z-10'}`}
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
    >
      {/*
       * The button itself is the hit target — a constant 48px circle, of which
       * only the inner 28px disc is drawn. The pulse ring must stay
       * pointer-events-none: it is animated with scale(), so if it took the
       * clicks the target would grow and shrink with the animation and a press
       * could miss between beats.
       */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={pin.title}
        className="group relative grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      >
        {!open && (
          <span
            aria-hidden
            className="pointer-events-none absolute h-[38px] w-[38px] animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-white/50"
          />
        )}
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-primary-black/75 text-white shadow-[0_0_0_3px_rgba(255,255,255,0.65)] transition-transform duration-300 group-hover:scale-110">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          >
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={pin.title}
            style={{ x: align === 'center' ? '-50%' : 0 }}
            initial={{ opacity: 0, y: below ? -10 : 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: below ? -6 : 6, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute w-[236px] rounded-[12px] bg-primary-white p-2 shadow-[0_18px_44px_rgba(51,49,50,0.28)] ${
              // Clears the 48px hit circle's 24px half-height plus a little air.
              below ? 'top-8' : 'bottom-8'
            } ${align === 'center' ? 'left-1/2' : align === 'left' ? '-left-3' : '-right-3'}`}
          >
            <img src={pin.image} alt="" className="aspect-[220/120] w-full rounded-[8px] object-cover" />
            <div className="flex flex-col gap-1 p-2">
              <p className="text-regular-semibold font-bold text-primary-black">{pin.title}</p>
              <p className="text-tiny-light font-light leading-[1.5] text-text-secondary-dark">{pin.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
