/**
 * Careers content. The role detail below is the one written out in the Figma;
 * the other three reuse its shape and need their own copy from HR.
 */

const sharedBenefits = [
  'Competitive Salary & Performance Incentives',
  'Professional Growth & Career Development',
  'Learning & Training Opportunities',
  'Collaborative & Creative Work Environment',
  'Exposure To Premium Real Estate Projects',
  'Medical Insurance Coverage',
  'Employee Recognition Programs',
  'Flexible & Supportive Team Culture',
  'Career Advancement Opportunities',
  'Modern Workplace Environment',
]

export const culture = {
  tagline: 'Life in Biography',
  heading: 'Human-Centered Culture',
  images: ['/assets/About-images/about-hero-01.webp', '/assets/About-images/about-hero-06.webp'],
  points: [
    {
      title: 'Continuous Growth',
      text: 'We place people at the center of everything we do — from our developments to the way we collaborate as teams.',
    },
    {
      title: 'Collaborative Environment',
      text: 'Our teams work closely across disciplines to create thoughtful experiences and meaningful outcomes.',
    },
  ],
}

export const jobs = [
  {
    slug: 'senior-architectural-designer',
    title: 'Senior Architectural Designer',
    location: 'Heliopolis, Cairo',
    type: 'Full-time',
    summary:
      'Lead the development of innovative architectural concepts and collaborate closely with multidisciplinary teams to shape premium residential and mixed-use destinations.',
    about:
      'As a Senior Architectural Designer, you will take concepts from first sketch through to documentation, working alongside planners, engineers and consultants to keep design intent intact all the way to site.',
    requirements: [
      'Bachelor’s degree in Architecture or a related field',
      'Seven or more years of experience on residential or mixed-use projects',
      'Strong conceptual and three-dimensional design skills',
      'Fluency in Revit, Rhino and the Adobe suite',
      'Experience coordinating with external consultants',
      'Confident presenting design rationale to stakeholders',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'marketing-brand-executive',
    title: 'Marketing & Brand Executive',
    location: 'El Sheikh Zayed, Giza',
    type: 'Full-time',
    summary:
      'Support the growth of the Biography brand through creative campaigns, digital storytelling, and integrated marketing initiatives.',
    about:
      'As a Marketing & Brand Executive, you will help shape how Biography shows up across every channel, turning project milestones and community stories into campaigns that reach the right audiences.',
    requirements: [
      'Bachelor’s degree in Marketing, Communications or a related field',
      'Two or more years of experience in brand or campaign marketing',
      'Strong copywriting and content planning skills',
      'Comfortable working with agencies and creative teams',
      'Familiarity with paid social and performance reporting',
      'Real estate or lifestyle brand experience is a plus',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'community-experience-specialist',
    title: 'Community Experience Specialist',
    location: 'New Capital, Cairo',
    type: 'Full-time',
    summary:
      'Help create seamless and meaningful customer journeys by enhancing communication, engagement, and resident experiences.',
    about:
      'As a Community Experience Specialist, you will be the connection between residents and everything that makes a Biography community work, from first handover through to everyday life on site.',
    requirements: [
      'Bachelor’s degree in Business, Hospitality or a related field',
      'Experience in customer experience, hospitality or community management',
      'Excellent written and spoken communication',
      'A calm, service-minded approach to resolving issues',
      'Comfortable coordinating across operations and facilities teams',
      'Strong organisational and follow-up skills',
    ],
    benefits: sharedBenefits,
  },
  {
    slug: 'real-estate-sales-consultant',
    title: 'Real Estate Sales Consultant',
    location: 'Heliopolis, Cairo',
    type: 'Part-time',
    summary:
      'Guide clients through their investment and lifestyle journey while representing Biography’s values and premium developments.',
    about:
      'As a Real Estate Sales Consultant, you will be responsible for engaging with potential clients, understanding their needs, presenting suitable opportunities, and supporting them throughout the sales process with professionalism, transparency, and care.',
    requirements: [
      'Bachelor’s degree in Business, Marketing, or related field',
      'Previous experience in real estate sales is preferred',
      'Strong communication and negotiation skills',
      'Presentable, confident, and customer-oriented personality',
      'Ability to build long-term client relationships',
      'Strong understanding of the Egyptian real estate market is a plus',
      'Excellent organizational and follow-up skills',
    ],
    benefits: sharedBenefits,
  },
]

export const getJob = (slug) => jobs.find((j) => j.slug === slug)
