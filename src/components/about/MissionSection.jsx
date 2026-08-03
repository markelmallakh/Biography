import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import Reveal from '../Reveal.jsx'
import Cursor from '../ui/Cursor.jsx'
import HighlightText from '../ui/HighlightText.jsx'
import { mission } from '../../data/about.js'

export default function MissionSection() {
  return (
    <section className="bg-rose-05 pb-20 pt-24">
      <Reveal className="mx-auto flex w-full max-w-[1392px] flex-col gap-4 px-4 lg:px-[60px]">
        <p className="text-small-normal font-medium text-rose-120">
          <Cursor />{mission.tagline}
        </p>
        <HighlightText
          text={mission.text}
          className="max-w-[1000px] text-m-h2 font-light leading-[1.25] lg:text-h3"
        />
      </Reveal>

      {/* Full-bleed — the film runs edge to edge */}
      <Reveal delay={0.1} className="mt-2 w-full">
        <MissionVideo />
      </Reveal>
    </section>
  )
}

// Holds at the first frame until the film is on screen, then plays it from the
// top — scrolling away rewinds, so every visit opens on the first frame.
function MissionVideo() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (inView) {
      el.currentTime = 0
      el.play().catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [inView])

  return (
    <video
      ref={ref}
      className="h-[280px] w-full object-cover sm:h-[520px] lg:h-[720px]"
      src={mission.video}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}
