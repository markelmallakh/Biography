/**
 * Media centre content. Placeholder imagery reuses the existing press photos —
 * each post needs its own artwork before launch.
 */

export const categories = ['ALL', 'NEWS', 'BLOG', 'EVENTS']

// Tag pill styling per category, from the Figma media cards.
export const tagStyles = {
  NEWS: 'bg-primary-rose text-primary-black',
  BLOG: 'bg-gray-dark-8 text-primary-offwhite',
  EVENTS: 'bg-gray-3 text-primary-black',
}

const body = [
  {
    heading: 'Introduction',
    text: 'Modern real estate is no longer only about buildings and locations. Today’s communities are shaped around experiences, human interaction, and the way people move through everyday life. Thoughtful planning has become essential in creating spaces that feel meaningful, adaptable, and connected.',
    image: '/assets/post-03.png',
  },
  {
    heading: 'Human-Centered Communities',
    text: 'The next generation of developments prioritises people first, from walkable landscapes and integrated amenities to open green spaces and wellness-focused environments. Every detail should support comfort, flexibility, and a stronger sense of belonging for residents of all lifestyles.',
  },
  {
    heading: 'Designing For The Future',
    text: 'Future-ready destinations are designed to evolve with changing needs and expectations. Smart planning, sustainable construction, architecture, and considered living experiences work together to create environments that remain relevant, functional, and inspiring over time.',
  },
  {
    heading: 'Places That Grow With People',
    text: 'At Biography, we believe meaningful spaces are those that continue to support people through every stage of life. By balancing design, nature, community, and lifestyle, we create destinations that offer more than just homes — they create long-term experiences shaped around the future of living.',
  },
]

export const posts = [
  {
    slug: 'designing-spaces-for-the-next-generation',
    tag: 'NEWS',
    author: 'Alamain Tours',
    date: '23 Sep 2026',
    title: 'Designing spaces for the next generation',
    excerpt: 'A milestone moment for Egypt’s largest mixed-use development',
    image: '/assets/post-placeholder.png',
    featured: true,
    body,
  },
  {
    slug: 'biography-breaks-ground-on-101-mostakbal',
    tag: 'EVENTS',
    author: 'Alamain Tours',
    date: '23 Sep 2026',
    title: 'Biography breaks ground on 101 Mostakbal',
    excerpt: 'A milestone moment for Egypt’s largest mixed-use development',
    image: '/assets/Blog/56/post image 02.png',
    body,
  },
  {
    slug: 'partnership-agreement-with-orange-egypt',
    tag: 'NEWS',
    author: 'Alamain Tours',
    date: '29 Sep 2026',
    title: 'Partnership agreement with Orange Egypt',
    excerpt: 'Connectivity infrastructure across every Biography community',
    image: '/assets/post-02.png',
    body,
  },
  {
    slug: 'attal-properties-at-eg-prop',
    tag: 'BLOG',
    author: 'Alamain Tours',
    date: '02 Sep 2026',
    title: 'Attal Properties joins EG Prop in Dubai',
    excerpt: 'Taking Egyptian development to an international audience',
    image: '/assets/post-placeholder.png',
    body,
  },
  {
    slug: 'construction-milestone-parklane',
    tag: 'EVENTS',
    author: 'Alamain Tours',
    date: '18 Aug 2026',
    title: 'Parklane reaches its structural milestone',
    excerpt: 'Phase one cores complete ahead of programme',
    image: '/assets/about-2.png',
    body,
  },
  {
    slug: 'inside-the-elattal-legacy',
    tag: 'NEWS',
    author: 'Alamain Tours',
    date: '11 Aug 2026',
    title: 'Inside the El Attal legacy',
    excerpt: 'Five decades of building, and what comes next',
    image: '/assets/post-03.png',
  },
  {
    slug: 'what-makes-a-community-last',
    tag: 'BLOG',
    author: 'Alamain Tours',
    date: '02 Aug 2026',
    title: 'What makes a community last',
    excerpt: 'The design decisions that still matter twenty years on',
    image: '/assets/Blog/56/post image 03.png',
    body,
  },
  {
    slug: 'biography-at-cityscape-egypt',
    tag: 'EVENTS',
    author: 'Alamain Tours',
    date: '24 Jul 2026',
    title: 'Biography at Cityscape Egypt',
    excerpt: 'Meeting buyers and investors face to face',
    image: '/assets/placeholder.png',
    body,
  },
  {
    slug: 'west-leaves-landscape-first',
    tag: 'BLOG',
    author: 'Alamain Tours',
    date: '15 Jul 2026',
    title: 'West Leaves and the landscape-first master plan',
    excerpt: 'Why the space between homes matters as much as the homes',
    image: '/assets/westleaves-large.png',
    body,
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
