import AboutHero from '../components/about/AboutHero.jsx'
import WhoWeAreSection from '../components/about/WhoWeAreSection.jsx'
import VisionSection from '../components/about/VisionSection.jsx'
import MissionSection from '../components/about/MissionSection.jsx'
import ChairmanSection from '../components/about/ChairmanSection.jsx'
import TeamSection from '../components/about/TeamSection.jsx'
import PartnersSection from '../components/PartnersSection.jsx'
import GetInTouchSection from '../components/GetInTouchSection.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <SectionReveal><WhoWeAreSection /></SectionReveal>
      <SectionReveal><VisionSection /></SectionReveal>
      <SectionReveal><MissionSection /></SectionReveal>
      <SectionReveal><ChairmanSection /></SectionReveal>
      <SectionReveal><PartnersSection /></SectionReveal>
      <SectionReveal><TeamSection /></SectionReveal>
      <SectionReveal><GetInTouchSection /></SectionReveal>
      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}
