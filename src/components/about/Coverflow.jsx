import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Figma "about carousel" (388:2145), reproduced with its exact construction:
 * a FLAT strip of photos slides horizontally while a fixed overlay — the Figma
 * "Subtract" layer — sits on top. The overlay is a solid fill with an arched
 * window cut out (top edge dips toward the centre, bottom edge rises to meet it)
 * plus the four column separators, so the photos read as an inward-curved band
 * while simply translating underneath.
 *
 * The strip advances one whole photo per step, exactly like the seven Figma
 * variants (left: -280 → -623 → -970 → …, one 345px pitch apart), so a pane never
 * rests showing half of one image and half of the next.
 *
 * Everything is authored on the original 1512×680 canvas and scaled to the host
 * width, so it stays pixel-proportional to Figma at any viewport. `fill` is the
 * page background the overlay must match — pass it when reusing on other pages.
 */

// Design-canvas geometry (Figma px)
const CANVAS_W = 1512
const CANVAS_H = 680
const CARD_W = 342
const CARD_H = 500
const CARD_GAP = 3
const STRIP_TOP = 104
const STRIP_START = -280 // resting offset of the Figma "Default" variant
const PITCH = CARD_W + CARD_GAP
const COPIES = 3 // enough that the window is always filled ahead of the wrap

const HOLD_MS = 2200 // rest between steps
const SLIDE = { duration: 0.9, ease: [0.65, 0, 0.35, 1] }

// The Figma Subtract layer, verbatim.
const SUBTRACT_PATH =
  'M1512 110.14C1495.56 112.037 1478.89 113.878 1462 115.654V564.345C1478.89 566.121 1495.56 567.961 1512 569.858V680H0V569.858C16.4401 567.961 33.1097 566.121 50 564.345V115.654C33.1097 113.878 16.4401 112.037 0 110.14V0H1512V110.14ZM66 562.687C169.641 552.115 281.341 543.852 399 538.278V141.721C281.341 136.147 169.641 127.884 66 117.312V562.687ZM1446 117.312C1342.36 127.884 1230.66 136.147 1113 141.721V538.278C1230.66 543.852 1342.36 552.115 1446 562.687V117.312ZM415 537.539C521.733 532.726 633.248 530.12 748 530.004V149.995C633.248 149.879 521.733 147.273 415 142.46V537.539ZM1097 142.46C990.267 147.273 878.752 149.879 764 149.995V530.004C878.752 530.12 990.267 532.726 1097 537.539V142.46Z'

/**
 * `images` accepts either plain srcs or `{ src, logo, name }` — the latter draws
 * the project's wordmark knocked out in white over a dark scrim, per Figma 621:16750.
 */
export default function Coverflow({ images, fill = '#D1BCC7', className = '' }) {
  const cards = images.map((item) => (typeof item === 'string' ? { src: item } : item))
  const hostRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [step, setStep] = useState(0)
  const [snap, setSnap] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const measure = () => setScale((hostRef.current?.clientWidth || CANVAS_W) / CANVAS_W)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setSnap(false)
      setStep((s) => s + 1)
    }, HOLD_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  // A full set of steps lands on an identical frame in the next copy, so we can
  // drop back to the start with no transition and nobody sees the seam.
  const onStepEnd = () => {
    if (step >= cards.length) {
      setSnap(true)
      setStep(0)
    }
  }

  return (
    <div
      ref={hostRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
    >
      {/* Design canvas, scaled to the host width */}
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* Sliding photo strip (flat, like the Figma layers) */}
        <motion.div
          className="absolute flex will-change-transform"
          style={{ top: STRIP_TOP, left: 0, gap: CARD_GAP }}
          animate={{ x: STRIP_START - step * PITCH }}
          transition={snap ? { duration: 0 } : SLIDE}
          onAnimationComplete={onStepEnd}
        >
          {Array.from({ length: COPIES }, (_, copy) => (
            <div key={copy} className="flex shrink-0" style={{ gap: CARD_GAP }} aria-hidden={copy > 0}>
              {cards.map((card, i) => {
                const Tag = card.href ? 'a' : 'div'
                return (
                  <Tag
                    key={i}
                    {...(card.href
                      ? {
                          href: card.href,
                          // Only the first copy is real; the rest are decorative
                          // duplicates and must stay out of the tab order.
                          tabIndex: copy === 0 ? undefined : -1,
                          'aria-label': card.name,
                        }
                      : {})}
                    className={`group relative shrink-0 overflow-hidden ${card.href ? 'block' : ''}`}
                    style={{ width: CARD_W, height: CARD_H }}
                  >
                    <img
                      src={card.src}
                      alt=""
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    {card.logo && (
                      <>
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-primary-black/45 transition-colors duration-500 group-hover:bg-primary-black/25"
                        />
                        <img
                          src={card.logo}
                          alt={card.href ? '' : (card.name ?? '')}
                          draggable={false}
                          className="logo-white absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 object-contain"
                        />
                      </>
                    )}
                  </Tag>
                )
              })}
            </div>
          ))}
        </motion.div>

        {/* Fixed arched cutout — the Figma Subtract layer */}
        <svg
          width={CANVAS_W}
          height={CANVAS_H}
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          fill="none"
          aria-hidden
          className="pointer-events-none absolute left-0 top-0"
        >
          <path d={SUBTRACT_PATH} fill={fill} />
        </svg>
      </div>
    </div>
  )
}
