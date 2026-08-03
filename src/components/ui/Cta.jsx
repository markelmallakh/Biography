// Unified CTA button — matches the Figma button component and its hover states.
// Hover = color swap (Figma): rose→white, white→black, outline→black fill, outlineWhite→white fill.

const sizes = {
  small: 'h-[38px] gap-4 px-3 text-small-normal',
  medium: 'h-12 gap-6 px-[14px] text-regular-normal',
  large: 'h-[58px] gap-8 px-6 text-lg-normal',
}

const variants = {
  rose: 'bg-primary-rose text-primary-black hover:bg-rose-120 hover:text-primary-white',
  white: 'bg-white text-primary-black hover:bg-primary-black hover:text-primary-white',
  dark: 'bg-primary-black text-primary-white hover:bg-primary-rose hover:text-primary-black',
  outline: 'border-[1.5px] border-primary-black text-primary-black hover:bg-primary-black hover:text-primary-white',
  outlineWhite: 'border-[1.5px] border-primary-white text-primary-white hover:bg-primary-white hover:text-primary-black',
}

const ArrowSvg = ({ s, className }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" className={`col-start-1 row-start-1 ${className}`}>
    <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// On hover: the visible arrow scales down + slides out, an identical one scales up + slides in.
function Arrow({ size }) {
  const s = size === 'large' ? 20 : 16
  return (
    <span className="relative grid shrink-0 place-items-center overflow-hidden" style={{ width: s, height: s }}>
      <ArrowSvg s={s} className="transition-all duration-300 ease-linear group-hover:translate-x-[120%] group-hover:scale-50 group-hover:opacity-0" />
      <ArrowSvg s={s} className="-translate-x-[120%] scale-50 opacity-0 transition-all duration-300 ease-linear group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
    </span>
  )
}

// Below `sm` a CTA always spans the column it sits in, so the mobile layout reads
// as a stack of full-width actions inside the 16px page gutter. The `max-sm:`
// variant outranks any `w-fit` / fixed width passed in through className.
export default function Cta({ label, href = '#', variant = 'rose', size = 'medium', className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`group inline-flex max-sm:w-full items-center justify-between rounded-[4px] font-medium uppercase tracking-[0.04em] transition-colors duration-300 ease-out ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{label}</span>
      <Arrow size={size} />
    </a>
  )
}
