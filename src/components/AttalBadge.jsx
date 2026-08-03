// "Subsidiary of ATTAL" mark — sits in the footer's bottom bar.
export default function AttalBadge({ className = '' }) {
  return (
    <a
      href="https://www.elattal.com/home"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Subsidiary of ATTAL — visit elattal.com"
      className={`flex w-[64px] flex-col items-stretch gap-1.5 bg-black p-2 transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <span className="whitespace-nowrap text-center text-[6px] font-semibold uppercase tracking-[0.14em] text-white/80">
        Subsidiary of
      </span>
      <img src="/assets/attal-logo.png" alt="ATTAL" className="block h-auto w-full" />
    </a>
  )
}
