import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Cta from './ui/Cta.jsx'

const heroVideo = '/assets/Biography-hero.mp4'

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 28 } },
}

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-4 py-[50px] text-center lg:px-[60px]"
    >
      {/* Background video + subtle dark overlay */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <motion.video
          style={{ y: bgY }}
          className="absolute left-0 top-[-8%] h-[116%] w-full object-cover"
          src={heroVideo}
          poster="/assets/home-hero.png"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center gap-2"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
      >
        <motion.span
          variants={rise}
          className="flex h-[26px] items-center bg-primary-rose px-2 text-h6 font-bold text-primary-black"
        >
          _Places That Tell
        </motion.span>
        <motion.h1
          variants={rise}
          className="max-w-[1152px] text-[clamp(44px,7vw,92px)] font-bold leading-[1.05] text-primary-white"
        >
          Where Every Day<br className="hidden md:block" /> Feels Better
        </motion.h1>
        <motion.p
          variants={rise}
          className="mt-1 max-w-[588px] text-lg-normal font-medium leading-[1.1] text-primary-white"
        >
          We create thoughtfully designed communities where every moment, every space, and every home
          becomes part of a life well lived.
        </motion.p>
      </motion.div>

      <motion.div variants={rise} initial="hidden" animate="show" className="relative w-full sm:w-auto">
        <Cta variant="white" label="Let's Talk" href="/contact" />
      </motion.div>
    </section>
  )
}
