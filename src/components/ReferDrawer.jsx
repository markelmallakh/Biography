import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import Field from './ui/Field.jsx'
import Cursor from './ui/Cursor.jsx'

const ReferContext = createContext(() => {})

/** `const openRefer = useRefer()` — call it from any button to slide the drawer in. */
export const useRefer = () => useContext(ReferContext)

const unitTypes = ['Chalet', 'Townhouse', 'Twin House', 'Standalone Villa', 'Apartment']

export function ReferProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openRefer = useCallback(() => setOpen(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('lenis-stopped')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('lenis-stopped')
    }
  }, [open])

  return (
    <ReferContext.Provider value={openRefer}>
      {children}
      <AnimatePresence>
        {open && <Drawer onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </ReferContext.Provider>
  )
}

/** Below `sm` the drawer becomes a bottom sheet, so the motion has to flip axis. */
function useIsMobile() {
  const query = '(max-width: 639px)'
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return mobile
}

const CloseIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

function Drawer({ onClose }) {
  const mobile = useIsMobile()
  const dragControls = useDragControls()

  // Bottom sheet on phones, side drawer from `sm` up.
  const motionProps = mobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[70] flex justify-end max-sm:items-end">
      <motion.div
        className="absolute inset-0 bg-primary-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="refer-title"
        {...motionProps}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        drag={mobile ? 'y' : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose()
        }}
        className="relative flex w-full flex-col bg-primary-white max-sm:h-[88svh] max-sm:rounded-t-[20px] sm:h-full sm:max-w-[712px]"
      >
        {/* Close tab, hung off the drawer's leading edge — side drawer only */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-full top-14 hidden h-[42px] w-[42px] place-items-center bg-primary-black text-white transition-colors duration-300 hover:bg-primary-rose hover:text-primary-black sm:grid"
        >
          <CloseIcon />
        </button>

        {/* Sheet header: drag handle + close, phones only */}
        <div className="relative shrink-0 sm:hidden">
          <div
            role="presentation"
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab px-4 pb-2 pt-3 active:cursor-grabbing"
            style={{ touchAction: 'none' }}
          >
            <span aria-hidden className="mx-auto block h-1 w-10 rounded-full bg-gray-3" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-2 grid h-9 w-9 place-items-center rounded-full bg-gray-.5 text-primary-black transition-colors duration-300 hover:bg-primary-black hover:text-primary-white"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-10 pt-4 sm:px-8 sm:py-14 lg:px-16">
          <p className="text-lg-light font-light text-rose-120">
            <Cursor />Share A Place Worth Discovering
          </p>
          <h2 id="refer-title" className="mt-2 text-m-h1 font-bold text-primary-black lg:text-h2">
            Refer a Friend
          </h2>

          <form className="mt-12 flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-4 text-h5 font-bold text-primary-black">Add Your Referral Info</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                <Field label="Enter First Name" name="referral-first" autoComplete="off" />
                <Field label="Enter Last Name" name="referral-last" autoComplete="off" />
              </div>
              <Field label="Enter Phone Number" name="referral-phone" type="tel" autoComplete="off" />
              <Field as="select" label="Choose Unit Type" name="unit-type" options={unitTypes} />
            </fieldset>

            <div className="h-px w-full bg-gray-2" />

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-4 text-h5 font-bold text-primary-black">Add Your Personal Info</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                <Field label="Enter Your First Name" name="first" autoComplete="given-name" />
                <Field label="Enter Your Last Name" name="last" autoComplete="family-name" />
              </div>
              <Field label="Enter Your Email Address" name="email" type="email" autoComplete="email" />
              <Field label="Enter Your Phone Number" name="phone" type="tel" autoComplete="tel" />
            </fieldset>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="group flex h-[58px] w-full items-center justify-between rounded-[4px] bg-primary-rose px-6 text-lg-normal font-medium uppercase tracking-[0.04em] text-primary-black transition-colors duration-300 hover:bg-rose-120 hover:text-primary-white"
              >
                Refer Friend Now
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-small-light font-light text-text-secondary-dark">
                By submitting, you agree to our{' '}
                <a href="/#terms" className="underline">Terms &amp; Conditions.</a>
              </p>
            </div>
          </form>
        </div>
      </motion.aside>
    </div>
  )
}
