/**
 * Base-path helpers.
 *
 * In dev the site is served from `/`; on GitHub Pages it lives under the repo
 * name (`/Biography/`). Vite exposes whichever is in force as `BASE_URL`, so
 * every internal link is written root-relative in source (`/about`) and passed
 * through `withBase` on the way into the DOM.
 *
 * Asset URLs (`/assets/...`) are handled separately, by the `publicAssetBase`
 * plugin in vite.config.js — there are ~140 of them spread across the data
 * files, and rewriting the built bundle keeps the source readable.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** `/about` → `/Biography/about`. Leaves absolute URLs and anchors alone. */
export const withBase = (path) => (path?.startsWith('/') ? `${BASE}${path}` : path)

/** The inverse: turns a real pathname back into an app route. */
export const stripBase = (pathname) => {
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  const trimmed = path.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}
