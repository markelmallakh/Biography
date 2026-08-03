/**
 * Form field — the Figma input style: a soft filled box, no visible border until
 * focus, placeholder doing the work of the label. Used by the contact page, the
 * refer drawer and the project enquiry form.
 */
// Phones get a shorter, tighter box so a full form still fits a small viewport;
// the roomier Figma sizing takes over from `sm` up.
const base =
  'w-full rounded-[4px] bg-gray-.5 px-4 py-3 text-small-normal sm:py-5 sm:text-regular-normal font-medium text-primary-black ' +
  'placeholder:text-text-secondary-dark transition-shadow duration-200 ' +
  'focus:outline-none focus:ring-1 focus:ring-rose-120'

export default function Field({ as = 'input', label, options, className = '', ...rest }) {
  if (as === 'textarea') {
    return <textarea aria-label={label} placeholder={label} className={`${base} min-h-[110px] resize-y sm:min-h-[149px] ${className}`} {...rest} />
  }

  if (as === 'select') {
    return (
      <div className={`relative ${className}`}>
        <select aria-label={label} defaultValue="" className={`${base} appearance-none pr-10`} {...rest}>
          <option value="" disabled>
            {label}
          </option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary-black"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  return <input aria-label={label} placeholder={label} className={`${base} ${className}`} {...rest} />
}
