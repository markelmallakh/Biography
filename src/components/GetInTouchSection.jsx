import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import ParallaxImage from './ui/ParallaxImage.jsx'
import Cta from './ui/Cta.jsx'
import DotGrid from './ui/DotGrid.jsx'

const ctaImages = ['/assets/CTA-1.png', '/assets/CTA-2.png', '/assets/CTA-3.png']

// One source of truth for the photo frame — the wordmark, the photo and the knockout
// layer must line up pixel for pixel or the negative effect breaks.
const frameSize = 'h-[clamp(240px,30vw,420px)] w-[clamp(280px,46vw,640px)]'
const wordmark = 'whitespace-nowrap text-center text-[clamp(52px,12vw,150px)] font-light leading-none'

// Fast looping slideshow of the three CTA images.
function CtaImageLoop() {
  const [i, setI] = useState(0)

  useEffect(() => {
    // Preload so the fast loop never flickers.
    ctaImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
    const id = setInterval(() => setI((p) => (p + 1) % ctaImages.length), 220)
    return () => clearInterval(id)
  }, [])

  return <ParallaxImage src={ctaImages[i]} className={`relative z-10 ${frameSize}`} strength={26} />
}

// "_Get In Touch" — black on the white page, photo-negative where it overlaps the
// looping image (mix-blend-difference of white text resolves to black over white).
export default function GetInTouchSection() {
  return (
    <section id="contact" className="relative flex flex-col items-center overflow-hidden bg-primary-white px-4 pb-48 pt-[120px] lg:px-16">
      {/* Interactive dot-grid background */}
      <DotGrid
        className="!absolute inset-0 z-0"
        dotSize={4}
        gap={26}
        baseColor="#E8DDE3"
        activeColor="#A78A99"
        proximity={130}
        shockRadius={220}
        shockStrength={4}
        returnDuration={1.4}
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        <div className={`relative flex w-full items-center justify-center ${frameSize}`}>
          {/* Base: primary-black wordmark, visible everywhere outside the image */}
          <span
            className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-primary-black ${wordmark}`}
          >
            _Get In Touch
          </span>

          {/* Looping image */}
          <CtaImageLoop />

          {/* Knockout negative — clipped to the image box so only the part over the photo inverts */}
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden ${frameSize}`}
          >
            <span className={`text-white mix-blend-difference ${wordmark}`}>_Get In Touch</span>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14 max-w-[520px] text-center">
          <p className="text-text-secondary-dark" style={{ fontSize: '20px', lineHeight: 1.5 }}>
            Whether you’re searching for a new beginning, an investment, or a place to call home, our
            team is here to help.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Cta variant="rose" size="large" label="Let’s Talk" href="/contact" />
        </Reveal>
      </div>
    </section>
  )
}
