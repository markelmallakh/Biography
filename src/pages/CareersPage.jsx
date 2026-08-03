import Reveal from '../components/Reveal.jsx'
import Cursor from '../components/ui/Cursor.jsx'
import ParallaxImage from '../components/ui/ParallaxImage.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { JobMeta } from '../components/JobMeta.jsx'
import { culture, jobs } from '../data/careers.js'

export default function CareersPage() {
  return (
    <main id="careers">
      {/* Hero */}
      <section className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden px-4 pt-[140px] text-center lg:px-[60px]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <img src="/assets/about-2.png" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary-black/60" />
        </div>
        <Reveal className="flex flex-col items-center gap-2 pb-16">
          <p className="text-regular-normal font-medium text-primary-white">Careers</p>
          <h1 className="max-w-[820px] text-m-h1 font-light leading-[1.1] text-primary-white lg:text-h2">
            More Than A Workplace
          </h1>
        </Reveal>
      </section>

      <SectionReveal><CultureBand /></SectionReveal>
      <SectionReveal><OpenPositions /></SectionReveal>
      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}

function CultureBand() {
  return (
    <section className="bg-primary-white px-4 py-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1392px] flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* Two frames, the second dropped down so they stagger like the Figma */}
        <div className="flex flex-1 gap-6">
          <Reveal className="w-[42%]">
            <ParallaxImage src={culture.images[0]} alt="" className="aspect-[3/4] w-full" strength={30} />
          </Reveal>
          <Reveal delay={0.1} className="w-[58%] lg:pt-16">
            <ParallaxImage src={culture.images[1]} alt="" className="aspect-[4/5] w-full" strength={30} />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex flex-1 flex-col gap-8 lg:pt-10">
          <div className="flex flex-col gap-2">
            <p className="text-regular-normal font-medium text-text-secondary-dark">
              <Cursor />{culture.tagline}
            </p>
            <h2 className="text-m-h2 font-bold text-primary-black lg:text-h3">{culture.heading}</h2>
          </div>

          <dl className="flex flex-col gap-7">
            {culture.points.map((point) => (
              <div key={point.title} className="flex flex-col gap-2">
                <dt className="text-regular-semibold font-bold text-primary-black">{point.title}</dt>
                <dd className="text-small-light font-light leading-[1.6] text-text-secondary-dark">{point.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function OpenPositions() {
  return (
    <section className="bg-primary-rose px-4 py-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1392px] flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p className="text-regular-normal font-medium text-text-secondary-dark">
            <Cursor />Join Biography
          </p>
          <h2 className="text-m-h2 font-bold text-primary-black lg:text-h3">Open Positions</h2>
          <p className="max-w-[640px] text-regular-light font-light text-text-secondary-dark">
            Join a team passionate about creating exceptional destinations and meaningful experiences
            across real estate, architecture, development, and lifestyle innovation.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.06}>
              <JobRow job={job} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function JobRow({ job }) {
  return (
    <a
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-5 bg-primary-white p-6 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(51,49,50,0.12)] lg:flex-row lg:items-center lg:gap-10"
    >
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-h6 font-bold text-primary-black">{job.title}</h3>
        <p className="max-w-[820px] text-small-light font-light text-text-secondary-dark">{job.summary}</p>
        <JobMeta job={job} />
      </div>

      <span className="flex h-[38px] shrink-0 items-center justify-between gap-4 rounded-[4px] border border-gray-3 px-3 text-small-normal font-medium uppercase tracking-[0.04em] text-primary-black transition-colors duration-300 group-hover:border-primary-black group-hover:bg-primary-black group-hover:text-primary-white">
        Apply Now
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  )
}
