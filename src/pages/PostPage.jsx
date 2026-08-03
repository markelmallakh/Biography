import Reveal from '../components/Reveal.jsx'
import Cursor from '../components/ui/Cursor.jsx'
import Cta from '../components/ui/Cta.jsx'
import PostCard, { PostMeta } from '../components/PostCard.jsx'
import ParallaxImage from '../components/ui/ParallaxImage.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { posts } from '../data/posts.js'

export default function PostPage({ post }) {
  const readAlso = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main>
      <article className="bg-primary-white px-4 pb-20 pt-[130px] lg:px-[60px]">
        <Reveal className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-5 text-center">
          <p className="text-regular-normal font-medium text-text-secondary-dark">
            <Cursor />Media Center
          </p>
          <h1 className="text-m-h1 font-bold leading-[1.2] text-primary-black lg:text-h2">{post.title}</h1>
          <PostMeta post={post} className="justify-center" />
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-12 w-full max-w-[1200px]">
          <ParallaxImage src={post.image} alt="" className="aspect-[16/9] w-full" strength={44} />
        </Reveal>

        <div className="mx-auto mt-16 flex w-full max-w-[720px] flex-col gap-10">
          {(post.body ?? []).map((block, i) => (
            <Reveal key={i} className="flex flex-col gap-4">
              <h2 className="text-h5 font-bold text-primary-black">{block.heading}</h2>
              <p className="text-small-light font-light leading-[1.7] text-text-secondary-dark">{block.text}</p>
              {block.image && (
                <ParallaxImage src={block.image} alt="" className="mt-4 aspect-[16/10] w-full" strength={30} />
              )}
            </Reveal>
          ))}

          <div className="mt-4 flex items-center justify-end gap-4 border-t border-gray-2 pt-6 text-text-secondary-dark">
            <span className="mr-auto text-small-light font-light">Share this article</span>
            <ShareLink label="Copy link" path="M6.6 9.4a3 3 0 0 0 4.2 0l1.7-1.7a3 3 0 0 0-4.2-4.2l-.9.9M9.4 6.6a3 3 0 0 0-4.2 0L3.5 8.3a3 3 0 0 0 4.2 4.2l.9-.9" />
            <ShareLink label="LinkedIn" path="M5 3.5A1.5 1.5 0 1 1 2 3.5a1.5 1.5 0 0 1 3 0zM2.3 6h2.4v8H2.3V6zm4 0h2.3v1.1h.03c.32-.6 1.1-1.3 2.3-1.3 2.5 0 2.9 1.6 2.9 3.7V14h-2.4v-3.6c0-.85 0-2-1.2-2s-1.4 1-1.4 1.9V14H6.3V6z" filled />
            <ShareLink label="X" path="M9.5 7l4-5h-1.3L8.9 6.1 6.3 2H2.5l4.2 6-4.2 5h1.3l3.6-4.3L11 13h3.8L9.5 7z" filled />
            <ShareLink label="Facebook" path="M13.5 8.5h2l.5-2.5h-2.5V4.7c0-.7.3-1.2 1.3-1.2H16V1.3C15.6 1.2 14.7 1 13.8 1c-1.9 0-3.3 1.2-3.3 3.3V6H8.3v2.5h2.2V15h3V8.5z" filled />
          </div>
        </div>
      </article>

      <SectionReveal>
        <section className="flex flex-col items-center gap-12 bg-rose-30 px-4 py-20 lg:px-[60px]">
          <Reveal>
            <h2 className="text-m-h2 font-bold text-primary-black lg:text-h3">Read Also</h2>
          </Reveal>

          <div className="grid w-full max-w-[1392px] gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {readAlso.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="w-full sm:w-auto">
            <Cta label="Read More" variant="outline" href="/media" />
          </Reveal>
        </section>
      </SectionReveal>

      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}

function ShareLink({ label, path, filled = false }) {
  return (
    <button type="button" aria-label={label} className="transition-colors hover:text-primary-black">
      <svg width="20" height="20" viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'}>
        <path
          d={path}
          stroke={filled ? undefined : 'currentColor'}
          strokeWidth={filled ? undefined : 1.4}
          strokeLinecap={filled ? undefined : 'round'}
        />
      </svg>
    </button>
  )
}
