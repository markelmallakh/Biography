import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import ParallaxImage from './ui/ParallaxImage.jsx'
import Cta from './ui/Cta.jsx'
import DotGrid from './ui/DotGrid.jsx'

const ctaImages = ['/assets/CTA-1.png', '/assets/CTA-2.png', '/assets/CTA-3.png']

/*
 * The stage carries the wordmark's font size; everything inside is sized in em.
 * Because the photo frame and the type share one unit, the frame's edges land on
 * the same letters — through the G and the h — at every viewport size.
 */
const stageType = 'text-[clamp(52px,12vw,150px)]'
const wordmark = 'whitespace-nowrap text-center text-[1em] font-light leading-none'
// Measured from the rendered wordmark: G runs 0.50-1.16em, c ends at 4.87em,
// so a centred 4.37em frame rests its edges on the G and the c exactly.
const FRAME_W = '4.37em'
const FRAME_H = '2.8em'

const lerp = (a, b, t) => a + (b - a) * t

// Fast looping slideshow of the three CTA images. It holds the first frame until
// `active` — the loop kicks in mid-scroll, while the photo is still shrinking.
function CtaImageLoop({ active }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    // Preload so the fast loop never flickers.
    ctaImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (!active) return undefined
    const id = setInterval(() => setI((p) => (p + 1) % ctaImages.length), 220)
    return () => clearInterval(id)
  }, [active])

  return <ParallaxImage src={ctaImages[i]} className="h-full w-full" strength={26} />
}

// "_Get In Touch" — black on the white page, photo-negative where it overlaps the
// looping image (mix-blend-difference of white text resolves to black over white).
// The photo opens at the section's full width and shrinks into its em-sized frame
// as the band scrolls in, reversing on the way back up.
export default function GetInTouchSection() {
  const stageRef = useRef(null)
  const sizerRef = useRef(null)
  const [looping, setLooping] = useState(false)

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start 90%', 'start 25%'] })
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const marginTop = useMotionValue(0)
  // The wordmark holds back while the photo is full-bleed, then rises in over it
  // as the shrink gets under way.
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.55], [0, 1])
  const textY = useTransform(scrollYProgress, [0.12, 0.55], ['0.22em', '0em'])
  const [ready, setReady] = useState(false)

  useAnimationFrame(() => {
    const sizer = sizerRef.current
    if (!sizer) return

    // Opens as a full-bleed viewport frame, settles into the em-sized box.
    const s = sizer.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, scrollYProgress.get()))
    width.set(lerp(document.documentElement.clientWidth, s.width, p))
    height.set(lerp(window.innerHeight, s.height, p))
    // Flush against the section above while full-bleed; the breathing room
    // arrives with the shrink.
    marginTop.set(lerp(0, 120, p))

    // The slideshow wakes while the frame is still travelling, not at rest.
    setLooping(p > 0.35)
    if (!ready) setReady(true)
  })

  return (
    <section id="contact" className="relative flex flex-col items-center overflow-hidden bg-primary-white px-4 pb-48 lg:px-16">
      {/* Interactive dot-grid background */}
      <DotGrid
        className="!absolute inset-0 z-0"
        dotSize={4}
        gap={26}
        baseColor="#E8DDE3"
        activeColor="#A78A99"
        proximity={130}
        shockRadius={220}
        shockStrength={4}
        returnDuration={1.4}
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* The stage tracks the frame height, so the page closes in around the
            photo as it shrinks. */}
        <motion.div
          ref={stageRef}
          className={`relative flex w-full items-center justify-center ${stageType}`}
          style={{ height, minHeight: FRAME_H, marginTop }}
        >
          {/* Invisible ruler for the frame's resting size, in the stage's em */}
          <div ref={sizerRef} aria-hidden className="pointer-events-none absolute opacity-0" style={{ width: FRAME_W, height: FRAME_H }} />

          {/* Base: primary-black wordmark, visible everywhere outside the image.
              The centring wrapper keeps its Tailwind translate; the motion span
              inside carries the reveal so the two never fight over transform. */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
            <motion.span className={`block text-primary-black ${wordmark}`} style={{ opacity: textOpacity, y: textY }}>
              _Get In Touch
            </motion.span>
          </div>

          {/* Looping image — box driven by scroll */}
          <motion.div
            className="relative z-10 shrink-0 overflow-hidden"
            style={{ width, height, opacity: ready ? 1 : 0 }}
          >
            <CtaImageLoop active={looping} />
          </motion.div>

          {/* Knockout negative — clipped to the same animated box so only the part
              of the wordmark over the photo inverts */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden"
            style={{ width, height, opacity: ready ? 1 : 0 }}
          >
            <motion.span
              className={`block text-white mix-blend-difference ${wordmark}`}
              style={{ opacity: textOpacity, y: textY }}
            >
              _Get In Touch
            </motion.span>
          </motion.div>
        </motion.div>

        <Reveal delay={0.1} className="mt-14 max-w-[520px] text-center">
          <p className="text-text-secondary-dark" style={{ fontSize: '20px', lineHeight: 1.5 }}>
            Whether you’re searching for a new beginning, an investment, or a place to call home, our
            team is here to help.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 w-full sm:w-auto">
          <Cta variant="rose" size="large" label="Let’s Talk" href="/contact" />
        </Reveal>
      </div>
    </section>
  )
}
