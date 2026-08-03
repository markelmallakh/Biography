import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from '../Reveal.jsx'
import Cursor from '../ui/Cursor.jsx'
import { team } from '../../data/about.js'

/**
 * The section pins to the viewport and converts vertical scroll into horizontal
 * travel across the team, then releases and lets the page carry on. The section's
 * own height is the viewport plus exactly the distance the track has to move, so
 * the two stay in step at any screen width.
 */
export default function TeamSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [overflow, setOverflow] = useState(0)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setOverflow(Math.max(0, track.scrollWidth - track.parentElement.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform(eased, [0, 1], [0, -overflow])

  return (
    <section ref={sectionRef} className="bg-primary-rose" style={{ height: `calc(100vh + ${overflow}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-14 overflow-hidden py-16">
        <Reveal className="flex flex-col items-center gap-2 px-4 text-center lg:px-[60px]">
          <p className="text-small-normal font-medium text-text-secondary-dark">
            <Cursor />Biography Team
          </p>
          <h2 className="max-w-[768px] text-m-h2 font-bold text-primary-black lg:text-h3">
            The People Behind Biography
          </h2>
          <p className="max-w-[562px] text-small-light font-light text-text-secondary-dark">
            Biography is led by a team of forward-thinking leaders with deep expertise across real
            estate development, architecture, urban planning, and lifestyle-driven communities.
          </p>
        </Reveal>

        <div className="px-4 lg:px-[60px]">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-2">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * The colour portrait sits under the black-and-white one. On hover the pair scales
 * up a hair first (300ms) and only then does the top frame drop away (200ms), so
 * the two never sit half-visible over each other — that overlap is what read as a
 * blur. Half a second end to end; leaving reverses with no delay.
 */
const SCALE_THEN_FADE =
  '[transition:transform_300ms_cubic-bezier(0.22,1,0.36,1),opacity_200ms_ease] ' +
  'group-hover:[transition:transform_300ms_cubic-bezier(0.22,1,0.36,1),opacity_200ms_ease_300ms]'

function TeamCard({ name, role, photo, photoHover }) {
  return (
    <article className="group relative h-[400px] w-[260px] shrink-0 overflow-hidden bg-primary-black lg:h-[480px] lg:w-[320px]">
      <img
        src={photoHover}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
      />
      <img
        src={photo}
        alt={name}
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover group-hover:scale-[1.02] group-hover:opacity-0 ${SCALE_THEN_FADE}`}
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-primary-black/90 to-transparent px-4 pb-4 pt-14">
        <p className="text-regular-normal font-medium text-primary-white">
          <Cursor static />{name}
        </p>
        {role && <p className="text-tiny-light font-light text-text-secondary-light">{role}</p>}
      </div>
    </article>
  )
}
