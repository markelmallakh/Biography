import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/**
 * Location map with switchable routes.
 *
 * One persistent Leaflet instance — picking a landmark never reloads the map, it
 * flies the camera. Only the selected landmark is pinned, so the frame stays
 * clean; the first one is shown on load. `flyToBounds` frames the project and
 * that landmark together, so zoom falls out of the geometry: a landmark 8 km away
 * fills the frame, one 210 km away pulls right back.
 *
 * Road geometry comes from the public OSRM demo server; if it is unavailable the
 * route falls back to a direct line so the section still works.
 *
 * Tiles are CARTO's light basemap, which matches the Figma's pale grey map and
 * needs no API key. Both OSRM and CARTO are fine for staging — swap in a paid
 * tile/routing plan (or the Google Maps JS API) before this carries real traffic.
 */
const TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

// Leaflet's own easing curve. Higher easeLinearity = less swoop, more directness.
const FLY = { duration: 0.9, easeLinearity: 0.4 }
const FIT = { padding: [60, 60], maxZoom: 14, ...FLY }
const ROUTE = { color: '#333132', weight: 3, lineJoin: 'round' }

export const directionsHref = ({ project, landmark }) =>
  landmark
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(landmark.query)}&destination=${encodeURIComponent(project)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project)}`

/*
 * Marker markup is injected as a raw string, outside React and outside Tailwind's
 * class scanner, so these are styled inline.
 *
 * The logo needs explicit width/height rather than max-width: Leaflet's stylesheet
 * forces `max-width: none !important` on every image in the marker pane, so any
 * max-* constraint is ignored and the logo would draw at its natural size.
 * A fixed box plus object-fit letterboxes each wordmark inside the disc.
 */
const COMPACT_MQ = '(max-width: 639px)'

// The pin is sized off the viewport: at 76px it eats a phone-sized map frame.
const projectIcon = (logo, compact) => {
  const size = compact ? 48 : 76
  const ring = compact ? 5 : 8
  const [w, h] = compact ? [28, 17] : [44, 26]
  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span style="display:grid;place-items:center;width:${size}px;height:${size}px;border-radius:9999px;background:rgba(209,188,199,0.92);box-shadow:0 0 0 ${ring}px rgba(92,90,91,0.35);">
             <img src="${logo}" alt="" style="width:${w}px;height:${h}px;object-fit:contain;" />
           </span>`,
  })
}

const landmarkIcon = L.divIcon({
  className: '',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  html: '<span style="display:block;width:14px;height:14px;border-radius:9999px;background:#333132;box-shadow:0 0 0 4px rgba(255,255,255,0.85);"></span>',
})

async function fetchRoute(from, to) {
  const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
  const res = await fetch(url)
  if (!res.ok) throw new Error('routing unavailable')
  const data = await res.json()
  const line = data?.routes?.[0]?.geometry?.coordinates
  if (!line?.length) throw new Error('no route')
  return line.map(([lng, lat]) => [lat, lng])
}

