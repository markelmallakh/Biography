import { useEffect, useState } from 'react'
import { getLenis } from './useSmoothScroll.js'

/**
 * Minimal pathname router — the site only has a handful of pages, so this avoids
 * pulling in a routing library. Same-origin links are handled with pushState;
 * a hash on the target URL scrolls there once the new page has rendered.
 */
export default function useRoute() {
  const [path, setPath] = useState(() => normalize(window.location.pathname))
  const [pendingHash, setPendingHash] = useState('')

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      const link = e.target.closest('a[href]')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const next = normalize(url.pathname)
      e.preventDefault()

      if (next === normalize(window.location.pathname)) {
        if (url.hash) scrollToHash(url.hash)
        return
      }
      window.history.pushState({}, '', url.pathname + url.hash)
      setPath(next)
      setPendingHash(url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Land at the top of a new page, or at its anchor when the link carried a hash.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (pendingHash) scrollToHash(pendingHash)
      else getLenis()?.scrollTo(0, { immediate: true })
      setPendingHash('')
    })
    return () => cancelAnimationFrame(id)
  }, [path]) // eslint-disable-line react-hooks/exhaustive-deps

  return path
}

function normalize(pathname) {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

function scrollToHash(hash) {
  const target = document.querySelector(hash)
  if (target) getLenis()?.scrollTo(target, { offset: -20 })
}
