import Reveal from '../Reveal.jsx'
import Cta from '../ui/Cta.jsx'
import Cursor from '../ui/Cursor.jsx'
import Coverflow from './Coverflow.jsx'
import { heroStrip } from '../../data/about.js'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-primary-rose pb-4 pt-[140px]">
      {/* Sits above the strip, which is pulled up underneath it */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center lg:px-[60px]">
        <Reveal className="flex flex-col items-center gap-2">
          <p className="text-regular-normal font-medium text-text-secondary-dark">
            <Cursor />About Biography
          </p>
          <h1 className="max-w-[796px] text-[clamp(44px,6.6vw,92px)] font-light leading-[1.05] text-primary-black">
            We Craft Spaces Where Life Unfolds
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <Cta label="Explore Projects" variant="outline" href="/#projects" />
        </Reveal>
      </div>

      {/* The strip's own 104px canvas padding supplies most of the gap, so it is
          pulled up to leave the 14px the Figma hero shows under the CTA. */}
      <Coverflow images={heroStrip} className="mt-[-5.95%]" />
    </section>
  )
}
