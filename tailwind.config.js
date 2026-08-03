/**
 * Tailwind config — Biography design system
 * Mirrors the Figma style guide (720:11038) one-for-one: every colour and text
 * style in that frame has a token here, and nothing here is off-system.
 * Primary typeface: Korpus Grotesk (B = Light/Regular 400, C = Medium 500, D = Bold 700)
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Exact brand palette from Figma — no default Tailwind colors bleeding through
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      // Pure black is a primitive, not a brand tone — used only for photographic
      // scrims and the Attal badge. Brand black is `primary-black` (#333132).
      black: '#000000',

      // Primary
      primary: {
        white: '#FFFFFF',
        offwhite: '#EFECEA',
        black: '#333132',
        rose: '#D1BCC7',
        greysh: '#C8C8C8',
      },

      // Rose scale — 100 is Primary/Rose, 120 the deepened hover/accent tone
      rose: {
        '05': '#FDFCFC',
        10: '#FAF8F9',
        20: '#F6F2F4',
        30: '#F1EBEE',
        40: '#EDE4E9',
        50: '#E8DDE3',
        60: '#E3D7DD',
        70: '#DFD0D8',
        80: '#DAC9D2',
        90: '#D6C3CD',
        100: '#D1BCC7',
        120: '#A78A99',
        DEFAULT: '#D1BCC7',
      },

      // Text roles
      text: {
        'primary-dark': '#333132',
        'secondary-dark': '#5C5A5B',
        'primary-light': '#FFFFFF',
        'secondary-light': '#EBEAEA',
      },

      // Gray scale
      gray: {
        '.5': '#F3F4F4',
        1: '#EBEAEA',
        2: '#D6D6D6',
        3: '#C2C1C1',
        4: '#ADADAD',
        'dark-5': '#999898',
        'dark-6': '#858384',
        'dark-7': '#706F70',
        'dark-8': '#5C5A5B',
        'dark-9': '#474647',
      },
    },

    fontFamily: {
      sans: ['"Korpus Grotesk"', 'system-ui', 'sans-serif'],
      korpus: ['"Korpus Grotesk"', 'system-ui', 'sans-serif'],
      montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
      roboto: ['Roboto', 'system-ui', 'sans-serif'],
    },

    // fontSize tuples = [size, lineHeight] straight from Figma text styles.
    // `m-` keys are the Mobile scale — pair them with a breakpoint, e.g. `text-m-h2 lg:text-h2`.
    fontSize: {
      // Display
      'display-xl': ['120px', { lineHeight: '1' }],
      'display-lg': ['54px', { lineHeight: '1.2' }],
      'display-md': ['32px', { lineHeight: '1.2' }],

      // Headings (Desktop)
      h1: ['92px', { lineHeight: '1.05' }],
      h2: ['62px', { lineHeight: '1.2' }],
      h3: ['48px', { lineHeight: '1.2' }],
      h4: ['32px', { lineHeight: '1.3' }],
      h5: ['24px', { lineHeight: '1.4' }],
      h6: ['20px', { lineHeight: '1.4' }],

      // Body text (Desktop)
      'xl-light': ['28px', { lineHeight: '1.3' }],
      'xl-normal': ['28px', { lineHeight: '1.3' }],
      'xl-semibold': ['28px', { lineHeight: '1.3' }],
      'lg-light': ['20px', { lineHeight: '1.3' }],
      'lg-normal': ['20px', { lineHeight: '1.1' }],
      'lg-semibold': ['20px', { lineHeight: '1.5' }],
      'regular-light': ['16px', { lineHeight: '1.5' }],
      'regular-normal': ['16px', { lineHeight: '1.5' }],
      'regular-semibold': ['16px', { lineHeight: '1.3' }],
      'small-light': ['14px', { lineHeight: '1.5' }],
      'small-normal': ['14px', { lineHeight: '1.5' }],
      'small-semibold': ['14px', { lineHeight: '1.5' }],
      'tiny-light': ['12px', { lineHeight: '1.5' }],
      'tiny-normal': ['12px', { lineHeight: '1.5' }],
      'tiny-semibold': ['12px', { lineHeight: '1.5' }],

      // Headings (Mobile)
      'm-h1': ['38px', { lineHeight: '1.2' }],
      'm-h2': ['32px', { lineHeight: '1.2' }],
      'm-h3': ['24px', { lineHeight: '1.2' }],
      'm-h4': ['20px', { lineHeight: '1.3' }],
      'm-h5': ['16px', { lineHeight: '1.4' }],
      'm-h6': ['14px', { lineHeight: '1.4' }],

      // Body text (Mobile)
      'm-xl-light': ['20px', { lineHeight: '1.3' }],
      'm-xl-normal': ['20px', { lineHeight: '1.3' }],
      'm-xl-semibold': ['20px', { lineHeight: '1.3' }],
      'm-lg-light': ['16px', { lineHeight: '1.5' }],
      'm-lg-normal': ['16px', { lineHeight: '1.5' }],
      'm-lg-semibold': ['16px', { lineHeight: '1.5' }],
      'm-regular-light': ['14px', { lineHeight: '1.5' }],
      'm-regular-normal': ['14px', { lineHeight: '1.5' }],
      'm-regular-semibold': ['14px', { lineHeight: '1.5' }],
      'm-small-light': ['12px', { lineHeight: '1.5' }],
      'm-small-normal': ['12px', { lineHeight: '1.5' }],
      'm-small-semibold': ['12px', { lineHeight: '1.5' }],
      'm-tiny-light': ['10px', { lineHeight: '1.5' }],
      'm-tiny-normal': ['10px', { lineHeight: '1.5' }],
      'm-tiny-semibold': ['10px', { lineHeight: '1.5' }],

      // Tagline
      tagline: ['16px', { lineHeight: '1.3' }],
    },

    extend: {
      fontWeight: {
        // Korpus Grotesk named-style aliases
        light: '400',   // style B
        medium: '500',  // style C
        bold: '700',    // style D
      },
      maxWidth: {
        'container-large': '1280px',
        'mw-small': '480px',
        'mw-large': '768px',
      },
      spacing: {
        'page-global': '64px',
        'section-lg': '112px',
        'section-md': '80px',
      },
      borderRadius: {
        // Figma: Radius/Medium and Radius/Large are both 0 — sharp corners by design
        none: '0',
      },
    },
  },
  plugins: [],
}