export default function LocationMap({ project, coords, landmarks, logo }) {
  const hostRef = useRef(null)
  const mapRef = useRef(null)
  const routeRef = useRef(null)
  const pinRef = useRef(null)
  const [active, setActive] = useState(0)

  // Create the map once — only the project pin is permanent.
  useEffect(() => {
    const map = L.map(hostRef.current, {
      center: coords,
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: false, // page scroll should not be hijacked
    })
    L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map)
    // CARTO light is very pale — lift the tile pane so roads and water read.
    map.getPane('tilePane').style.filter = 'contrast(1.12) saturate(1.25)'
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const mq = window.matchMedia(COMPACT_MQ)
    const pin = L.marker(coords, {
      icon: projectIcon(logo, mq.matches),
      keyboard: false,
      zIndexOffset: 1000,
    }).addTo(map)
    const onBreakpoint = (e) => pin.setIcon(projectIcon(logo, e.matches))
    mq.addEventListener('change', onBreakpoint)

    mapRef.current = map
    // The section reveals into view, so the container has its final size late.
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(hostRef.current)

    return () => {
      mq.removeEventListener('change', onBreakpoint)
      observer.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [coords, logo])

  /*
   * Switching landmark is choreographed in three beats so it reads as one motion:
   * the old route fades out (200ms), the camera flies to frame the new pair, and
   * once the flight settles the road draws itself tip-to-tail via a
   * stroke-dashoffset animation. Drawing only after `moveend` matters twice over:
   * it sequences the beats, and Leaflet recomputes the path at the final zoom, so
   * the measured length used for the dash animation is the length actually drawn.
   */
  useEffect(() => {
    const map = mapRef.current
    if (!map) return undefined
    let cancelled = false

    // Fade the previous route away rather than yanking it off the map.
    const oldRoute = routeRef.current
    routeRef.current = null
    if (oldRoute) {
      const el = oldRoute.getElement?.()
      if (el) {
        el.style.transition = 'opacity 200ms ease'
        el.style.opacity = '0'
        setTimeout(() => map.removeLayer(oldRoute), 220)
      } else {
        map.removeLayer(oldRoute)
      }
    }
    if (pinRef.current) {
      map.removeLayer(pinRef.current)
      pinRef.current = null
    }

    const landmark = landmarks[active]
    if (!landmark) return undefined

    pinRef.current = L.marker(landmark.coords, { icon: landmarkIcon, keyboard: false })
      .addTo(map)
      .bindTooltip(landmark.name, { direction: 'top', offset: [0, -10] })

    // Camera first — it never waits on the network.
    map.flyToBounds(L.latLngBounds([coords, landmark.coords]), FIT)
    const routePromise = fetchRoute(landmark.coords, coords).catch(() => null)

    let drawn = false
    const drawWhenSettled = async () => {
      if (drawn) return
      drawn = true
      const line = await routePromise
      if (cancelled || !mapRef.current) return

      const poly = L.polyline(line ?? [landmark.coords, coords], {
        ...ROUTE,
        opacity: line ? 0.9 : 0.6,
        dashArray: line ? undefined : '6 8',
      }).addTo(map)
      routeRef.current = poly

      // Draw-on: dash the path to its own length and unwind the offset.
      const el = line ? poly.getElement?.() : null
      if (el) {
        const length = el.getTotalLength()
        el.style.strokeDasharray = `${length}`
        el.style.strokeDashoffset = `${length}`
        const anim = el.animate(
          [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
          { duration: 750, easing: 'cubic-bezier(0.45,0,0.2,1)' }
        )
        // Clear the dash so later zooms (which re-project the path) can't leave
        // the road drawn against a stale length.
        anim.onfinish = () => {
          el.style.strokeDasharray = ''
          el.style.strokeDashoffset = ''
        }
      }

      // Re-frame only if the road swings outside the current view.
      if (!map.getBounds().pad(-0.05).contains(poly.getBounds())) {
        map.flyToBounds(poly.getBounds(), FIT)
      }
    }

    map.once('moveend', drawWhenSettled)
    // If the camera is already in place no move happens — draw anyway.
    const fallback = setTimeout(drawWhenSettled, FLY.duration * 1000 + 200)

    return () => {
      cancelled = true
      clearTimeout(fallback)
      map.off('moveend', drawWhenSettled)
    }
  }, [active, coords, landmarks])

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <ul className="flex w-full shrink-0 flex-col gap-2 lg:h-[427px] lg:w-[262px]">
        {landmarks.map((landmark, i) => {
          const isActive = active === i
          return (
            <li key={landmark.name} className="flex lg:flex-1">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`flex w-full flex-col justify-center gap-1 px-5 py-4 text-left transition-colors duration-300 ${
                  isActive
                    ? 'bg-primary-rose text-primary-white'
                    : 'bg-primary-offwhite text-primary-black hover:bg-rose-30'
                }`}
              >
                <span className="text-h6 font-medium leading-[1.3]">{landmark.name}</span>
                <span className={`text-small-light font-light ${isActive ? 'text-primary-white/85' : 'text-text-secondary-dark'}`}>
                  {landmark.time} • {landmark.distance}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div
        ref={hostRef}
        role="application"
        aria-label={`Map of ${project} and nearby landmarks`}
        className="h-[320px] w-full bg-gray-1 lg:h-[427px]"
      />
    </div>
  )
}
