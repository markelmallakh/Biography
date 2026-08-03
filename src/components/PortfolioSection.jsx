import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import Reveal from './Reveal.jsx'
import ParallaxImage from './ui/ParallaxImage.jsx'
import Cta from './ui/Cta.jsx'
import Cursor from './ui/Cursor.jsx'
import { projects, projectHref } from '../data/projects.js'
import { withBase } from '../lib/paths.js'

// Loads an image into a tiny offscreen canvas — cropped to the frame's aspect the
// same way `object-cover` does — so we can read the luminance (0 = black … 1 = white)
// under any normalized (u, v) point exactly as it's displayed.
function useLuminanceSampler(src, aspect = 1) {
  const ctxRef = useRef(null)
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.src = src
    img.onload = () => {
      if (cancelled) return
      const w = 64
      const h = Math.max(1, Math.round(64 / aspect))
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      // Cover-crop: scale the image to cover the canvas, centered.
      const scale = Math.max(w / img.width, h / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
      ctxRef.current = ctx
      dimsRef.current = { w, h }
    }
    return () => {
      cancelled = true
    }
  }, [src, aspect])

  return (u, v) => {
    const ctx = ctxRef.current
    if (!ctx) return null
    const { w, h } = dimsRef.current
    const px = Math.max(0, Math.min(w - 1, Math.round(u * w)))
    const py = Math.max(0, Math.min(h - 1, Math.round(v * h)))
    const [r, g, b] = ctx.getImageData(px, py, 1, 1).data
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
}

