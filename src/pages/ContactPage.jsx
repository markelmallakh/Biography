import Reveal from '../components/Reveal.jsx'
import Cursor from '../components/ui/Cursor.jsx'
import Field from '../components/ui/Field.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { projects } from '../data/projects.js'
import { contactPhone } from '../data/navLinks.js'
import { withBase } from '../lib/paths.js'

const offices = [
  {
    name: 'Salah Salem Headoffice',
    address: 'Salah Salem, B 61 El-Orouba, Almazah, Heliopolis, Cairo Governorate',
    image: '/assets/About-images/attal-holding-building.webp',
    map: 'https://maps.google.com/?q=Salah+Salem+El-Orouba+Almazah+Heliopolis+Cairo',
  },
  {
    name: 'New Cairo Office',
    address: '153, North Teseen Street, New Cairo, Cairo',
    map: 'https://maps.google.com/?q=North+Teseen+Street+New+Cairo',
  },
]

export default function ContactPage() {
  return (
    <main>
      <section id="contact" className="bg-primary-rose px-4 pb-16 pt-[120px] lg:px-[60px]">
        <Reveal className="mx-auto flex w-full max-w-[1392px] flex-col overflow-hidden bg-primary-white lg:flex-row">
          <img
            src="/assets/about-3.png"
            alt=""
            className="h-[280px] w-full object-cover lg:h-auto lg:w-[46%]"
          />

          <div className="flex flex-1 flex-col gap-8 p-8 lg:p-12">
            <div className="flex flex-col gap-2">
              <p className="text-regular-normal font-medium text-text-secondary-dark">
                <Cursor />Get in Touch
              </p>
              <h1 className="text-m-h1 font-bold text-primary-black lg:text-h2">Contact Us</h1>
            </div>

            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-2 sm:grid-cols-2">
                <Field label="Enter Your First Name" name="first" autoComplete="given-name" />
                <Field label="Enter Your Last Name" name="last" autoComplete="family-name" />
              </div>
              <Field label="Enter Your Email Address" name="email" type="email" autoComplete="email" />
              <Field label="Enter Your Phone Number" name="phone" type="tel" autoComplete="tel" />
              <Field as="select" label="Choose Project" name="project" options={projects.map((p) => p.name)} />
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
                By submitting, you agree to our{' '}
                <a href={withBase('/#terms')} className="underline">Terms &amp; Conditions.</a>
              </p>
            </form>
          </div>
        </Reveal>
      </section>

      <SectionReveal>
        <FindSection />
      </SectionReveal>

      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}

function FindSection() {
  return (
    <section className="bg-primary-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col gap-8 px-4 py-16 lg:w-[38%] lg:px-[60px] lg:py-20">
          <h2 className="text-m-h1 font-bold text-primary-black lg:text-h2">
            <Cursor />Find Biography
          </h2>

          <ul className="flex flex-col gap-6 text-regular-light font-light text-text-secondary-dark">
            <li>
              <a href="mailto:info@biography.com" className="flex items-center gap-3 transition-colors hover:text-primary-black">
                <MailIcon /> info@biography.com
              </a>
            </li>
            <li>
              <a href={`tel:${contactPhone}`} className="flex items-center gap-3 transition-colors hover:text-primary-black">
                <PhoneIcon /> {contactPhone}
              </a>
            </li>
            {offices.map((office) => (
              <li key={office.name} className="flex gap-3">
                <PinIcon />
                <div className="flex flex-col gap-2">
                  <p>{office.address}</p>
                  <a
                    href={office.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-2 text-small-normal font-medium text-primary-black transition-colors hover:text-rose-120"
                  >
                    Get Direction
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[420px] flex-1 bg-gray-1 lg:min-h-[620px]">
          {/* Static map placeholder — swap for an embedded map once a key is available */}
          <img
            src="/assets/About-images/about-hero-05.webp"
            alt="Map of Biography's offices in Cairo"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />

          <div className="absolute left-1/2 top-1/2 flex w-[min(320px,80%)] -translate-x-1/2 -translate-y-1/2 gap-4 bg-primary-white p-3 shadow-[0_18px_50px_rgba(51,49,50,0.22)] lg:left-auto lg:right-10 lg:translate-x-0">
            <img src={offices[0].image} alt="" className="h-[70px] w-[70px] shrink-0 object-cover" />
            <div className="flex flex-col gap-1">
              <p className="text-regular-semibold font-bold text-primary-black">{offices[0].name}</p>
              <p className="text-tiny-light font-light text-text-secondary-dark">{offices[0].address}</p>
              <a
                href={offices[0].map}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1.5 text-tiny-normal font-medium text-primary-black transition-colors hover:text-rose-120"
              >
                Get Direction
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 text-primary-black">
      <rect x="3" y="5" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 text-primary-black">
      <path d="M7.5 9.8a8 8 0 0 0 4.7 4.7l1.4-1.8 2.9.9V16a1.5 1.5 0 0 1-1.6 1.5A13 13 0 0 1 4.5 6.6 1.5 1.5 0 0 1 6 5h2.4l.9 2.9-1.8 1.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mt-0.5 shrink-0 text-primary-black">
      <path d="M11 20s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="11" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
