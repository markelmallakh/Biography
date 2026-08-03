import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Frosted panels over a drifting photo.
 *
 * `backdrop-filter` cannot be used here: the browser rasterises the backdrop
 * snapshot on a different schedule from the compositor transform driving the
 * parallax, so the blur always trails the photo by a frame or two and visibly
 * smears while scrolling. No amount of `will-change` / `translateZ` fixes that —
 * it is how the two pipelines are specified.
 *
 * Instead each panel renders its own blurred copy of the same photo, aligned to
 * the scene's coordinate space and driven by the *same* motion value as the
 * backdrop. Both move in one frame, so they can never fall out of step.
 */
const GlassContext = createContext(null)

const OVERSCAN = 0.12 // extra image height (fraction) so the drift never exposes an edge

export function GlassScene({
  image,
  alt = '',
  drift = 8, // percent of travel across the whole scroll pass
  scrim = 'bg-primary-black/45',
  surface = 'bg-primary-black', // sits under the photo; keep it off the outer box
  imageClassName = '',
  className = '',
  children,
}) {
  const sceneRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-drift}%`, `${drift}%`])
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    // Border box, not contentRect: panel offsets are measured from
    // getBoundingClientRect, so a padded scene would otherwise report a smaller
    // box and every panel's blurred copy would sit shifted from the real backdrop.
    const observer = new ResizeObserver(() => {
      setSize({ width: el.offsetWidth, height: el.offsetHeight })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <GlassContext.Provider value={{ sceneRef, size, y, image, scrim, imageClassName }}>
      {/*
       * `isolate` is load-bearing. The backdrop sits at -z-10 so that static
       * children paint their own backgrounds over it; without a stacking context
       * here that negative layer escapes upward and is painted over by the first
       * ancestor that has a background (e.g. the home page's rose section),
       * leaving the photo invisible and only the panels' blurred copies showing.
       */}
      <div ref={sceneRef} className={`relative isolate ${className}`}>
        <div aria-hidden className={`absolute inset-0 -z-10 overflow-hidden ${surface}`}>
          <motion.img
            src={image}
            alt={alt}
            // Oversized and offset so the drift never uncovers the frame
            style={{ y, top: `${-OVERSCAN * 100}%`, height: `${100 + OVERSCAN * 200}%` }}
            className={`absolute left-0 w-full object-cover ${imageClassName}`}
          />
          <div className={`absolute inset-0 ${scrim}`} />
        </div>
        {children}
      </div>
    </GlassContext.Provider>
  )
}

/**
 * A panel of frosted glass. Renders the scene's photo again, blurred and shifted
 * so it lines up exactly with the copy behind the panel.
 */
export function GlassPanel({
  blur = 25,
  tint = 'bg-white/15',
  className = '',
  contentClassName = '',
  children,
}) {
  const ctx = useContext(GlassContext)
  const panelRef = useRef(null)
  const [offset, setOffset] = useState({ left: 0, top: 0 })

  const measure = useCallback(() => {
    const panel = panelRef.current
    const scene = ctx?.sceneRef.current
    if (!panel || !scene) return
    const p = panel.getBoundingClientRect()
    const s = scene.getBoundingClientRect()
    setOffset({ left: p.left - s.left, top: p.top - s.top })
  }, [ctx])

  useEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (panelRef.current) observer.observe(panelRef.current)
    if (ctx?.sceneRef.current) observer.observe(ctx.sceneRef.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, ctx])

  // Without a scene to sample, fall back to a flat translucent panel.
  if (!ctx) {
    return (
      <div className={`${tint} ${className}`}>
        <div className={contentClassName}>{children}</div>
      </div>
    )
  }

  const { size, y, image, scrim, imageClassName } = ctx

  return (
    <div ref={panelRef} className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* The scene's photo, re-drawn in the panel's coordinate space */}
        <div
          className="absolute"
          style={{ left: -offset.left, top: -offset.top, width: size.width, height: size.height }}
        >
          {/* Geometry must match the scene's backdrop exactly — no extra scale,
              or the blurred copy shows a different crop and the panel reads as a
              seam rather than as glass. */}
          <motion.img
            style={{ y, top: `${-OVERSCAN * 100}%`, height: `${100 + OVERSCAN * 200}%`, filter: `blur(${blur}px)` }}
            src={image}
            alt=""
            className={`absolute left-0 w-full object-cover ${imageClassName}`}
          />
          <div className={`absolute inset-0 ${scrim}`} />
        </div>
        <div className={`absolute inset-0 ${tint}`} />
      </div>

      <div className={`relative h-full ${contentClassName}`}>{children}</div>
    </div>
  )
}
