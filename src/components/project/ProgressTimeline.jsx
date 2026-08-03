import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Construction milestones as a horizontal timeline, per Figma 542:8361.
 *
 * The rule is drawn per card at `calc(100% + gap)` so each segment bridges the
 * gap to its neighbour — the line reads as one continuous track without needing
 * to be measured and positioned over the scroller. Each card carries its own
 * white dot, so the milestones stay aligned to their card at any width.
 *
 * The track is a native scroller: arrows drive it on desktop, swipe on touch.
 */
const GAP = 16 // px between cards; the rule overshoots by exactly this

export default function ProgressTimeline({ items }) {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 })
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const step = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-milestone]')
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + GAP), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        onScroll={sync}
        style={{ gap: GAP }}
        className="flex snap-x snap-mandatory overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li
            key={item.date}
            data-milestone
            className="w-[260px] shrink-0 snap-start sm:w-[320px] lg:w-[412px]"
          >
            <button
              type="button"
              aria-label={`Play update from ${item.date}`}
              className="group relative block aspect-square w-full overflow-hidden"
            >
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-primary-white/90 transition-transform duration-300 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-primary-black">
                    <path d="M7 4.5l9 5.5-9 5.5z" />
                  </svg>
                </span>
              </span>
            </button>

            <p className="mt-5 text-small-light font-light text-text-secondary-dark">{item.date}</p>

            {/* Rule + milestone dot. Overshooting by the gap joins the segments.
                The dot sits flush with the card's text column and carries a rose
                ring in the band colour, which reads as a break in the rule. */}
            <div
              aria-hidden
              className="relative mt-3 h-px bg-primary-black/20"
              style={{ width: `calc(100% + ${GAP}px)` }}
            >
              <span className="absolute -top-1 left-0 h-[9px] w-[9px] rounded-full bg-primary-white ring-[3px] ring-primary-rose" />
            </div>

            <h3 className="mt-4 text-m-h4 font-bold leading-[1.3] text-primary-black lg:text-h5">
              {item.title}
            </h3>
          </li>
        ))}
      </ul>

      <Arrow direction="prev" onClick={() => step(-1)} disabled={edges.start} />
      <Arrow direction="next" onClick={() => step(1)} disabled={edges.end} />
    </div>
  )
}

// Sits over the image row, which is the square at the top of each card. Kept
// fully inside the track — hanging off the edge got clipped by the band's
// `overflow-hidden` on wide screens.
function Arrow({ direction, onClick, disabled }) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? 'Previous milestones' : 'Next milestones'}
      className={`absolute top-[26%] z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center bg-primary-white text-primary-black shadow-[0_4px_16px_rgba(51,49,50,0.12)] transition-opacity duration-300 sm:grid ${
        isPrev ? 'left-4' : 'right-4'
      } ${disabled ? 'pointer-events-none opacity-0' : 'opacity-100 hover:bg-primary-black hover:text-primary-white'}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={isPrev ? '' : 'rotate-180'}>
        <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
