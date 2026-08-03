import Reveal from './Reveal.jsx'
import Cta from './ui/Cta.jsx'
import ParallaxImage from './ui/ParallaxImage.jsx'
import Cursor from './ui/Cursor.jsx'

const posts = [
  { tag: 'EVENTS', tagBg: 'bg-gray-3', tagText: 'text-primary-black', img: '/assets/post-placeholder.png' },
  { tag: 'NEWS', tagBg: 'bg-primary-rose', tagText: 'text-primary-black', img: '/assets/post-02.png' },
  { tag: 'BLOG', tagBg: 'bg-gray-dark-8', tagText: 'text-primary-offwhite', img: '/assets/post-03.png' },
]

const POST = {
  author: 'Alamain Tours',
  date: '23 Sep 2026',
  title: 'Biography breaks ground on 101 Mostakbal',
  excerpt: "A milestone moment for Egypt's largest mixed-use development",
}

export default function BlogSection() {
  return (
    <section id="media" className="flex flex-col items-center gap-10 bg-rose-30 py-20">
      <Reveal className="flex w-full max-w-[768px] flex-col items-center gap-2 px-4 text-center">
        <p className="text-h6 font-bold text-text-secondary-dark"><Cursor />Media Center</p>
        <h2 className="text-m-h2 font-bold leading-[1.2] text-primary-black lg:text-h3">Insights &amp; News From Biography</h2>
        <p className="text-regular-normal font-medium text-text-secondary-dark">
          Discover what shapes Biography and the communities we create
        </p>
      </Reveal>

      <div className="flex w-full flex-col divide-y divide-rose-80 border-y border-rose-80 lg:flex-row lg:divide-x lg:divide-y-0">
        {posts.map((post, i) => (
          <Reveal key={post.tag} delay={i * 0.12} className="flex flex-1 flex-col gap-6 px-4 py-8 transition-colors duration-300 hover:bg-white lg:gap-8 lg:px-[60px] lg:py-10">
            <PostWidget {...post} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <Cta label="Read More" variant="outline" href="#media" />
      </Reveal>
    </section>
  )
}

function PostWidget({ tag, tagBg, tagText, img }) {
  return (
    <a href="#media" className="group flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-small-light font-light text-text-secondary-dark">
          <span className={`px-2 py-1 text-small-normal font-medium ${tagBg} ${tagText}`}>{tag}</span>
          <Dot />
          <span>{POST.author}</span>
          <Dot />
          <span>{POST.date}</span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-h6 font-bold leading-[1.4] text-primary-black">{POST.title}</h3>
          <p className="text-small-light font-light text-text-secondary-dark">{POST.excerpt}</p>
        </div>
      </div>

      <ParallaxImage src={img} className="aspect-square w-full" strength={36} hover />

      <div className="flex items-center gap-2 text-regular-light font-light text-text-secondary-dark">
        READ MORE
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <path d="M6 14L14 6M7 6h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  )
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gray-4" />
}
