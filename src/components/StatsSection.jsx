import Reveal from './Reveal.jsx'
import { GlassScene, GlassPanel } from './ui/Glass.jsx'
import Cta from './ui/Cta.jsx'
import Counter from './ui/Counter.jsx'

const showcaseImage = '/assets/about-3.png'

const stats = [
  { value: '+20', label: 'Years In Market' },
  { value: '+200', label: 'Acres' },
  { value: '4', label: 'Projects' },
  { value: '+20K', label: 'Happy Clients' },
]

export default function StatsSection() {
  return (
    <section id="about" className="flex flex-col items-center gap-[60px] bg-primary-rose px-4 py-20 lg:px-[60px]">
      {/* Headline left · intro right */}
      <div className="flex w-full max-w-[1392px] flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-16">
        <Reveal>
          <h2 className="max-w-[850px] text-[clamp(48px,7vw,100px)] font-light leading-none text-primary-black">
            The Art Of <span className="text-primary-white">_Meaningful</span> Living
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="w-full shrink-0 lg:w-[439px]">
          <div className="flex flex-col gap-8">
            <p className="text-lg-light font-light text-text-secondary-dark">
              Since our founding in 2024, Biography has approached real estate as a form of
              storytelling. We build communities where architecture and human intention align,
              creating spaces that reflect how people truly want to live.
            </p>
            <Cta label="About Biography" variant="outlineWhite" href="#about" className="w-fit" />
          </div>
        </Reveal>
      </div>

      <Showcase />
    </section>
  )
}

// Full-bleed photo that drifts vertically as the section scrolls, with the insight
// cards floating over it on frosted glass.
function Showcase() {
  return (
    <GlassScene
      image={showcaseImage}
      alt="A family at home in a Biography community"
      drift={9}
      scrim="bg-black/10"
      className="h-[520px] w-full max-w-[1392px] overflow-hidden sm:h-[640px] lg:h-[792px]"
    >
      <div className="absolute inset-x-0 bottom-0 flex justify-end px-4 pb-4 lg:px-[60px] lg:pb-8">
        {/* Four across is unreadable on a phone — pair them into a 2×2 block instead */}
        <div className="grid w-full max-w-[1015px] grid-cols-2 gap-2 sm:flex lg:gap-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.06 * i} y={0} className="flex-1">
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </GlassScene>
  )
}

function StatCard({ value, label }) {
  return (
    <GlassPanel
      className="h-[128px] rounded-[10px] sm:h-[220px] sm:rounded-[12px] lg:h-[270px]"
      contentClassName="flex flex-col justify-between px-3 pb-3 pt-3 sm:pt-4 lg:px-4 lg:pb-4 lg:pt-6"
    >
      <Counter
        value={value}
        className="whitespace-nowrap text-[34px] font-bold leading-[1.05] text-white sm:text-[clamp(36px,5vw,92px)]"
      />
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[18px]">
        <div className="h-px w-full bg-white/45" />
        <p className="text-small-normal font-medium text-white lg:text-lg-normal">{label}</p>
      </div>
    </GlassPanel>
  )
}
