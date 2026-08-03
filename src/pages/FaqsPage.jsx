import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import Chips from '../components/ui/Chips.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import TabTransition from '../components/ui/TabTransition.jsx'
import GetInTouchSection from '../components/GetInTouchSection.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { faqCategories, faqs } from '../data/faqs.js'

export default function FaqsPage() {
  const [filter, setFilter] = useState('ALL')
  const visible = filter === 'ALL' ? faqs : faqs.filter((f) => f.category === filter)

  return (
    <main id="faqs">
      <section className="flex flex-col items-center gap-6 bg-primary-rose px-4 pb-14 pt-[140px] lg:px-[60px]">
        <Reveal>
          <h1 className="text-center text-m-h1 font-bold text-primary-black lg:text-h2">
            Frequently Asked Questions
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <Chips items={faqCategories} value={filter} onChange={setFilter} className="justify-center" />
        </Reveal>
      </section>

      <section className="bg-primary-offwhite px-4 py-16 lg:px-[60px]">
        <Reveal className="mx-auto w-full max-w-[1000px] bg-primary-white px-6 py-2 lg:px-10">
          <TabTransition id={filter}>
            {visible.length > 0 ? (
              <Accordion items={visible} tone="light" />
            ) : (
              <p className="py-16 text-center text-regular-light font-light text-text-secondary-dark">
                Nothing under {filter} yet.
              </p>
            )}
          </TabTransition>
        </Reveal>
      </section>

      <SectionReveal><GetInTouchSection /></SectionReveal>
      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}
