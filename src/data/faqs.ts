import { business } from '../config/business';

const phone = business.phone.display;

/** Answers reused across service pages. Keep these honest — no invented numbers. */
export const common = {
  cost: {
    q: 'How much does a new roof cost in Lethbridge?',
    a: `It depends on the size and pitch of your roof, how many layers have to come off, whether the decking needs replacing and which shingle you pick. For a real example, we did a ${business.priceProof.replace('Complete ', 'complete ')}. The only way to get your number is a free, written quote — call ${phone}.`,
  },
  // TODO: owner to confirm typical timelines
  timeline: {
    q: 'How long does a roof replacement take?',
    a: 'Most houses are done in a day or two, weather permitting. Bigger roofs, steep pitches, multiple layers or rotten decking add time. You get an expected timeline in your written quote, before anything starts.',
  },
  winter: {
    q: 'Can you roof in the winter?',
    a: 'Yes — we work year-round, including winter. Southern Alberta gets plenty of workable winter days, especially during a Chinook. We watch the forecast, use the right installation methods for cold weather, and won\'t install in conditions that would hurt the roof.',
  },
  insurance: {
    q: 'Do you work with insurance companies on hail claims?',
    a: 'Yes. We inspect the roof for free, photograph the damage, provide a detailed written estimate and can meet your adjuster on site. Your insurer decides what is covered — we just make sure the damage is documented properly.',
  },
  // TODO: confirm workmanship warranty terms (length, what it covers) and IKO product warranty
  warranty: {
    q: 'What warranty do I get?',
    a: `The shingles carry the IKO manufacturer warranty for the product line you choose, and we stand behind our workmanship. ${business.owner} explains exactly what's covered and puts it in writing with your quote.`,
  },
  home: {
    q: 'Do I need to be home while you work?',
    a: 'No. We need access to the yard and an outdoor power outlet is helpful. Most homeowners are around at the start and for the final walkthrough, but it isn\'t required — we\'ll call or text you with updates.',
  },
  cleanup: {
    q: 'What does cleanup look like?',
    a: 'Every job ends with our Yard-Clean Promise: a magnetic nail sweep of the lawn, driveway and beds, all debris hauled away, and a final walkthrough with you. Your yard is safe for kids and pets the moment we leave.',
  },
  quote: {
    q: 'How fast can I get a quote?',
    a: `Fast. Call ${phone} — we answer, any time. Same-day quotes are often available, and every quote is free, written and detailed with no hidden fees.`,
  },
  bestPrice: {
    q: 'Do you really beat any written estimate?',
    a: `Yes. ${business.bestPriceFinePrint} Send it to us or show ${business.owner} when he comes out.`,
  },
};
