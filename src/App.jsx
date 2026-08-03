import SiteHeader from './components/SiteHeader.jsx'
import { ReferProvider } from './components/ReferDrawer.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import MediaPage from './pages/MediaPage.jsx'
import PostPage from './pages/PostPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import CareersPage from './pages/CareersPage.jsx'
import CareerPage from './pages/CareerPage.jsx'
import FaqsPage from './pages/FaqsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import useSmoothScroll from './hooks/useSmoothScroll.js'
import useRoute from './hooks/useRoute.js'
import { getProject } from './data/projects.js'
import { getPost } from './data/posts.js'
import { getJob } from './data/careers.js'

const staticRoutes = {
  // `overHero` marks the pages whose hero is a dark full-bleed image, where the
  // header can stay near-transparent until you scroll.
  '/': { render: () => <HomePage />, nav: 'HOME', overHero: true },
  '/about': { render: () => <AboutPage />, nav: 'ABOUT' },
  '/projects': { render: () => <ProjectsPage />, nav: 'PROJECTS' },
  '/media': { render: () => <MediaPage />, nav: 'MEDIA CENTER' },
  '/contact': { render: () => <ContactPage />, nav: 'CONTACT' },
  '/careers': { render: () => <CareersPage />, nav: 'CAREERS', overHero: true },
  '/faqs': { render: () => <FaqsPage />, nav: 'FAQs' },
}

// Two-segment routes resolve against their data set; an unknown slug falls through.
const dynamicRoutes = [
  { prefix: '/projects', nav: 'PROJECTS', overHero: true, lookup: getProject, render: (item) => <ProjectPage project={item} /> },
  { prefix: '/media', nav: 'MEDIA CENTER', lookup: getPost, render: (item) => <PostPage post={item} /> },
  { prefix: '/careers', nav: 'CAREERS', lookup: getJob, render: (item) => <CareerPage job={item} /> },
]

function resolve(path) {
  const exact = staticRoutes[path]
  if (exact) return exact

  const [, prefix, slug, ...extra] = path.split('/')
  if (slug && extra.length === 0) {
    const route = dynamicRoutes.find((r) => r.prefix === `/${prefix}`)
    const item = route?.lookup(slug)
    if (item) return { render: () => route.render(item), nav: route.nav, overHero: route.overHero }
  }
  return { render: () => <NotFoundPage />, nav: '' }
}

export default function App() {
  useSmoothScroll()
  const path = useRoute()
  const { render, nav, overHero } = resolve(path)

  return (
    <ReferProvider>
      <SiteHeader currentPage={nav} overHero={Boolean(overHero)} />
      {render()}
    </ReferProvider>
  )
}
