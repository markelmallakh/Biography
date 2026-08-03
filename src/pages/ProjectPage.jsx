import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { GlassScene, GlassPanel } from '../components/ui/Glass.jsx'
import Cursor from '../components/ui/Cursor.jsx'
import Cta from '../components/ui/Cta.jsx'
import Counter from '../components/ui/Counter.jsx'
import Chips from '../components/ui/Chips.jsx'
import Field from '../components/ui/Field.jsx'
import ParallaxImage from '../components/ui/ParallaxImage.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { useRefer } from '../components/ReferDrawer.jsx'
import { SpecIcon } from '../components/project/SpecIcon.jsx'
import LocationMap, { directionsHref } from '../components/project/LocationMap.jsx'
import Masterplan from '../components/project/Masterplan.jsx'
import ProgressTimeline from '../components/project/ProgressTimeline.jsx'
import Gallery from '../components/project/Gallery.jsx'
import TabTransition from '../components/ui/TabTransition.jsx'

export default function ProjectPage({ project }) {
  const d = project.detail
  const openRefer = useRefer()

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-4 pb-20 pt-[160px] lg:px-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          {d.heroVideo ? (
            <video
              className="h-full w-full object-cover"
              src={d.heroVideo}
              poster={project.large}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={project.large} alt="" className="h-full w-full object-cover" />
          )}
          {/* Bottom-weighted scrim: solid at the base, gone by the vertical
              midpoint, so the film reads clean above and the type stays legible. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,#000000_0%,rgba(0,0,0,0)_50%)] opacity-60" />
        </div>

        <Reveal className="mx-auto flex w-full max-w-[1392px] flex-col gap-12 lg:flex-row lg:items-end lg:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <img src={project.logo} alt={project.name} className="logo-white h-[46px] w-auto self-start lg:h-[58px]" />
            {/* Stays an h1 for document structure; sized on the H2 token. Width is
                tuned so the line breaks once rather than three times. */}
            <h1 className="max-w-[560px] text-m-h2 font-bold leading-[1.2] text-primary-white lg:text-[clamp(38px,3.9vw,56px)]">
              <Cursor />{d.headline}
            </h1>
            <p className="flex flex-wrap items-center gap-2 text-regular-semibold font-bold text-primary-white">
              {project.location}
              <span className="h-1.5 w-1.5 rounded-full bg-primary-white" />
              {project.type}
            </p>
          </div>

          <div className="flex w-full flex-col gap-10 lg:w-[500px]">
            <p className="text-lg-light font-light text-primary-white">{d.intro}</p>
            <div className="flex flex-wrap gap-4">
              <Cta label="Request Interest" variant="rose" href="#enquire" className="whitespace-nowrap" />
              <button
                type="button"
                onClick={openRefer}
                className="group inline-flex h-12 items-center gap-6 whitespace-nowrap rounded-[4px] border-[1.5px] border-primary-white px-[14px] text-regular-normal font-medium uppercase tracking-[0.04em] text-primary-white transition-colors duration-300 hover:bg-primary-white hover:text-primary-black max-sm:flex max-sm:w-full max-sm:justify-between"
              >
                Refer Friends
                <UsersIcon />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionReveal><AboutBand project={project} /></SectionReveal>
      <SectionReveal><LocationBand project={project} /></SectionReveal>
      <SectionReveal><MasterplanBand project={project} /></SectionReveal>
      <SectionReveal><FacilitiesBand project={project} /></SectionReveal>
      <SectionReveal><ProgressBand project={project} /></SectionReveal>
      <SectionReveal><UnitsBand project={project} /></SectionReveal>
      <SectionReveal><GalleryBand project={project} /></SectionReveal>
      <SectionReveal><EnquiryBand project={project} /></SectionReveal>
      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}

/**
 * Overview band — a white card sitting over the project's own photography, with a
 * grid of frosted-glass figures and photo tiles below it, per Figma 542:8305.
 */