export default function PortfolioSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="projects" className="bg-primary-white px-4 py-16 lg:px-[60px] lg:py-28">
      <Reveal className="mx-auto flex max-w-[1392px] flex-col gap-2">
        <p className="text-h6 font-bold text-rose-120"><Cursor />Our Projects</p>
        <h2 className="max-w-[707px] text-m-h2 font-bold leading-[1.2] text-primary-black lg:text-h2">
          Destinations Designed Around The Way People Live
        </h2>
      </Reveal>

      {/* Sticky stack — each card slides over the previous one */}
      <div ref={containerRef} className="mx-auto mt-10 max-w-[1392px] lg:mt-16">
        {projects.map((p, i) => (
          <StackCard key={p.name} card={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

export function StackCard({ card, index, total, progress }) {
  const next = (index + 1) / total
  const after = Math.min((index + 2) / total, 1)
  const isLast = index === total - 1

  // Stay crisp & full while active, then shrink + blur once the next card covers it.
  const targetScale = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(progress, [next, 1], [1, isLast ? 1 : targetScale])
  const blur = useTransform(progress, [next, after], [0, isLast ? 0 : 6])
  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    // Sticks higher on phones so a full card clears the browser's bottom bar and
    // the stacking starts while the card is still rising into view.
    <div
      className="sticky [--stack-top:64px] lg:[--stack-top:90px]"
      style={{ top: `calc(var(--stack-top) + ${index * 18}px)`, paddingBottom: '24px' }}
    >
      <motion.div style={{ scale, filter, transformOrigin: 'center top' }}>
        <PropertyCard {...card} />
      </motion.div>
    </div>
  )
}

export function PropertyCard({ slug, name, location, type, desc, large, smalls, logo, dark }) {
  const href = projectHref(slug)
  const muted = dark ? 'text-text-secondary-light' : 'text-text-secondary-dark'
  const pillBg = dark ? 'bg-gray-dark-8' : 'bg-gray-.5'

  // Cursor-following label, tracked across the whole card, with adaptive contrast.
  const cardRef = useRef(null)
  const largeRef = useRef(null)
  const smallRefs = [useRef(null), useRef(null)]
  const sampleLarge = useLuminanceSampler(large, 620 / 517)
  const sampleSmallA = useLuminanceSampler(smalls[0], 233 / 248)
  const sampleSmallB = useLuminanceSampler(smalls[1], 233 / 248)
  const smallSamplers = [sampleSmallA, sampleSmallB]
  const [hover, setHover] = useState(false)
  // labelDark = render a dark label (used over light backgrounds). Default to the card bg.
  const [labelDark, setLabelDark] = useState(!dark)
  const labelDarkRef = useRef(labelDark)
  const setDark = (v) => {
    if (v !== labelDarkRef.current) {
      labelDarkRef.current = v
      setLabelDark(v)
    }
  }

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 600, damping: 45, mass: 0.3 })
  const y = useSpring(rawY, { stiffness: 600, damping: 45, mass: 0.3 })

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    rawX.set(e.clientX - r.left)
    rawY.set(e.clientY - r.top)

    // Sample luminance under the cursor: photos via canvas, else the card bg.
    let lum = null
    const frames = [[largeRef, sampleLarge], ...smallRefs.map((r, i) => [r, smallSamplers[i]])]
    for (const [ref, sample] of frames) {
      const b = ref.current?.getBoundingClientRect()
      if (b && e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom) {
        lum = sample((e.clientX - b.left) / b.width, (e.clientY - b.top) / b.height)
        break
      }
    }
    setDark(lum == null ? !dark : lum > 0.5)
  }

  /*
   * Dark and light cards mirror each other on desktop — image right vs left, logo
   * leading vs trailing. On phones that mirroring just reads as inconsistency, so
   * the DOM order is the single mobile layout and `lg:order-*` restores the
   * alternation from `lg` up. Only the palette differs below `lg`.
   */
  const LargeImage = (
    <a
      ref={largeRef}
      href={withBase(href)}
      className={`group relative block h-[200px] w-full shrink-0 sm:h-[340px] lg:h-[517px] lg:w-[620px] ${dark ? 'lg:order-2' : ''}`}
    >
      <ParallaxImage src={large} alt={name} className="h-full w-full" hover />
    </a>
  )
  // Two supporting frames — kept narrow on phones so the logo has room to breathe.
  const SmallImages = (
    <div className="flex min-w-0 max-sm:w-[58%] flex-1 gap-2 lg:gap-3">
      {smalls.map((src, i) => (
        <div key={i} ref={smallRefs[i]} className="min-w-0 flex-1">
          <ParallaxImage
            src={src}
            className="h-[76px] w-full sm:h-[160px] lg:h-[248px]"
            imgClassName={i === 1 ? 'object-top' : ''}
            strength={28}
          />
        </div>
      ))}
    </div>
  )
  const Logo = (
    <img
      src={logo}
      alt={`${name} logo`}
      className={`h-8 w-auto shrink-0 lg:h-11 ${dark ? 'lg:order-first' : ''}`}
    />
  )

  const Content = (
    <div className={`flex min-w-0 flex-1 flex-col justify-between gap-4 self-stretch lg:gap-10 ${dark ? 'lg:order-1' : ''}`}>
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-m-h3 font-bold leading-[1.2] lg:text-h3">{name}</h3>
          <span className={`inline-flex w-fit items-center gap-2 px-1 py-0.5 ${pillBg}`}>
            <span className={`text-small-light font-light ${muted}`}>{location}</span>
            <span className={`h-1 w-1 rounded-full ${dark ? 'bg-text-secondary-light' : 'bg-text-secondary-dark'}`} />
            <span className={`text-small-light font-light ${muted}`}>{type}</span>
          </span>
          <p className={`max-w-[604px] text-regular-light font-light ${muted}`}>{desc}</p>
        </div>
        {/* Cta applies the base itself — pass the raw route */}
        <Cta variant="rose" size="small" label={`Explore ${name}`} href={href} className="w-fit" />
      </div>
      <div className="flex items-end justify-between gap-4 lg:gap-6">
        {SmallImages}
        {Logo}
      </div>
    </div>
  )

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative flex flex-col gap-4 overflow-hidden p-4 lg:flex-row lg:items-center lg:gap-6 lg:p-8 ${
        dark ? 'bg-primary-black text-primary-white' : 'bg-primary-offwhite text-primary-black'
      }`}
    >
      {LargeImage}
      {Content}

      {/* Cursor-following label — sits just under the pointer, anywhere on the card */}
      <motion.span
        style={{ left: x, top: y, marginLeft: '16px', marginTop: '18px' }}
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.85 }}
        transition={{ duration: 0.18 }}
        className={`pointer-events-none absolute z-30 flex origin-top-left items-center gap-2 whitespace-nowrap border px-4 py-2 text-small-normal font-medium uppercase tracking-[0.1em] shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[18px] backdrop-saturate-150 transition-colors duration-200 ${
          labelDark ? 'border-white/20 bg-primary-black/40 text-white' : 'border-black/10 bg-white/45 text-primary-black'
        }`}
      >
        Explore {name}
      </motion.span>
    </article>
  )
}
