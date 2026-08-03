import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { headerLinks, navLinks, contactPhone } from '../data/navLinks.js'
import Cta from './ui/Cta.jsx'
import { withBase } from '../lib/paths.js'

const logo = '/assets/Biography-logo.svg'

// Rows of the mobile menu, lifted in behind the unrolling panel.
const menuRow = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * Full-width glass header. Over the hero it is barely-there frosted glass; once the
 * page scrolls onto the light sections it darkens so the white type stays readable.
 */
export default function SiteHeader({ currentPage = 'HOME', overHero = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Only pages with a dark full-bleed hero can afford the barely-there state;
  // everywhere else the bar keeps its tint so the white type stays legible.
  const tinted = scrolled || !overHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The open menu owns the screen: hold the page still behind the scrim.
  useEffect(() => {
    if (!open) return undefined
    document.documentElement.classList.add('lenis-stopped')
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [open])

  return (
    <>
    {/* Scrim between the open menu and the page. A sibling of the header rather
        than a child: the header's backdrop-filter makes it the containing block
        for fixed descendants, which would pin inset-0 to the bar instead of the
        viewport. z-40 keeps it under the z-50 bar and its drop-down. */}
    <AnimatePresence>
      {open && (
        <motion.div
          aria-hidden
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-primary-black/70 lg:hidden"
        />
      )}
    </AnimatePresence>

    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        tinted ? 'border-white/25 bg-primary-black/60' : 'border-white/50 bg-white/[0.06]'
      }`}
      style={{
        // Heavier blur + saturation when tinted, so the bar reads as frosted glass
        // rather than a solid slab while keeping the white type legible.
        backdropFilter: tinted ? 'blur(28px) saturate(150%)' : 'blur(17px)',
        WebkitBackdropFilter: tinted ? 'blur(28px) saturate(150%)' : 'blur(17px)',
      }}
    >
      <div className="flex items-center justify-between gap-8 px-4 py-3 lg:px-[60px]">
        <a href={withBase('/')} aria-label="Biography — home" className="shrink-0">
          <img src={logo} alt="Biography" className="logo-white h-8 w-auto lg:h-9" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-[44px] lg:flex">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={withBase(link.href)}
              aria-current={link.label === currentPage ? 'page' : undefined}
              className="group relative text-regular-normal font-medium uppercase tracking-[0.02em] text-white"
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-primary-rose transition-all duration-300 ${
                  link.label === currentPage ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <a
            href={`tel:${contactPhone}`}
            className="hidden items-center gap-1 text-lg-normal font-medium text-white transition-colors hover:text-primary-rose sm:flex"
          >
            <PhoneIcon />
            {contactPhone}
          </a>
          <Cta variant="white" size="small" label="Let’s Talk" href="/contact" className="hidden w-[134px] sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center text-white lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down — the panel unrolls on a soft ease-out while its rows
          rise in behind it, so the motion reads as one gesture rather than a
          box snapping open. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, ease: 'easeOut' },
            }}
            className="overflow-hidden border-t border-white/15 bg-primary-black/90 lg:hidden"
          >
            <motion.ul
              className="flex flex-col gap-7 px-4 pb-10 pt-8"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.li key={link.label} variants={menuRow}>
                  <a
                    href={withBase(link.href)}
                    onClick={() => setOpen(false)}
                    className="text-[26px] font-light text-white transition-colors hover:text-primary-rose"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

              {/* Hotline — the header hides it below `sm`, so the menu carries it */}
              <motion.li variants={menuRow} className="pt-1">
                <a
                  href={`tel:${contactPhone}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-[22px] font-medium text-primary-rose transition-colors hover:text-white"
                >
                  <PhoneIcon />
                  {contactPhone}
                </a>
              </motion.li>

              <motion.li variants={menuRow}>
                <Cta variant="rose" label="Let’s Talk" href="/contact" className="w-full" onClick={() => setOpen(false)} />
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M8.4 10.8a8 8 0 0 0 4.8 4.8l1.5-1.9 3 .9V18a1.5 1.5 0 0 1-1.6 1.5A13.5 13.5 0 0 1 4.5 6.1 1.5 1.5 0 0 1 6 4.5h3.4l.9 3-1.9 1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <path d="M11.667 5.833H23.334" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4.667 14H23.334" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4.667 22.167H16.334" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
