import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import Chips from '../components/ui/Chips.jsx'
import TabTransition from '../components/ui/TabTransition.jsx'
import PostCard, { PostMeta } from '../components/PostCard.jsx'
import ParallaxImage from '../components/ui/ParallaxImage.jsx'
import FooterSection from '../components/FooterSection.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import { categories, posts } from '../data/posts.js'
import { withBase } from '../lib/paths.js'

export default function MediaPage() {
  const [filter, setFilter] = useState('ALL')
  const visible = filter === 'ALL' ? posts : posts.filter((p) => p.tag === filter)
  const [featured, ...rest] = visible

  return (
    <main id="media">
      <section className="flex flex-col items-center gap-6 bg-primary-rose px-4 pb-14 pt-[140px] lg:px-[60px]">
        <Reveal>
          <h1 className="text-m-h1 font-bold text-primary-black lg:text-h2">Media Center</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <Chips items={categories} value={filter} onChange={setFilter} className="justify-center" />
        </Reveal>
      </section>

      <section className="bg-primary-white px-4 py-16 lg:px-[60px]">
        <TabTransition id={filter} className="mx-auto flex w-full max-w-[1392px] flex-col gap-16">
          {featured && <FeaturedPost post={featured} />}

          {rest.length > 0 && (
            <div className="grid gap-x-10 gap-y-14 border-t border-gray-2 pt-14 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}

          {visible.length === 0 && (
            <p className="py-20 text-center text-lg-light font-light text-text-secondary-dark">
              Nothing published under {filter} yet.
            </p>
          )}
        </TabTransition>
      </section>

      <SectionReveal><FooterSection /></SectionReveal>
    </main>
  )
}

function FeaturedPost({ post }) {
  return (
    <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
      <a href={withBase(`/media/${post.slug}`)} className="group block w-full lg:w-[56%]">
        <ParallaxImage src={post.image} alt="" className="aspect-[16/10] w-full" strength={40} hover />
      </a>

      <div className="flex flex-1 flex-col gap-6">
        <PostMeta post={post} />
        <div className="flex flex-col gap-2">
          <h2 className="text-m-h2 font-bold leading-[1.2] text-primary-black lg:text-h3">
            <a href={withBase(`/media/${post.slug}`)} className="transition-colors hover:text-rose-120">
              {post.title}
            </a>
          </h2>
          <p className="text-regular-light font-light text-text-secondary-dark">{post.excerpt}</p>
        </div>
        <a
          href={withBase(`/media/${post.slug}`)}
          className="group flex w-fit items-center gap-2 text-regular-light font-light text-text-secondary-dark"
        >
          READ MORE
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <path d="M6 14L14 6M7 6h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </Reveal>
  )
}
