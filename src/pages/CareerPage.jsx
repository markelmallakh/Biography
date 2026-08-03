import Reveal from '../components/Reveal.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { JobMeta } from '../components/JobMeta.jsx'
import { withBase } from '../lib/paths.js'

export default function CareerPage({ job }) {
  return (
    <main>
      <section className="bg-primary-offwhite px-4 pb-20 pt-[130px] lg:px-[60px]">
        <Reveal className="mx-auto w-full max-w-[800px] bg-primary-white p-8 lg:p-12">
          <a
            href={withBase('/careers')}
            className="group flex w-fit items-center gap-2 text-small-normal font-medium uppercase tracking-[0.06em] text-text-secondary-dark transition-colors hover:text-primary-black"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M13 8H4M8 4L4 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back To Careers
          </a>

          <h1 className="mt-6 text-m-h1 font-bold leading-[1.2] text-primary-black lg:text-h3">{job.title}</h1>
          <JobMeta job={job} className="mt-3" />

          <Block title="About this Role">
            <p className="text-small-light font-light leading-[1.7] text-text-secondary-dark">{job.about}</p>
          </Block>

          <Block title="Key Responsibilities">
            <BulletList items={job.requirements} />
          </Block>

          <Block title="Benefits & Privileges">
            <BulletList items={job.benefits} />
          </Block>

          <a
            href={withBase('/contact')}
            className="group mt-10 flex h-[42px] w-fit items-center justify-between gap-8 rounded-[4px] bg-primary-rose px-4 text-small-normal font-medium uppercase tracking-[0.04em] text-primary-black transition-colors duration-300 hover:bg-rose-120 hover:text-primary-white"
          >
            Apply Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </section>

      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}

function Block({ title, children }) {
  return (
    <section className="mt-10 flex flex-col gap-4">
      <h2 className="text-h6 font-bold text-primary-black">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-small-light font-light leading-[1.6] text-text-secondary-dark">
          <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-text-secondary-dark" />
          {item}
        </li>
      ))}
    </ul>
  )
}
