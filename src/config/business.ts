/**
 * SINGLE SOURCE OF TRUTH for business facts.
 * Every component, page and JSON-LD block reads from here.
 * Change the phone, email or address HERE and it updates sitewide.
 *
 * NAP (name / address / phone) must match Google Business Profile,
 * Facebook and every directory listing character-for-character.
 */

export const business = {
  name: 'Sun City Roofing',
  legalName: 'Sun City Roofing',
  url: 'https://suncityroofinglethbridge.net',

  phone: {
    display: '(403) 929-5588',
    tel: 'tel:+14039295588',
    e164: '+14039295588',
    sms: 'sms:+14039295588',
  },

  // Matches Google Business Profile + Facebook. Retire suncityroofing@outlook.com from the old site/directories.
  email: 'suncityroofing123@gmail.com',

  address: {
    street: '114 Stafford Bay N',
    city: 'Lethbridge',
    region: 'AB',
    regionName: 'Alberta',
    postalCode: 'T1H 5P8',
    country: 'CA',
  },

  // From the Google Business Profile pin
  geo: { lat: 49.72183, lng: -112.8336 } as null | { lat: number; lng: number },

  // Google lists "Open 24 hours"
  hours: {
    is24h: true,
    schemaOpens: '00:00',
    schemaCloses: '23:59',
    copy: 'Call anytime. We answer.',
  },

  owner: 'Chris',
  founded: 2023,
  experienceCopy: '20+ years of hands-on roofing experience',

  /**
   * TODO: only set to true once WCB Alberta clearance + liability insurance can be shown.
   * While false, "Licensed & Insured" is NOT displayed anywhere.
   */
  licensedInsured: false,
  // TODO: e.g. 'WCB Alberta account in good standing · $2M liability coverage'
  licensedInsuredDetail: '',

  // TODO: confirm terms with owner
  bestPriceFinePrint:
    'Bring us any written estimate for the same materials and scope of work and we will beat it.',

  // TODO: confirm this is still accurate/representative before launch
  priceProof: 'Complete house + garage re-roof for $8,400',

  shingleBrand: 'IKO',
  // TODO: confirm product lines (e.g. Cambridge, Dynasty) so wind ratings/warranty copy is accurate
  shingleColours: ['Dual Grey', 'Dual Brown', 'Charcoal Grey'],

  social: {
    facebook: 'https://www.facebook.com/people/Sun-City-Roofing/61578647018627/',
    // Google Business Profile (stable CID link)
    googleBusinessProfile: 'https://maps.google.com/?cid=4205094195851378392',
    // TODO: GBP "read reviews" link
    googleReviewsUrl: '',
    // TODO: GBP "write a review" short link (from GBP dashboard → "Ask for reviews")
    googleWriteReviewUrl: '',
  },

  /**
   * TODO: fill on launch day with the LIVE Google numbers. While null, no rating
   * is displayed and no AggregateRating schema is output.
   */
  rating: null as null | { value: number; count: number },

  // TODO: GA4 measurement ID (G-XXXXXXX). Analytics + tel-click tracking load only when set.
  ga4Id: '',

  gbpDescription:
    'Professional residential roofing services you can count on. We provide quality roof replacements, repairs, and installations with dependable workmanship, quality materials and excellent customer service. Your home is our priority!',
} as const;

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

export type Town = {
  name: string;
  slug: string | null; // null = served but no dedicated page yet
};

/** Towns with completed jobs. Only these get dedicated pages. */
export const serviceAreas: Town[] = [
  { name: 'Lethbridge', slug: null },
  { name: 'Coaldale', slug: 'coaldale' },
  { name: 'Claresholm', slug: 'claresholm' },
  // Owner travels across Southern Alberta. Only add a dedicated town page once there is a
  // completed job (and ideally photos) there — then write genuinely unique copy for it.
];

/** Shown as plain text ("we also travel to…"), no dedicated pages. */
export const widerArea = 'Southern Alberta';

export const services = [
  { name: 'Hail Damage & Insurance Claims', short: 'Hail Damage', href: '/hail-damage-roof-repair-lethbridge/', icon: 'hail' },
  { name: 'Roof Replacement', short: 'Roof Replacement', href: '/roof-replacement-lethbridge/', icon: 'roof' },
  { name: 'Roof Repair', short: 'Roof Repair', href: '/roof-repair-lethbridge/', icon: 'wrench' },
  { name: '3-Tab → Architectural Upgrades', short: 'Architectural Shingles', href: '/architectural-shingles/', icon: 'layers' },
  { name: 'Cedar Shake Removal', short: 'Cedar Shake Removal', href: '/cedar-shake-removal/', icon: 'shake' },
  { name: 'Metal Roofing', short: 'Metal Roofing', href: '/metal-roofing-lethbridge/', icon: 'metal' },
  { name: 'Gutters & Eavestroughs', short: 'Gutters', href: '/gutters-lethbridge/', icon: 'gutter' },
] as const;
