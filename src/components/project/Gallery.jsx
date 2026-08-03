import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from 'framer-motion'

/**
 * Project gallery — a staggered three-column grid whose lead image starts spanning
 * the full width and shrinks into its slot as you scroll in, reversing on the way
 * back up.
 *
 * The lead image is absolutely positioned over the grid and interpolates between
 * the container box and its real slot, so it never affects layout and never
 * covers the sections above or below. Its slot is re-measured every frame, which
 * keeps it locked on through resizes and the columns' own parallax drift.
 */
const lerp = (a, b, t) => a + (b - a) * t

// Column shapes, tuned to read as an unforced arrangement rather than a table.
// The arrangement is identical at every breakpoint — small screens just scale it
// down — so the lead image's shrink lands the same way on any device.
const COLUMNS = [
  { offset: 'mt-[14%]', drift: -26, aspects: ['4/5', '3/4'] },
  { offset: '', drift: 14, aspects: ['1/1', '4/5'] }, // lead image sits above these
  { offset: 'mt-[6%]', drift: -14, aspects: ['3/4', '4/5'] },
]

export default function Gallery({ images }) {
  const [lead, ...rest] = images
  const gridRef = useRef(null)
  const slotRef = useRef(null)

  // The lead holds full width until it is roughly half on screen, then shrinks and
  // settles while the band is still mid-viewport — the heading stays in frame and
  // the full grid reads at once, instead of resolving only after it scrolls past.
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start 65%', 'start 32%'] })
  const [ready, setReady] = useState(false)

  const left = useMotionValue(0)
  const top = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)

  // The rest of the grid surfaces as the lead image releases the width.
  const restOpacity = useTransform(scrollYProgress, [0.1, 0.75], [0, 1])

  useAnimationFrame(() => {
    const grid = gridRef.current
    const slot = slotRef.current
    if (!grid || !slot) return

    const g = grid.getBoundingClientRect()
    const s = slot.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, scrollYProgress.get()))

    // Start: full container width, a tall band. End: the slot, exactly.
    const startH = Math.min(window.innerHeight * 0.74, g.width * 0.62)
    left.set(lerp(0, s.left - g.left, p))
    top.set(lerp(0, s.top - g.top, p))
    width.set(lerp(g.width, s.width, p))
    height.set(lerp(startH, s.height, p))
    if (!ready) setReady(true)
  })

  // Split the remaining images across the three columns, round-robin.
  const columnImages = [[], [], []]
  rest.forEach((src, i) => columnImages[i % 3].push(src))

  return (
    <div ref={gridRef} className="relative">
      <div className="grid grid-cols-3 gap-1.5 lg:gap-2">
        {COLUMNS.map((col, c) => (
          <Column
            key={c}
            config={col}
            images={columnImages[c]}
            slotRef={c === 1 ? slotRef : null}
            restOpacity={restOpacity}
          />
        ))}
      </div>

      {/* Lead image — overlaid, never in flow */}
      <motion.div
        style={{ left, top, width, height, opacity: ready ? 1 : 0 }}
        className="pointer-events-none absolute top-0 overflow-hidden"
      >
        <img src={lead} alt="" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  )
}

function Column({ config, images, slotRef, restOpacity }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-config.drift, config.drift])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`flex flex-col gap-1.5 lg:gap-2 ${config.offset}`}
    >
      {/* Column two reserves the lead image's slot at the top */}
      {slotRef && <div ref={slotRef} className="aspect-[4/3] w-full" />}

      {images.map((src, i) => (
        <motion.div
          key={src + i}
          style={{ opacity: restOpacity, aspectRatio: config.aspects[i % config.aspects.length] }}
          className="w-full overflow-hidden"
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </motion.div>
  )
}
