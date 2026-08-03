// Unit-spec icons for the project page's unit-type cards.
const PATHS = {
  area: 'M3 3h5M3 3v5M17 17h-5M17 17v-5M3 3l6 6M17 17l-6-6',
  bed: 'M2.5 14v-3.5A1.5 1.5 0 0 1 4 9h12a1.5 1.5 0 0 1 1.5 1.5V14M2.5 14v2M17.5 14v2M2.5 12.5h15M5 9V6.5A1.5 1.5 0 0 1 6.5 5h7A1.5 1.5 0 0 1 15 6.5V9',
  bath: 'M3 10.5h14M4.5 10.5V15a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-4.5M6 10.5V5.5A1.5 1.5 0 0 1 7.5 4a1.5 1.5 0 0 1 1.5 1.5M5.5 17l-1 2M14.5 17l1 2',
  floors: 'M3 16h5v-4h5V8h4M3 16V4',
  garden: 'M10 17V9m0 0c0-2.2-1.6-4-3.5-4C6 6.6 7.2 9 10 9zm0 0c0-2.2 1.6-4 3.5-4C14 6.6 12.8 9 10 9zM4 17h12',
  view: 'M2 13c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0M2 16.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0M14 7.5a2.5 2.5 0 1 0-5 0',
  terrace: 'M3 17h14M5 17V9h10v8M3 9l7-5 7 5M8 17v-4h4v4',
}

export function SpecIcon({ name, className = '' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`shrink-0 text-primary-black ${className}`}
    >
      <path d={PATHS[name] ?? PATHS.area} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
