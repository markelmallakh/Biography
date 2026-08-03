/**
 * Project data — drives the home portfolio stack, the /projects list and each
 * /projects/:slug detail page.
 *
 * NOTE: the detail pages reuse the four project photos we have; masterplans,
 * facility shots, construction footage and gallery images are still needed.
 */

const commonUnits = [
  {
    name: 'Chalets',
    image: '/assets/bayside-small.png',
    specs: [
      { icon: 'area', label: '85–140 m²' },
      { icon: 'bed', label: '1–3 Bedrooms' },
      { icon: 'bath', label: '1–2 Bathrooms' },
      { icon: 'terrace', label: 'Terrace' },
    ],
  },
  {
    name: 'Townhouses',
    image: '/assets/westleaves-small.png',
    specs: [
      { icon: 'area', label: '180–220 m²' },
      { icon: 'bed', label: '3–4 Bedrooms' },
      { icon: 'bath', label: '3 Bathrooms' },
      { icon: 'garden', label: 'Garden' },
    ],
  },
  {
    name: 'Twin Houses',
    image: '/assets/parklane-small.png',
    specs: [
      { icon: 'area', label: '240–290 m²' },
      { icon: 'floors', label: '2 Floors' },
      { icon: 'bed', label: '4 Bedrooms' },
      { icon: 'bath', label: '4 Bathrooms' },
      { icon: 'garden', label: 'Garden' },
      { icon: 'view', label: 'Sea View' },
    ],
  },
  {
    name: 'Standalone Villas',
    image: '/assets/101-small.png',
    specs: [
      { icon: 'area', label: '320–450 m²' },
      { icon: 'floors', label: '2 Floors' },
      { icon: 'bed', label: '5 Bedrooms' },
      { icon: 'bath', label: '5 Bathrooms' },
      { icon: 'garden', label: 'Garden' },
      { icon: 'view', label: 'Sea View' },
    ],
  },
]

