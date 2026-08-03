import HeroSection from '../components/HeroSection.jsx'
import StatsSection from '../components/StatsSection.jsx'
import PortfolioSection from '../components/PortfolioSection.jsx'
import PartnersSection from '../components/PartnersSection.jsx'
import BlogSection from '../components/BlogSection.jsx'
import FaqSection from '../components/FaqSection.jsx'
import GetInTouchSection from '../components/GetInTouchSection.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SectionReveal><StatsSection /></SectionReveal>
      <SectionReveal><PortfolioSection /></SectionReveal>
      <SectionReveal><PartnersSection /></SectionReveal>
      <SectionReveal><BlogSection /></SectionReveal>
      <SectionReveal><FaqSection /></SectionReveal>
      <SectionReveal><GetInTouchSection /></SectionReveal>
      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}
