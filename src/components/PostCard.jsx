import ParallaxImage from './ui/ParallaxImage.jsx'
import { tagStyles } from '../data/posts.js'
import { withBase } from '../lib/paths.js'

/** The one media-centre card — used by the grid, the home page teaser and "Read Also". */
export default function PostCard({ post, className = '' }) {
  return (
    <article className={`flex flex-col gap-6 ${className}`}>
      <a href={withBase(`/media/${post.slug}`)} className="group flex flex-col gap-6">
        <PostMeta post={post} />

        <div className="flex flex-col">
          <h3 className="text-h6 font-bold leading-[1.4] text-primary-black">{post.title}</h3>
          <p className="text-small-light font-light text-text-secondary-dark">{post.excerpt}</p>
        </div>

        <ParallaxImage src={post.image} alt="" className="aspect-square w-full" strength={36} hover />

        <span className="flex items-center gap-2 text-regular-light font-light text-text-secondary-dark">
          READ MORE
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <path d="M6 14L14 6M7 6h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </article>
  )
}

export function PostMeta({ post, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-small-light font-light text-text-secondary-dark ${className}`}>
      <span className={`px-2 py-1 text-small-normal font-medium ${tagStyles[post.tag]}`}>{post.tag}</span>
      <Dot />
      <span>{post.author}</span>
      <Dot />
      <span>{post.date}</span>
    </div>
  )
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gray-4" />
}