export const projects = [
  {
    slug: 'bayside',
    name: 'Bayside',
    location: 'Ras Sudr',
    type: 'Residential & Commercial',
    desc: 'A tranquil coastal destination blending luxury living with crystal-clear waters, private beaches, hospitality experiences, and nature-inspired relaxation.',
    large: '/assets/bayside-large.png',
    smalls: ['/assets/bayside-small.png', '/assets/bayside-large.png'],
    logo: '/assets/logos/bayside.svg',
    dark: false,
    detail: {
      // Space in the folder name is percent-encoded so the URL is unambiguous.
      heroVideo: '/assets/Single%20Project/bayside-video.mp4',
      headline: 'Where Coastal Living Finds Its Rhythm',
      intro:
        'Bayside is a thoughtfully crafted coastal destination where architecture, nature, and tranquility come together to create a lifestyle centered around comfort, connection, and escape.',
      aboutHeading: 'Built Around Experience, Designed Around People',
      aboutText:
        'Every element of Bayside is planned around how people actually spend their days by the sea — the walk to the water, the shade at midday, the long evenings outdoors. The result is a destination that feels considered at every hour.',
      brochure: '#',
      overviewImage: '/assets/Single%20Project/overview-background.webp',
      tiles: [
        { value: '48', label: 'Acres Of Coastal Living' },
        { image: '/assets/Single%20Project/highlights-01.webp' },
        { value: '+500', label: 'Living Clients' },
        { value: '312', label: 'Residential Units' },
        { value: '2.8 KM', label: 'Beachfront Experience' },
        { image: '/assets/Single%20Project/highlights-02.webp' },
      ],
      locationHeading: 'Connected To The Coast, Close To What Matters',
      mapQuery: 'Ras Sudr, South Sinai, Egypt',
      coords: [29.5899, 32.7181],
      landmarks: [
        { name: 'Cairo Downtown', time: '2hrs 30 mins', distance: '210 KM', coords: [30.0444, 31.2357], query: 'Downtown Cairo, Egypt' },
        { name: 'New Administrative Capital', time: '2 hrs', distance: '170 KM', coords: [30.008, 31.74], query: 'New Administrative Capital, Egypt' },
        { name: 'Soul Kitesurfing Center', time: '12 mins', distance: '8 KM', coords: [29.635, 32.695], query: 'Soul Kitesurfing, Ras Sudr, Egypt' },
        { name: 'Ain Sokhna', time: '45 mins', distance: '65 KM', coords: [29.6, 32.3167], query: 'Ain Sokhna, Egypt' },
      ],
      // 'All' shows every pin; the rest filter by a pin's `category`.
      masterplanTabs: ['All', 'Facilities', 'Activities', 'Gates'],
      masterplan: '/assets/Single%20Project/masterplan.webp',
      masterplanPins: [
        { category: 'Facilities', x: 88.5, y: 32, title: 'Clubhouse', text: 'Dining, wellness and social spaces in one hub.', image: '/assets/Single%20Project/facilities-Clubhouse.webp' },
        { category: 'Facilities', x: 44.5, y: 38, title: 'Swimming Pools', text: 'Lagoon pools threading between the chalets.', image: '/assets/Single%20Project/facilities-Swimming%20Pools.webp' },
        { category: 'Facilities', x: 9.5, y: 22, title: 'Beachfront Promenade', text: 'A shaded walk along the water\u2019s edge.', image: '/assets/Single%20Project/facilities-Beachfront-promenade.webp' },
        { category: 'Activities', x: 30, y: 16, title: 'Sports Courts', text: 'Tennis and padel courts set within the gardens.', image: '/assets/Single%20Project/facilities-sports-court.webp' },
        { category: 'Activities', x: 36, y: 59, title: 'Yoga Deck', text: 'A peaceful outdoor space designed for mindfulness, movement, and relaxation.', image: '/assets/Single%20Project/facilities-yoga%20area.webp' },
        { category: 'Activities', x: 62, y: 56, title: 'Jogging & Cycling Tracks', text: 'Looping tracks that run the length of the community.', image: '/assets/Single%20Project/facilities-Jogging%20&%20Cycling%20Tracks.webp' },
        // TODO: gate photography — these borrow landscape shots for now.
        { category: 'Gates', x: 95, y: 60, title: 'Main Gate', text: 'The primary arrival point, staffed around the clock.', image: '/assets/Single%20Project/facilities-landscape.webp' },
        { category: 'Gates', x: 17, y: 44, title: 'Beach Gate', text: 'Direct residents\u2019 access onto the sand.', image: '/assets/Single%20Project/facilities-Beachfront-promenade.webp' },
      ],
      // Interactive facilities: icon + photo per entry, from Single Project assets.
      facilities: [
        { name: 'Beachfront Promenade', icon: '/assets/Single%20Project/facilities-icons-beach.svg', image: '/assets/Single%20Project/facilities-Beachfront-promenade.webp' },
        { name: 'Swimming Pools', icon: '/assets/Single%20Project/facilities-icons-pool.svg', image: '/assets/Single%20Project/facilities-Swimming%20Pools.webp' },
        { name: 'Clubhouse', icon: '/assets/Single%20Project/facilities-icons-wellness.svg', image: '/assets/Single%20Project/facilities-Clubhouse.webp' },
        { name: 'Jogging & Cycling Tracks', icon: '/assets/Single%20Project/facilities-icons-bicycle.svg', image: '/assets/Single%20Project/facilities-Jogging%20&%20Cycling%20Tracks.webp' },
        { name: 'Landscaped Gardens', icon: '/assets/Single%20Project/facilities-icons-island.svg', image: '/assets/Single%20Project/facilities-landscape.webp' },
        { name: 'Sports Courts', icon: '/assets/Single%20Project/facilities-icons-tennis-ball.svg', image: '/assets/Single%20Project/facilities-sports-court.webp' },
        { name: 'Yoga Deck', icon: '/assets/Single%20Project/facilities-icons-yoga-02.svg', image: '/assets/Single%20Project/facilities-yoga%20area.webp' },
      ],
      progress: [
        { date: 'February 2026', title: 'Foundations and site preparation completed', image: '/assets/about-2.png' },
        { date: 'May 2026', title: 'Structural works underway across phase one', image: '/assets/post-03.png' },
        { date: 'August 2026', title: 'Beachfront promenade taking shape', image: '/assets/bayside-large.png' },
        { date: 'November 2026', title: 'Clubhouse and retail fit-out begins', image: '/assets/parklane-large.png' },
      ],
      units: commonUnits,
      // First entry is the lead image that opens full width in the gallery.
      gallery: [
        '/assets/Single%20Project/facilities-Clubhouse.webp',
        '/assets/Single%20Project/facilities-Swimming%20Pools.webp',
        '/assets/Single%20Project/facilities-Beachfront-promenade.webp',
        '/assets/Single%20Project/facilities-landscape.webp',
        '/assets/Single%20Project/highlights-02.webp',
        '/assets/Single%20Project/facilities-sports-court.webp',
        '/assets/Single%20Project/facilities-yoga%20area.webp',
      ],
      formImage: '/assets/Single%20Project/CTA%20image.webp',
    },
  },
  {
    slug: 'parklane',
    name: 'Parklane',
    location: 'New Capital, R7',
    type: 'Residential & Commercial',
    desc: 'A contemporary “Compoundhood” destination combining the comfort of gated living with the vibrant spirit of a connected neighborhood community.',
    large: '/assets/parklane-large.png',
    smalls: ['/assets/parklane-small.png', '/assets/parklane-large.png'],
    logo: '/assets/logos/parklane.svg',
    dark: true,
    detail: {
      headline: 'Where A Neighborhood Feels Like Home',
      intro:
        'Parklane brings the ease of gated living together with the energy of a real neighborhood, so daily life happens on your doorstep rather than a drive away.',
      aboutHeading: 'A Compoundhood Built For Everyday Life',
      aboutText:
        'Parklane is planned so that the school run, the morning coffee and the evening walk all sit within the same few streets. Density is used deliberately, to bring people together rather than to fit more in.',
      brochure: '#',
      tiles: [
        { value: '36', label: 'Acres Of Green Living' },
        { image: '/assets/CTA-3.png' },
        { value: '+700', label: 'Living Clients' },
        { value: '420', label: 'Residential Units' },
        { value: '1.4 KM', label: 'Central Green Spine' },
        { image: '/assets/CTA-2.png' },
      ],
      locationHeading: 'In The Heart Of The New Capital',
      mapQuery: 'R7, New Administrative Capital, Egypt',
      coords: [30.008, 31.74],
      landmarks: [
        { name: 'Downtown CBD', time: '10 mins', distance: '9 KM', coords: [30.025, 31.75], query: 'CBD, New Administrative Capital, Egypt' },
        { name: 'New Capital Airport', time: '20 mins', distance: '22 KM', coords: [30.115, 31.85], query: 'Capital International Airport, Egypt' },
        { name: 'New Cairo', time: '35 mins', distance: '40 KM', coords: [30.03, 31.47], query: 'New Cairo, Egypt' },
        { name: 'Cairo Downtown', time: '1 hr', distance: '60 KM', coords: [30.0444, 31.2357], query: 'Downtown Cairo, Egypt' },
      ],
      masterplanTabs: ['Phase 01', 'Phase 02', 'Central Park', 'Commercial'],
      masterplan: '/assets/parklane-large.png',
      facilities: [
        'Central Park', 'Swimming Pools', 'Clubhouse', 'Retail Strip',
        'Kids Area', 'Sports Courts', 'Cycling Track', 'Co-working Hub',
      ],
      facilitiesImage: '/assets/parklane-small.png',
      progress: [
        { date: 'February 2026', title: 'Site works and infrastructure completed', image: '/assets/about-2.png' },
        { date: 'May 2026', title: 'Residential cores rising across phase one', image: '/assets/post-03.png' },
        { date: 'August 2026', title: 'Central park landscaping begins', image: '/assets/parklane-large.png' },
        { date: 'November 2026', title: 'Retail strip handover preparation', image: '/assets/westleaves-large.png' },
      ],
      units: commonUnits,
      gallery: [
        '/assets/parklane-large.png',
        '/assets/parklane-small.png',
        '/assets/CTA-2.png',
        '/assets/about-2.png',
      ],
      formImage: '/assets/Single%20Project/CTA%20image.webp',
    },
  },
  {
    slug: 'west-leaves',
    name: 'West Leaves',
    location: 'Sheikh Zayed',
    type: 'Residential & Commercial',
    desc: 'A modern residential destination inspired by organic architecture and landscape-driven living, designed to maximize privacy, greenery, and integrated family experiences.',
    large: '/assets/westleaves-large.png',
    smalls: ['/assets/westleaves-small.png', '/assets/westleaves-large.png'],
    logo: '/assets/logos/westleaves.svg',
    dark: false,
    detail: {
      headline: 'Where Architecture Follows The Landscape',
      intro:
        'West Leaves is shaped around its greenery rather than around its buildings, giving every home privacy, daylight and a view worth waking up to.',
      aboutHeading: 'Designed Around Green, Not Around Grids',
      aboutText:
        'The master plan starts with the landscape and lets the architecture follow it. Homes are placed to protect sightlines and privacy, and the spaces between them are treated as rooms in their own right.',
      brochure: '#',
      tiles: [
        { value: '52', label: 'Acres Of Landscape' },
        { image: '/assets/CTA-1.png' },
        { value: '+400', label: 'Living Clients' },
        { value: '260', label: 'Residential Units' },
        { value: '70%', label: 'Green Coverage' },
        { image: '/assets/CTA-3.png' },
      ],
      locationHeading: 'Minutes From Sheikh Zayed’s Best Addresses',
      mapQuery: 'Sheikh Zayed City, Giza, Egypt',
      coords: [30.03, 30.97],
      landmarks: [
        { name: 'Sphinx Airport', time: '15 mins', distance: '14 KM', coords: [30.115, 30.895], query: 'Sphinx International Airport, Egypt' },
        { name: 'Mall Of Egypt', time: '12 mins', distance: '10 KM', coords: [29.972, 31.018], query: 'Mall of Egypt, 6th of October, Egypt' },
        { name: 'Downtown Cairo', time: '40 mins', distance: '38 KM', coords: [30.0444, 31.2357], query: 'Downtown Cairo, Egypt' },
        { name: 'Smart Village', time: '18 mins', distance: '15 KM', coords: [30.071, 31.017], query: 'Smart Village, Giza, Egypt' },
      ],
      masterplanTabs: ['Phase 01', 'Phase 02', 'Parkland', 'Commercial'],
      masterplan: '/assets/westleaves-large.png',
      facilities: [
        'Central Gardens', 'Swimming Pools', 'Clubhouse', 'Retail Village',
        'Kids Area', 'Sports Courts', 'Running Trail', 'Community Hall',
      ],
      facilitiesImage: '/assets/westleaves-small.png',
      progress: [
        { date: 'February 2026', title: 'Landscape earthworks completed', image: '/assets/about-2.png' },
        { date: 'May 2026', title: 'Villa shells underway across phase one', image: '/assets/post-03.png' },
        { date: 'August 2026', title: 'Parkland planting begins', image: '/assets/westleaves-large.png' },
        { date: 'November 2026', title: 'Clubhouse structure completed', image: '/assets/101-large.png' },
      ],
      units: commonUnits,
      gallery: [
        '/assets/westleaves-large.png',
        '/assets/westleaves-small.png',
        '/assets/CTA-3.png',
        '/assets/about-2.png',
      ],
      formImage: '/assets/Single%20Project/CTA%20image.webp',
    },
  },
  {
    slug: '101',
    name: '101',
    location: 'Mostakbal City',
    type: 'Residential & Commercial',
    desc: 'A lifestyle-focused community dedicated to green landscapes, water features, outdoor recreation, and modern family living in one of East Cairo’s fastest-growing destinations.',
    large: '/assets/101-large.png',
    smalls: ['/assets/101-small.png', '/assets/101-large.png'],
    logo: '/assets/logos/101.svg',
    dark: true,
    detail: {
      headline: 'Where Water And Green Set The Pace',
      intro:
        '101 is built around its lakes and landscape, giving East Cairo a community where recreation is part of the plan rather than an afterthought.',
      aboutHeading: 'Recreation Planned In, Not Added On',
      aboutText:
        'Water features, walkways and open recreation are laid out first, and the homes take their positions from them. It is what makes 101 feel established from the day the first families move in.',
      brochure: '#',
      tiles: [
        { value: '61', label: 'Acres Of Land' },
        { image: '/assets/CTA-2.png' },
        { value: '+900', label: 'Living Clients' },
        { value: '540', label: 'Residential Units' },
        { value: '3.1 KM', label: 'Waterfront Experience' },
        { image: '/assets/CTA-1.png' },
      ],
      locationHeading: 'At The Centre Of Mostakbal City',
      mapQuery: 'Mostakbal City, Cairo, Egypt',
      coords: [30.01, 31.63],
      landmarks: [
        { name: 'New Cairo', time: '15 mins', distance: '13 KM', coords: [30.03, 31.47], query: 'New Cairo, Egypt' },
        { name: 'New Capital', time: '25 mins', distance: '28 KM', coords: [30.008, 31.74], query: 'New Administrative Capital, Egypt' },
        { name: 'Cairo Airport', time: '35 mins', distance: '32 KM', coords: [30.1219, 31.4056], query: 'Cairo International Airport, Egypt' },
        { name: 'Downtown Cairo', time: '50 mins', distance: '45 KM', coords: [30.0444, 31.2357], query: 'Downtown Cairo, Egypt' },
      ],
      masterplanTabs: ['Phase 01', 'Phase 02', 'Lakeside', 'Commercial'],
      masterplan: '/assets/101-large.png',
      facilities: [
        'Lakes & Water Features', 'Swimming Pools', 'Clubhouse', 'Retail Plaza',
        'Kids Area', 'Sports Courts', 'Boardwalk', 'Outdoor Gym',
      ],
      facilitiesImage: '/assets/101-small.png',
      progress: [
        { date: 'February 2026', title: 'Lake excavation and infrastructure completed', image: '/assets/about-2.png' },
        { date: 'May 2026', title: 'First residential clusters underway', image: '/assets/post-03.png' },
        { date: 'August 2026', title: 'Boardwalk construction begins', image: '/assets/101-large.png' },
        { date: 'November 2026', title: 'Retail plaza structure completed', image: '/assets/bayside-large.png' },
      ],
      units: commonUnits,
      gallery: [
        '/assets/101-large.png',
        '/assets/101-small.png',
        '/assets/CTA-2.png',
        '/assets/about-2.png',
      ],
      formImage: '/assets/Single%20Project/CTA%20image.webp',
    },
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

/*
 * Every project link points at Bayside for now. Bayside is the reference detail
 * page: once Strapi supplies the per-project content, the other three get the
 * same page shape with their own data, and this collapses back to
 * `/projects/${slug}`.
 */
export const REFERENCE_PROJECT = 'bayside'
export const projectHref = () => `/projects/${REFERENCE_PROJECT}`
