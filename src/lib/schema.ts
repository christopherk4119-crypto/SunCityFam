import { business, serviceAreas } from '../config/business';

const B = business;
export const orgId = `${B.url}/#business`;

export function businessSchema(opts: { includeReviews?: { author: string; quote: string }[] } = {}) {
  const sameAs = [B.social.facebook, B.social.googleBusinessProfile].filter(Boolean);
  const node: Record<string, unknown> = {
    '@type': 'RoofingContractor',
    '@id': orgId,
    name: B.name,
    url: `${B.url}/`,
    telephone: B.phone.e164,
    email: B.email,
    description: B.gbpDescription,
    foundingDate: String(B.founded),
    priceRange: '$$',
    logo: `${B.url}/logo.png`,
    image: `${B.url}/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: B.address.street,
      addressLocality: B.address.city,
      addressRegion: B.address.region,
      postalCode: B.address.postalCode,
      addressCountry: B.address.country,
    },
    areaServed: [
      ...serviceAreas.map((t) => ({ '@type': 'City', name: `${t.name}, AB` })),
      { '@type': 'AdministrativeArea', name: 'Southern Alberta' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: B.hours.schemaOpens,
        closes: B.hours.schemaCloses,
      },
    ],
    sameAs,
  };
  if (B.geo) node.geo = { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng };
  if (B.rating) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: B.rating.value,
      reviewCount: B.rating.count,
      bestRating: 5,
    };
  }
  if (opts.includeReviews?.length) {
    node.review = opts.includeReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.quote,
      publisher: { '@type': 'Organization', name: 'Google' },
    }));
  }
  return node;
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${B.url}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(s: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@type': 'Service',
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: `${B.url}${s.path}`,
    provider: { '@id': orgId },
    areaServed: serviceAreas.map((t) => ({ '@type': 'City', name: `${t.name}, AB` })),
  };
}

export function imageSchema(img: { url: string; caption: string }) {
  return { '@type': 'ImageObject', contentUrl: img.url, caption: img.caption };
}
