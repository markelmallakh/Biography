// Primary navigation — order and labels taken from the Figma menu overlay.
// Section links carry the home page's path so they also work from other pages.
export const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ABOUT', href: '/about' },
  { label: 'MEDIA CENTER', href: '/media' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
]

// The header bar drops HOME and leads with ABOUT, matching the Figma header.
const headerOrder = ['ABOUT', 'PROJECTS', 'MEDIA CENTER', 'CAREERS', 'FAQs']
export const headerLinks = headerOrder.map((label) => navLinks.find((l) => l.label === label))

export const contactPhone = '19431'
