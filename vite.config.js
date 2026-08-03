import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site under `/<repo>/`, so the build needs a base
// path. `VITE_BASE` is set by the deploy workflow; local dev stays at the root.
const base = process.env.VITE_BASE ?? '/'

// Directories under `public/` that source code links to by absolute path.
const PUBLIC_DIRS = ['assets', 'fonts']

/**
 * Everything in `public/` is referenced by absolute path (`/assets/x.webp`,
 * `/fonts/x.woff2`) from ~140 places across the data files, components and CSS.
 * Vite only rewrites the asset URLs it processes itself, so those literals would
 * 404 under a base path.
 *
 * Rather than thread a helper through every reference, rewrite the built output:
 * a quoted (or `url(`-wrapped) `/assets/` becomes `<base>assets/`. Vite's own
 * emitted URLs already carry the base, so they don't match and can't double up.
 */
function publicAssetBase() {
  const pattern = new RegExp(`(["'\`(])/(${PUBLIC_DIRS.join('|')})/`, 'g')
  return {
    name: 'public-asset-base',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      if (base === '/') return
      const rewrite = (code) => code.replace(pattern, `$1${base}$2/`)
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') file.code = rewrite(file.code)
        else if (typeof file.source === 'string') file.source = rewrite(file.source)
      }
    },
  }
}

/**
 * Pages has no SPA rewrite rule, so a deep link like `/Biography/projects/bayside`
 * would 404. Shipping index.html as 404.html hands those requests to the client
 * router with the original URL intact.
 */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html']
      if (index) this.emitFile({ type: 'asset', fileName: '404.html', source: index.source })
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), publicAssetBase(), spaFallback()],
})
