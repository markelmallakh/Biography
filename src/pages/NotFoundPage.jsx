import Cta from '../components/ui/Cta.jsx'
import Cursor from '../components/ui/Cursor.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'

export default function NotFoundPage() {
  return (
    <main>
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-primary-rose px-4 pt-[140px] text-center lg:px-[60px]">
        <p className="text-regular-normal font-medium text-text-secondary-dark">
          <Cursor />404
        </p>
        <h1 className="max-w-[720px] text-m-h1 font-light leading-[1.05] text-primary-black lg:text-h1">
          This page isn’t part of the story yet
        </h1>
        <p className="max-w-[480px] text-lg-light font-light text-text-secondary-dark">
          The page you were looking for has moved or never existed. Let’s get you back somewhere useful.
        </p>
        <Cta label="Back Home" variant="outline" href="/" className="mt-2" />
      </section>

      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}
