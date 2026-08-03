import Reveal from '../Reveal.jsx'
import { GlassScene, GlassPanel } from '../ui/Glass.jsx'
import Cursor from '../ui/Cursor.jsx'
import HighlightText from '../ui/HighlightText.jsx'
import Counter from '../ui/Counter.jsx'
import { whoWeAre, holdingCard, aboutStats } from '../../data/about.js'

const panelBox = 'rounded-[12px]'
const panelBody = 'flex flex-col justify-between p-4'

export default function WhoWeAreSection() {
  return (
    <GlassScene
      image={whoWeAre.backdrop}
      drift={8}
      scrim="bg-primary-black/75"
      imageClassName="opacity-55"
      className="overflow-hidden px-4 pb-20 pt-16 lg:px-[60px]"
    >
      {/* White intro card */}
      <Reveal className="mx-auto w-full max-w-[1392px]">
        <div className="flex flex-col gap-8 rounded-[12px] bg-primary-white p-8 lg:p-10">
          <h2 className="text-h3 font-bold text-primary-black">
            <Cursor />Who We Are
          </h2>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
            <img
              src={whoWeAre.image}
              alt=""
              className="h-[124px] w-full shrink-0 rounded-[8px] object-cover lg:w-[213px]"
            />
            <HighlightText
              text={whoWeAre.text}
              className="text-m-lg-light font-light leading-[1.5] lg:text-lg-light"
            />
          </div>
        </div>
      </Reveal>

      {/* Three glass cards over the photo */}
      <div className="mx-auto mt-3 grid w-full max-w-[1392px] gap-3 lg:grid-cols-3">
        <Reveal y={0} className="flex">
          <GlassPanel className={`${panelBox} h-[300px] w-full lg:h-[386px]`} contentClassName={panelBody}>
            <Counter
              value={aboutStats[0].value}
              className="text-m-h1 font-light leading-none text-white lg:text-h2"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-regular-semibold font-bold text-white">{aboutStats[0].title}</p>
              <p className="text-tiny-light font-light leading-[1.5] text-white/75">{aboutStats[0].text}</p>
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal y={0} delay={0.06} className="flex">
          <GlassPanel className={`${panelBox} h-full w-full`} contentClassName={`${panelBody} gap-5`}>
            <img src={holdingCard.image} alt="" className="h-[168px] w-full rounded-[8px] object-cover" />
            <div className="flex flex-col gap-3">
              <ElAttalWordmark />
              <p className="text-regular-semibold font-bold text-white">{holdingCard.title}</p>
              <p className="text-tiny-light font-light leading-[1.5] text-white/75">{holdingCard.text}</p>
              <a
                href={holdingCard.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-1 text-tiny-light font-light text-white/75 transition-colors hover:text-white"
              >
                Visit Website
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 9L9 3M9 3H4M9 3v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </GlassPanel>
        </Reveal>

        <Reveal y={0} delay={0.12} className="flex">
          <GlassPanel className={`${panelBox} h-full w-full`} contentClassName={`${panelBody} gap-5`}>
            <div className="flex flex-col gap-1.5">
              <Counter
                value={aboutStats[1].value}
                className="text-m-h1 font-light leading-none text-white lg:text-h2"
              />
              <p className="text-regular-semibold font-bold text-white">{aboutStats[1].title}</p>
              <p className="text-tiny-light font-light leading-[1.5] text-white/75">{aboutStats[1].text}</p>
            </div>
            <img src={aboutStats[1].image} alt="" className="h-[168px] w-full rounded-[8px] object-cover" />
          </GlassPanel>
        </Reveal>
      </div>
    </GlassScene>
  )
}

// Composed from the ATTAL mark plus type — there is no ELATTAL HOLDING wordmark asset yet.
function ElAttalWordmark() {
  return (
    <div className="flex items-center gap-3">
      <img src="/assets/attal-logo.png" alt="" className="h-11 w-11 shrink-0 object-contain" />
      <span className="text-[22px] font-bold uppercase leading-[0.95] tracking-[0.01em] text-white">
        Elattal
        <br />
        Holding
      </span>
    </div>
  )
}
