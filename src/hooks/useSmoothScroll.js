import { useEffect } from 'react'
import Lenis from 'lenis'

let instance = null

/** The live Lenis instance, or null before the app mounts. */
export function getLenis() {
  return instance
}

/**
 * Buttery momentum scrolling (Lenis) + smooth anchor navigation.
 * Gives the whole page the smooth, premium scroll feel.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    instance = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Smoothly scroll to in-page anchors
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (id.length <= 1) return
      const target = document.querySelector(id)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -20 })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      instance = null
    }
  }, [])
}