function AboutBand({ project }) {
  const d = project.detail

  return (
    <GlassScene
      image={d.overviewImage ?? project.large}
      drift={8}
      scrim="bg-primary-black/45"
      className="overflow-hidden px-4 py-16 lg:px-[60px]"
    >
      <Reveal className="mx-auto w-full max-w-[1392px] rounded-[8px] bg-primary-white p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-20">
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-regular-normal font-medium text-text-secondary-dark">
              <Cursor />{project.name} Overview
            </p>
            <h2 className="max-w-[440px] text-m-h2 font-bold leading-[1.2] text-primary-black lg:text-h3">
              {d.aboutHeading}
            </h2>
          </div>

          <div className="flex flex-1 flex-col items-start gap-8">
            <p className="text-small-light font-light leading-[1.7] text-text-secondary-dark">{d.aboutText}</p>
            <a
              href={d.brochure}
              className="group flex h-[42px] items-center gap-3 rounded-[4px] border border-gray-3 px-4 text-small-normal font-medium uppercase tracking-[0.04em] text-primary-black transition-colors duration-300 hover:border-primary-black hover:bg-primary-black hover:text-primary-white"
            >
              <DownloadIcon />
              Download Brochure
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-3 grid w-full max-w-[1392px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {d.tiles.map((tile, i) => (
          <Reveal key={tile.label ?? tile.image} y={0} delay={(i % 3) * 0.06}>
            <OverviewTile {...tile} />
          </Reveal>
        ))}
      </div>
    </GlassScene>
  )
}

function OverviewTile({ value, label, image }) {
  if (image) {
    return (
      <div className="h-[195px] overflow-hidden rounded-[12px]">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    )
  }
  return (
    <GlassPanel className="h-[195px] rounded-[12px]" contentClassName="flex flex-col justify-between p-5">
      <Counter value={value} className="text-m-h1 font-light leading-none text-primary-white lg:text-h2" />
      <p className="text-regular-normal font-medium text-primary-white">{label}</p>
    </GlassPanel>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path d="M8 2v8M5 7.5L8 10.5l3-3M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LocationBand({ project }) {
  const d = project.detail
  return (
    <section className="bg-primary-white px-4 py-20 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1384px] flex-col gap-10">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-regular-normal font-medium text-rose-120">
              <Cursor />{project.name} Location
            </p>
            <h2 className="max-w-[494px] text-m-h2 font-bold leading-[1.2] text-primary-black lg:text-h3">
              {d.locationHeading}
            </h2>
          </div>

          <a
            href={directionsHref({ project: d.mapQuery })}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-fit shrink-0 items-center gap-3 rounded-[4px] border-[1.5px] border-primary-black bg-primary-white px-4 text-regular-normal font-medium uppercase tracking-[0.04em] text-primary-black transition-colors duration-300 hover:bg-primary-black hover:text-primary-white max-sm:w-full max-sm:justify-center"
          >
            <img src="/assets/Google-Maps-icon.webp" alt="" className="h-5 w-5 shrink-0 object-contain" />
            Open In Google Maps
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <LocationMap
            project={project.name}
            coords={d.coords}
            landmarks={d.landmarks}
            logo={project.logo}
          />
        </Reveal>
      </div>
    </section>
  )
}

function MasterplanBand({ project }) {
  const d = project.detail
  const [tab, setTab] = useState(d.masterplanTabs[0])
  // 'All' keeps every annotation; any other tab narrows to that category.
  const pins = (d.masterplanPins ?? []).filter((pin) => tab === 'All' || pin.category === tab)
  return (
    <section className="bg-primary-offwhite px-4 py-20 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1384px] flex-col gap-10">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-regular-normal font-medium text-rose-120">
              <Cursor />Explore
            </p>
            <h2 className="text-m-h2 font-bold leading-[1.2] text-primary-black lg:text-h3">Site Masterplan</h2>
          </div>
          <Chips items={d.masterplanTabs} value={tab} onChange={setTab} />
        </Reveal>

        <Reveal delay={0.08}>
          <TabTransition id={tab}>
            <Masterplan image={d.masterplan} alt={`${project.name} masterplan — ${tab}`} pins={pins} />
          </TabTransition>
        </Reveal>
      </div>
    </section>
  )
}

function FacilitiesBand({ project }) {
  const d = project.detail
  // Bayside ships {name, icon, image} entries; older projects still pass strings.
  const interactive = typeof d.facilities[0] === 'object'
  const [active, setActive] = useState(0)

  return (
    <section className="bg-primary-white px-4 py-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1392px] flex-col gap-10">
        <Reveal>
          <h2 className="text-m-h2 font-bold text-primary-black lg:text-h3">
            <Cursor />{project.name} Facilities
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
          {interactive ? (
            <>
              {/* Below `lg` the tabs run inline as a compact swipeable rail with
                  hairline dividers; from `lg` they stack beside the image. */}
              <ul className="flex w-full shrink-0 snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:w-[420px] lg:flex-col lg:gap-2 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
                {d.facilities.map((facility, i) => {
                  const isActive = active === i
                  return (
                    <li
                      key={facility.name}
                      className="flex shrink-0 snap-start border-r border-gray-2 last:border-r-0 lg:flex-1 lg:border-r-0"
                    >
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={isActive}
                        className={`flex w-full items-center gap-2 whitespace-nowrap px-4 py-2.5 text-left text-small-light font-light transition-colors duration-300 lg:gap-3 lg:whitespace-normal lg:px-5 lg:py-3.5 lg:text-regular-light ${
                          isActive
                            ? 'bg-primary-offwhite text-primary-black'
                            : 'bg-primary-white text-text-secondary-dark hover:bg-gray-.5'
                        }`}
                      >
                        <img src={facility.icon} alt="" className="h-4 w-4 shrink-0 object-contain lg:h-5 lg:w-5" />
                        {facility.name}
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="relative min-h-[320px] flex-1 overflow-hidden lg:min-h-[430px]">
                <TabTransition id={d.facilities[active].name} className="absolute inset-0">
                  <img
                    src={d.facilities[active].image}
                    alt={d.facilities[active].name}
                    className="h-full w-full object-cover"
                  />
                </TabTransition>
                {/* Warm the cache so a first visit to a tab never flashes */}
                <div className="hidden" aria-hidden>
                  {d.facilities.map((facility) => (
                    <img key={facility.name} src={facility.image} alt="" />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <ul className="flex w-full flex-col gap-2 lg:w-[420px]">
                {d.facilities.map((f) => (
                  <li key={f} className="flex items-center gap-3 bg-primary-offwhite px-5 py-3.5 text-regular-light font-light text-text-secondary-dark">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-120" />
                    {f}
                  </li>
                ))}
              </ul>
              <ParallaxImage src={d.facilitiesImage} alt="" className="min-h-[320px] flex-1" strength={34} />
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function ProgressBand({ project }) {
  const d = project.detail
  return (
    <section className="overflow-hidden bg-primary-rose px-4 py-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1392px] flex-col gap-10">
        <Reveal className="flex flex-col gap-2">
          <p className="text-regular-semibold font-bold text-primary-black">
            {project.name} Milestones
          </p>
          <h2 className="text-m-h2 font-bold text-primary-black lg:text-h3">Construction Progress</h2>
          <p className="text-small-light font-light text-text-secondary-dark">
            Follow the development of this landmark project
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ProgressTimeline items={d.progress} />
        </Reveal>
      </div>
    </section>
  )
}

function UnitsBand({ project }) {
  const d = project.detail
  return (
    <section className="bg-gray-1 px-4 py-20 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1392px] flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
        {/* Sticky rail: holds the middle of the viewport while the units scroll by */}
        <Reveal className="lg:sticky lg:top-0 lg:h-screen lg:w-[520px] lg:shrink-0">
          <div className="flex flex-col gap-6 lg:h-full lg:justify-center">
            <p className="text-regular-normal font-medium text-rose-120">
              <Cursor />Unit Types
            </p>
            <h2 className="text-m-h1 font-bold leading-[1.2] text-primary-black lg:text-h2">
              Spaces Crafted For Every Way Of Living
            </h2>
            <p className="text-regular-light font-light text-text-secondary-dark">
              Every residence is thoughtfully designed with refined layouts, premium finishes, and
              carefully considered details that elevate everyday living.
            </p>
            <Cta label="Download Brochure" variant="rose" href={d.brochure ?? '#enquire'} className="w-fit" />
          </div>
        </Reveal>

        {/* Padded top and bottom so the first and last unit meet the rail centred */}
        <div className="flex flex-1 flex-col gap-4 lg:py-[30vh]">
          {d.units.map((unit, i) => (
            <Reveal key={unit.name} delay={i * 0.06}>
              <article className="flex flex-col overflow-hidden bg-primary-white sm:h-[248px] sm:flex-row">
                <img src={unit.image} alt="" className="h-[200px] w-full shrink-0 object-cover sm:h-auto sm:w-[213px]" />
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <h3 className="text-m-h4 font-bold text-primary-black lg:text-h4">{unit.name}</h3>
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {unit.specs.map((spec) => (
                      <li key={spec.label} className="flex items-center gap-2 text-regular-light font-light text-text-secondary-dark">
                        <SpecIcon name={spec.icon} />
                        {spec.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryBand({ project }) {
  const d = project.detail
  return (
    <section className="flex flex-col gap-10 bg-primary-black py-20">
      <Reveal className="px-4 lg:px-[60px]">
        <h2 className="text-center text-m-h2 font-bold text-primary-white lg:text-h3">
          <Cursor />{project.name} Gallery
        </h2>
      </Reveal>

      <div className="px-4 lg:px-[60px]">
        <Gallery images={d.gallery} />
      </div>
    </section>
  )
}

function EnquiryBand({ project }) {
  const d = project.detail
  return (
    <section id="enquire" className="flex flex-col bg-primary-white lg:flex-row">
      <Reveal className="flex flex-col gap-8 px-4 py-20 lg:w-[46%] lg:px-[60px]">
        <div className="flex flex-col gap-2">
          <p className="text-regular-normal font-medium text-rose-120">
            <Cursor />Get in Touch
          </p>
          <h2 className="text-m-h1 font-bold text-primary-black lg:text-h2">Begin Your Journey</h2>
        </div>

        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Enter Your First Name" name="first" autoComplete="given-name" />
            <Field label="Enter Your Last Name" name="last" autoComplete="family-name" />
          </div>
          <Field label="Enter Your Email Address" name="email" type="email" autoComplete="email" />
          <Field label="Enter Your Phone Number" name="phone" type="tel" autoComplete="tel" />
          <Field as="select" label="Choose Unit Type" name="unit" options={d.units.map((u) => u.name)} />
          <Field as="textarea" label="Enter Your Message" name="message" />

          <button
            type="submit"
            className="group mt-2 flex h-[58px] w-full items-center justify-between rounded-[4px] bg-primary-rose px-6 text-regular-normal font-medium uppercase tracking-[0.04em] text-primary-black transition-colors duration-300 hover:bg-rose-120 hover:text-primary-white"
          >
            Submit Your Interest
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-small-light font-light text-text-secondary-dark">
            By submitting, you agree to our <a href="/#terms" className="underline">Terms &amp; Conditions.</a>
          </p>
        </form>
      </Reveal>

      {/* Deep drift — this band is tall, so the image has room to travel */}
      <ParallaxImage
        src={d.formImage}
        strength={140}
        className="h-[320px] w-full lg:h-auto lg:flex-1"
      />
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-primary-black">
      <path d="M7 4.5l9 5.5-9 5.5z" />
    </svg>
  )
}
function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="6" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.8 13.4c0-2.3 1.9-3.6 4.2-3.6s4.2 1.3 4.2 3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 3.1a2.4 2.4 0 0 1 0 4.4M12.2 10.2c1.4.4 2.4 1.4 2.4 3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
