/**
 * About Us page content, mapped from Figma "About Us • Desktop" (542:8648).
 * Imagery lives in /assets/About-images.
 */
const img = (name) => `/assets/About-images/${name}`

// Coverflow strip under the hero headline.
export const heroStrip = [
  img('about-hero-01.webp'),
  img('about-hero-02.webp'),
  img('about-hero-03.webp'),
  img('about-hero-04.webp'),
  img('about-hero-05.webp'),
  img('about-hero-06.webp'),
]

export const whoWeAre = {
  image: img('who-we-are.webp'),
  backdrop: img('attal-holding-building.webp'),
  text:
    'Biography is driven by a forward-thinking vision and a strong commitment to quality, ' +
    'aiming to redefine the future of real estate in Egypt. We believe that great developments ' +
    'begin with understanding the people who will inhabit them, and that architecture is ' +
    'ultimately a conversation between space and human life.',
}

export const holdingCard = {
  image: img('attal-holding-building.webp'),
  title: 'A Subsidiary Of El Attal Holding',
  text: "Backed by El Attal Holding's legacy in real estate, architecture, and community development across Egypt.",
  href: 'https://www.elattal.com/home',
}

export const aboutStats = [
  {
    value: '15K+',
    title: 'Residents in our communities',
    text: 'Families and individuals living intentional lives within Biography developments',
  },
  {
    value: '100%',
    title: 'Resident Satisfaction Rate',
    text: 'Communities where people choose to stay, grow, and build their futures',
    // resedential-satisfaction.webp shipped as a byte-identical copy of the
    // El Attal building shot, so this card borrows a hero frame until it is re-exported.
    image: img('about-hero-04.webp'),
  },
]

export const vision = {
  tagline: 'Our Vision',
  text:
    'To create places that intuitively understand people not as static identities, ' +
    'but as individuals shaped by movement, experience, and transformation.',
  images: [img('vision-1.webp'), img('vision-2.webp'), img('vision-3.webp')],
}

export const mission = {
  tagline: 'Our Mission',
  text:
    'To design and deliver human-centered communities where every life is acknowledged, ' +
    'expressed, and elevated through intentional space-making',
  video: img('mission-video.mp4'),
}

export const chairman = {
  name: 'Eng. Ahmed\nEl Attal',
  portrait: img('chairman-message.webp'),
  heading: 'Chairman Message',
  body: [
    'At Biography, we believe real estate is about crafting the environments where lives unfold, where families grow, and where stories are written. The spaces we create become the backdrop for the moments that matter most. This is why we approach every project with the care of an architect and the heart of a storyteller.',
    'Every community we build begins with a question about the people who will live in it. That question shapes the master plan, the architecture, and the smallest detail of a finished home, and it is the reason our developments continue to feel like they belong to the people inside them.',
  ],
}

// Each portrait ships as a black-and-white default with a colour version for hover.
const member = (name, role, file) => ({
  name,
  role,
  photo: img(`team-${file}-default.webp`),
  photoHover: img(`team-${file}-hover.webp`),
})

export const team = [
  member('Ahmed El Attal', 'Chairman', 'Ahmed-elattal'),
  member('Menna El Attal', 'CMO', 'Menna-elattal'),
  member('Hala Hussien', 'Head of Community Experience', 'Hala-Hussien'),
  member('Omar Hassan', 'Chief Development Officer', 'Omar-hassan'),
  member('Hana Fahmy', 'Marketing Executive', 'Omar-hna-fahmy'),
  // TODO: job titles for these two were not in the Figma frame — confirm with the client.
  member('Ahmed Qandeel', '', 'Ahmed-Qandeel'),
  member('Nadine Ashraf', '', 'Nadine-Ashraf'),
]
