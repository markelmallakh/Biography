import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Parallax image — the picture drifts vertically inside a clipped frame as the
 * frame scrolls through the viewport. The inner image is over-sized so the
 * translation never exposes an edge.
 *
 * `className` sizes the frame. `hover` enables a hover zoom (use within a `group`).
 * `children` renders on top (e.g. a hover overlay).
 */
export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  strength = 50,
  hover = false,
  children,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])
  // Headroom scales with the drift, so a stronger parallax can't expose an edge.
  const overshoot = Math.round(strength * 1.4)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, top: -overshoot, height: `calc(100% + ${overshoot * 2}px)` }}
        className="absolute left-0 w-full"
      >
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${hover ? 'transition-transform duration-700 group-hover:scale-105' : ''} ${imgClassName}`}
        />
      </motion.div>
      {children}
    </div>
  )
}
