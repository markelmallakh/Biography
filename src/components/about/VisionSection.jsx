import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Cursor from '../ui/Cursor.jsx'
import HighlightText from '../ui/HighlightText.jsx'
import { vision } from '../../data/about.js'

const EASE = [0.22, 1, 0.36, 1]
const TILT = [-7, 4, -3] // resting tilt of the stacked state

// Breakpoint geometry. The row is always `activeH` tall so the section never
// changes height — only the frames inside it resize.
const SIZES = [
  { min: 1024, stackW: 340, stackH: 250, overlap: -56, gap: 12, activeH: 380 },
  { min: 640, stackW: 270, stackH: 200, overlap: -44, gap: 8, activeH: 280 },
  { min: 0, stackW: 190, stackH: 140, overlap: -32, gap: 6, activeH: 170 },
]

/**
 * Two-state section. At rest it is a dark panel with the three frames stacked and
 * tilted. Once it is properly in view the panel turns off-white, the frames
 * straighten and spread into an even row, and the statement writes itself in.
 * Scrolling away puts it all back, so the change reads every time.
 *
 * Width and height are animated as explicit numbers rather than swapped classes,
 * so the frames grow smoothly instead of snapping between two layouts.
 */
export default function VisionSection() {
  const ref = useRef(null)
  const rowRef = useRef(null)
  const active = useInView(ref, { amount: 0.4 })
  const [cfg, setCfg] = useState(SIZES[0])
  const [rowW, setRowW] = useState(0)

  useEffect(() => {
    const measure = () => {
      setCfg(SIZES.find((s) => window.innerWidth >= s.min))
      setRowW(rowRef.current?.clientWidth || 0)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const activeW = rowW ? (rowW - cfg.gap * 2) / 3 : cfg.stackW
  // Hold the stacked state for a beat so the change is something you watch happen.
  const shift = { duration: 0.9, ease: EASE, delay: active ? 0.45 : 0 }

  return (
    <motion.section
      ref={ref}
      className="px-4 py-24 lg:px-[60px]"
      animate={{ backgroundColor: active ? '#EFECEA' : '#333132' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="mx-auto flex w-full max-w-[1392px] flex-col gap-16">
        <div className="flex flex-col gap-4">
          <motion.p
            className="text-small-normal font-medium"
            animate={{ color: active ? '#A78A99' : '#858384' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Cursor />{vision.tagline}
          </motion.p>
          <HighlightText
            text={vision.text}
            className="max-w-[1000px] text-m-h2 font-light leading-[1.25] lg:text-h3"
          />
        </div>

        <div
          ref={rowRef}
          className="flex w-full items-center justify-center"
          style={{ height: cfg.activeH }}
        >
          {vision.images.map((src, i) => (
            <motion.div
              key={src}
              className="shrink-0"
              style={{ zIndex: i === 1 ? 20 : 10 }}
              animate={{
                width: active ? activeW : cfg.stackW,
                height: active ? cfg.activeH : cfg.stackH,
                marginLeft: i === 0 ? 0 : active ? cfg.gap : cfg.overlap,
                rotate: active ? 0 : TILT[i],
              }}
              transition={shift}
            >
              <div className="h-full w-full overflow-hidden">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
