// Location + contract type, shown under a role title on both careers pages.
export function JobMeta({ job, className = '' }) {
  return (
    <p className={`flex flex-wrap items-center gap-5 text-small-light font-light text-text-secondary-dark ${className}`}>
      <span className="flex items-center gap-2">
        <PinIcon />
        {job.location}
      </span>
      <span className="flex items-center gap-2">
        <ClockIcon />
        {job.type}
      </span>
    </p>
  )
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0 text-primary-black">
      <path d="M10 18s5.5-4.9 5.5-9.2A5.5 5.5 0 1 0 4.5 8.8C4.5 13.1 10 18 10 18z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="10" cy="8.6" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0 text-primary-black">
      <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 6v4.3l2.8 1.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
