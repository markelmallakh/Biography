import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Cursor from '../components/ui/Cursor.jsx'
import Coverflow from '../components/about/Coverflow.jsx'
import { StackCard } from '../components/PortfolioSection.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { projects, projectHref } from '../data/projects.js'

export default function ProjectsPage() {
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <main id="projects">
      <section className="relative overflow-hidden bg-primary-rose pb-4 pt-[140px]">
        <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center lg:px-[60px]">
          <Reveal className="flex flex-col items-center gap-2">
            <p className="text-regular-normal font-medium text-text-secondary-dark">
              <Cursor />Our Projects
            </p>
            <h1 className="max-w-[796px] text-[clamp(44px,6.6vw,92px)] font-light leading-[1.05] text-primary-black">
              We Craft Spaces
              <br />
              Where Life Unfolds
            </h1>
          </Reveal>
        </div>

        <Coverflow
          images={projects.map((p) => ({ src: p.large, logo: p.logo, name: p.name, href: projectHref(p.slug) }))}
          className="mt-[-5.95%]"
        />
      </section>

      <section className="bg-primary-white px-4 py-20 lg:px-[60px]">
        <div ref={stackRef} className="mx-auto max-w-[1392px]">
          {projects.map((p, i) => (
            <StackCard key={p.slug} card={p} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </section>

      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}
