import { motion } from 'framer-motion'
import Cursor from '../ui/Cursor.jsx'
import ParallaxImage from '../ui/ParallaxImage.jsx'
import { chairman } from '../../data/about.js'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Entrance choreography, in order: the rule draws left to right behind the portrait,
 * the name masks up into place, "_Chairman Message" masks down, then the paragraphs
 * settle in.
 */
const rule = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
}
const maskUp = {
  hidden: { y: '110%' },
  show: (i = 0) => ({ y: '0%', transition: { duration: 0.8, delay: 0.5 + i * 0.1, ease: EASE } }),
}
const maskDown = {
  hidden: { y: '-110%' },
  show: { y: '0%', transition: { duration: 0.7, delay: 1.05, ease: EASE } },
}
// The portrait is already in place before the rule draws behind it.
const portrait = {
  hidden: { opacity: 0, scale: 1.02 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
}
const settle = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.3 + i * 0.14, ease: EASE },
  }),
}

export default function ChairmanSection() {
  const nameLines = chairman.name.split('\n')

  return (
    <section className="bg-primary-black px-4 py-24 lg:px-[60px]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto w-full max-w-[1392px]"
      >
        {/* Rule sits under everything, and draws from the left */}
        <motion.div
          aria-hidden
          variants={rule}
          style={{ transformOrigin: 'left center' }}
          className="pointer-events-none absolute inset-x-0 top-[202px] z-0 hidden h-px bg-white/20 lg:block"
        />

        <QuoteMark className="absolute right-0 top-0 z-10 h-16 w-auto text-primary-rose lg:h-[95px]" />

        <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[206px_502px_minmax(0,1fr)] lg:items-start lg:gap-x-8">
          {/* Name — masks up, line by line */}
          <h2 className="text-m-h1 font-bold leading-[1.2] text-primary-white lg:pt-6 lg:text-h3">
            {nameLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span custom={i} variants={maskUp} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Portrait covers the rule */}
          <motion.div variants={portrait} className="lg:row-span-2">
            <ParallaxImage
              src={chairman.portrait}
              alt={chairman.name.replace('\n', ' ')}
              className="h-[320px] w-full lg:h-[585px]"
              imgClassName="grayscale"
              strength={30}
            />
          </motion.div>

          <div className="flex flex-col gap-7 lg:col-start-3 lg:row-start-2 lg:pt-6">
            {/* Heading — masks down */}
            <h3 className="overflow-hidden pb-[0.08em] text-m-h4 font-bold text-primary-white lg:text-h4">
              <motion.span variants={maskDown} className="block">
                <Cursor />{chairman.heading}
              </motion.span>
            </h3>

            {chairman.body.map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={settle}
                className="text-small-light font-light leading-[1.6] text-text-secondary-light"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function QuoteMark({ className }) {
  return (
    <svg viewBox="0 0 102 95" fill="currentColor" className={className} aria-hidden>
      <path d="M0 95V54.6C0 38.9 3.2 25.9 9.7 15.5 16.2 5.2 26.5 0 40.5 0v18.7c-6.6 0-11.6 2.4-15 7.2-3.4 4.8-5.1 11-5.1 18.6h20.1V95H0zM61.5 95V54.6c0-15.7 3.2-28.7 9.7-39.1C77.7 5.2 88 0 102 0v18.7c-6.6 0-11.6 2.4-15 7.2-3.4 4.8-5.1 11-5.1 18.6H102V95H61.5z" />
    </svg>
  )
}
