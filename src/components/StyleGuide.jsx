// Temporary design-system preview. Confirms every Figma token resolves in Tailwind
// before we start building the real sections. Safe to delete once sections begin.

const COLORS = [
  ['Primary / White', '#FFFFFF', 'bg-primary-white'],
  ['Primary / Off-white', '#EFECEA', 'bg-primary-offwhite'],
  ['Primary / Black', '#333132', 'bg-primary-black'],
  ['Primary / Rose', '#D1BCC7', 'bg-primary-rose'],
  ['Primary / Greysh', '#C8C8C8', 'bg-primary-greysh'],
  ['Rose 05', '#FDFCFC', 'bg-rose-05'],
  ['Rose 10', '#FAF8F9', 'bg-rose-10'],
  ['Rose 20', '#F6F2F4', 'bg-rose-20'],
  ['Rose 30', '#F1EBEE', 'bg-rose-30'],
  ['Rose 40', '#EDE4E9', 'bg-rose-40'],
  ['Rose 50', '#E8DDE3', 'bg-rose-50'],
  ['Rose 60', '#E3D7DD', 'bg-rose-60'],
  ['Rose 70', '#DFD0D8', 'bg-rose-70'],
  ['Rose 80', '#DAC9D2', 'bg-rose-80'],
  ['Rose 90', '#D6C3CD', 'bg-rose-90'],
  ['Rose 100', '#D1BCC7', 'bg-rose-100'],
  ['Rose 120', '#A78A99', 'bg-rose-120'],
  ['Text Primary Dark', '#333132', 'bg-text-primary-dark'],
  ['Text Secondary Dark', '#5C5A5B', 'bg-text-secondary-dark'],
  ['Text Secondary Light', '#EBEAEA', 'bg-text-secondary-light'],
  ['Gray .5', '#F3F4F4', 'bg-gray-.5'],
  ['Gray 1', '#EBEAEA', 'bg-gray-1'],
  ['Gray 2', '#D6D6D6', 'bg-gray-2'],
  ['Gray 3', '#C2C1C1', 'bg-gray-3'],
  ['Gray 4', '#ADADAD', 'bg-gray-4'],
  ['Gray Dark 5', '#999898', 'bg-gray-dark-5'],
  ['Gray Dark 6', '#858384', 'bg-gray-dark-6'],
  ['Gray Dark 7', '#706F70', 'bg-gray-dark-7'],
  ['Gray Dark 8', '#5C5A5B', 'bg-gray-dark-8'],
  ['Gray Dark 9', '#474647', 'bg-gray-dark-9'],
]

const TYPE = [
  ['Display Extra Large', 'text-display-xl', 'font-light'],
  ['Display Large', 'text-display-lg', 'font-light'],
  ['Display Medium', 'text-display-md', 'font-light'],
  ['Heading H1', 'text-h1', 'font-bold'],
  ['Heading H2', 'text-h2', 'font-bold'],
  ['Heading H3', 'text-h3', 'font-bold'],
  ['Heading H4', 'text-h4', 'font-bold'],
  ['Heading H5', 'text-h5', 'font-bold'],
  ['Heading H6', 'text-h6', 'font-bold'],
  ['Text XL / Light', 'text-xl-light', 'font-light'],
  ['Text XL / Normal', 'text-xl-normal', 'font-medium'],
  ['Text XL / Semi Bold', 'text-xl-semibold', 'font-bold'],
  ['Text Large / Light', 'text-lg-light', 'font-light'],
  ['Text Large / Normal', 'text-lg-normal', 'font-medium'],
  ['Text Large / Semi Bold', 'text-lg-semibold', 'font-bold'],
  ['Text Regular / Light', 'text-regular-light', 'font-light'],
  ['Text Regular / Normal', 'text-regular-normal', 'font-medium'],
  ['Text Regular / Semi Bold', 'text-regular-semibold', 'font-bold'],
  ['Text Small / Light', 'text-small-light', 'font-light'],
  ['Text Small / Normal', 'text-small-normal', 'font-medium'],
  ['Text Small / Semi Bold', 'text-small-semibold', 'font-bold'],
  ['Text Tiny / Light', 'text-tiny-light', 'font-light'],
  ['Text Tiny / Normal', 'text-tiny-normal', 'font-medium'],
  ['Text Tiny / Semi Bold', 'text-tiny-semibold', 'font-bold'],
  ['Mobile Heading H1', 'text-m-h1', 'font-bold'],
  ['Mobile Heading H2', 'text-m-h2', 'font-bold'],
  ['Mobile Heading H3', 'text-m-h3', 'font-bold'],
  ['Mobile Heading H4', 'text-m-h4', 'font-bold'],
  ['Mobile Heading H5', 'text-m-h5', 'font-bold'],
  ['Mobile Heading H6', 'text-m-h6', 'font-bold'],
  ['Mobile XL / Normal', 'text-m-xl-normal', 'font-medium'],
  ['Mobile Large / Normal', 'text-m-lg-normal', 'font-medium'],
  ['Mobile Regular / Normal', 'text-m-regular-normal', 'font-medium'],
  ['Mobile Small / Normal', 'text-m-small-normal', 'font-medium'],
  ['Mobile Tiny / Normal', 'text-m-tiny-normal', 'font-medium'],
  ['Tagline (Montserrat)', 'text-tagline font-montserrat', 'font-medium'],
]

export default function StyleGuide() {
  return (
    <div className="mx-auto max-w-container-large px-page-global py-section-md">
      <p className="text-tagline font-montserrat font-medium uppercase tracking-wide text-primary-rose">
        Biography — Design System
      </p>
      <h1 className="text-h2 font-bold text-primary-black">Style Guide</h1>

      <section className="mt-section-md">
        <h2 className="text-h4 font-bold">Colors</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map(([name, hex, bg]) => (
            <div key={name} className="overflow-hidden border border-gray-2">
              <div className={`h-24 ${bg}`} />
              <div className="bg-white p-3">
                <div className="text-small-normal font-medium">{name}</div>
                <div className="text-tiny-light uppercase text-text-secondary-dark">{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-section-md">
        <h2 className="text-h4 font-bold">Typography</h2>
        <div className="mt-6 divide-y divide-gray-2 border-y border-gray-2">
          {TYPE.map(([name, size, weight]) => (
            <div key={name} className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8">
              <div className="w-56 shrink-0 text-tiny-normal font-medium uppercase text-text-secondary-dark">
                {name}
              </div>
              <div className={`${size} ${weight} text-primary-black`}>
                The quick brown fox
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
