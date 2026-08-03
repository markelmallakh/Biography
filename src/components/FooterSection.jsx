import Cursor from './ui/Cursor.jsx'
import AttalBadge from './AttalBadge.jsx'
import { projects, projectHref } from '../data/projects.js'
import { withBase } from '../lib/paths.js'

const columns = [
  {
    title: '_Biography',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Media Center', href: '/media' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Projects',
    links: projects.map((p) => ({ label: p.name, href: projectHref(p.slug) })),
  },
]

export default function FooterSection() {
  return (
    <footer className="flex flex-col items-center gap-10 overflow-hidden bg-primary-black px-4 pt-20 lg:px-16">
      <div className="flex w-full max-w-[1392px] flex-col gap-[42px]">
        {/* Links + newsletter */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          {/* Link columns */}
          {/* Phones stack the columns and tighten the rhythm; they sit side by side from `sm` */}
          <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-x-[76px] sm:gap-y-10">
            {columns.map((col) => (
              <div key={col.title} className="flex w-full flex-col gap-3 sm:w-[106px] sm:gap-4">
                <p className="text-lg-light font-light text-primary-rose">
                  {col.title.startsWith('_') ? (<><Cursor />{col.title.slice(1)}</>) : col.title}
                </p>
                <ul className="flex flex-col gap-2.5 text-lg-normal font-medium text-primary-white sm:gap-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={withBase(l.href)} className="transition-colors hover:text-primary-rose">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-lg-light font-light text-primary-rose">Support</p>
              <div className="flex flex-col gap-2.5 text-lg-normal font-medium text-primary-white sm:gap-4">
                <a href={withBase('/contact')} className="transition-colors hover:text-primary-rose">Contact Us</a>
                <a href={withBase('/faqs')} className="transition-colors hover:text-primary-rose">FAQs</a>
                <a href="mailto:info@biography.com" className="flex items-center gap-1.5 transition-colors hover:text-primary-rose">
                  <MailIcon /> info@biography.com
                </a>
                <a href="tel:19431" className="flex items-center gap-1.5 transition-colors hover:text-primary-rose">
                  <PhoneIcon /> 19431
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex w-full flex-col gap-5 lg:w-[539px]">
            <div className="flex w-full flex-col gap-3 rounded-[4px] bg-primary-rose p-6">
              <h3 className="text-h5 font-bold leading-[1.4] text-primary-black">
                <Cursor />Stay Informed With News &amp; Updates
              </h3>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2 rounded-[6px] bg-rose-70 py-1.5 pl-3 pr-1.5">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="min-w-0 flex-1 bg-transparent text-regular-normal font-medium text-primary-black placeholder:text-primary-black/70 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group flex h-[38px] shrink-0 items-center gap-4 rounded-[4px] bg-white p-3 text-small-normal font-medium text-primary-black transition-colors duration-300 hover:bg-primary-black hover:text-primary-white"
                  >
                    Subscribe
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <p className="text-tiny-light font-light text-primary-black">
                  We respect your privacy and only send updates you've requested.
                </p>
              </form>
            </div>

            {/* Legal links and socials share one line, right-aligned under the newsletter */}
            <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4 lg:justify-end">
              <div className="flex gap-6 text-small-light font-light text-primary-greysh">
                <a href="#" className="underline transition-colors hover:text-primary-white">Privacy policy</a>
                <a href="#" className="underline transition-colors hover:text-primary-white">Terms of service</a>
              </div>

              <div className="flex gap-3 text-primary-greysh">
                {socials.map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="transition-colors hover:text-primary-white">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/15" />

        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2 text-tiny-light font-light">
            <p className="text-primary-greysh">© 2026 Biography. All rights reserved.</p>
            <p className="text-gray-dark-6">WEB DESIGN &amp; DEVELOPMENT BY MITCHDESIGNS</p>
          </div>
          {/* Pulled up by the column gap so the badge sits flush against the divider above */}
          <AttalBadge className="-mt-[42px] shrink-0 self-start" />
        </div>
      </div>

      {/* Oversized watermark — B aligned to the content's left edge, bleeding off the right, bottom clipped */}
      <div className="mx-auto mt-6 h-[clamp(100px,15vw,220px)] w-full max-w-[1392px] overflow-hidden">
        <img
          src="/assets/Biography-logo.svg"
          alt="Biography"
          className="logo-white w-[125%] max-w-none -translate-x-[9.5%] opacity-[0.12]"
        />
      </div>
    </footer>
  )
}

const socials = [
  { label: 'Facebook', icon: <Brand path="M13.5 8.5h2l.5-2.5h-2.5V4.7c0-.7.3-1.2 1.3-1.2H16V1.3C15.6 1.2 14.7 1 13.8 1c-1.9 0-3.3 1.2-3.3 3.3V6H8.3v2.5h2.2V15h3V8.5z" /> },
  { label: 'Instagram', icon: <Brand path="M8 2.4c1.8 0 2 0 2.7.05 1.8.08 2.7 1 2.8 2.8.03.7.04.9.04 2.7s0 2-.04 2.7c-.1 1.8-1 2.7-2.8 2.8-.7.05-.9.05-2.7.05s-2 0-2.7-.05c-1.8-.1-2.7-1-2.8-2.8C2.4 10 2.4 9.8 2.4 8s0-2 .05-2.7c.08-1.8 1-2.7 2.8-2.8C5.95 2.4 6.2 2.4 8 2.4zM8 1C6.2 1 5.9 1 5.2 1.05 2.8 1.16 1.46 2.5 1.35 4.9 1.3 5.6 1.3 5.9 1.3 8s0 2.4.05 3.1c.1 2.4 1.45 3.7 3.85 3.85C5.9 15 6.2 15 8 15s2.1 0 2.8-.05c2.4-.1 3.7-1.45 3.85-3.85C14.7 10.4 14.7 10.1 14.7 8s0-2.4-.05-3.1C14.54 2.5 13.2 1.16 10.8 1.05 10.1 1 9.8 1 8 1zm0 3.4A3.6 3.6 0 1 0 8 11.6 3.6 3.6 0 0 0 8 4.4zm0 5.9A2.3 2.3 0 1 1 8 5.7a2.3 2.3 0 0 1 0 4.6zm3.7-6a.84.84 0 1 0 0 1.7.84.84 0 0 0 0-1.7z" /> },
  { label: 'X', icon: <Brand path="M9.5 7l4-5h-1.3L8.9 6.1 6.3 2H2.5l4.2 6-4.2 5h1.3l3.6-4.3L11 13h3.8L9.5 7zm-1.3 1.5l-.4-.6L4.2 3h1.6l2.7 3.9.4.6 3.5 5h-1.6L8.2 8.5z" /> },
  { label: 'LinkedIn', icon: <Brand path="M5 3.5A1.5 1.5 0 1 1 2 3.5a1.5 1.5 0 0 1 3 0zM2.3 6h2.4v8H2.3V6zm4 0h2.3v1.1h.03c.32-.6 1.1-1.3 2.3-1.3 2.5 0 2.9 1.6 2.9 3.7V14h-2.4v-3.6c0-.85 0-2-1.2-2s-1.4 1-1.4 1.9V14H6.3V6z" /> },
  { label: 'Youtube', icon: <Brand path="M15.3 5.1c-.18-.7-.7-1.2-1.4-1.4C12.7 3.4 8 3.4 8 3.4s-4.7 0-5.9.3c-.7.2-1.2.7-1.4 1.4C.4 6.3.4 8 .4 8s0 1.7.3 2.9c.18.7.7 1.2 1.4 1.4 1.2.3 5.9.3 5.9.3s4.7 0 5.9-.3c.7-.2 1.2-.7 1.4-1.4.3-1.2.3-2.9.3-2.9s0-1.7-.3-2.9zM6.5 10.3V5.7L10.4 8l-3.9 2.3z" /> },
]

function Brand({ path }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
      <path d={path} />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="5" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
      <path d="M7.5 9.8a8 8 0 0 0 4.7 4.7l1.4-1.8 2.9.9V16a1.5 1.5 0 0 1-1.6 1.5A13 13 0 0 1 4.5 6.6 1.5 1.5 0 0 1 6 5h2.4l.9 2.9-1.8 1.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
