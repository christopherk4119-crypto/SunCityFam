import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Reviews — REAL Google reviews only, verbatim. One file per review.
 * Set `truncated: true` when you only have the cut-off text from Google ("More").
 */
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    author: z.string(), // first name + last initial
    quote: z.string(),
    truncated: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    source: z.literal('Google').default('Google'),
    // where this review removes an objection
    placements: z
      .array(z.enum(['hero', 'pricing', 'speed', 'cleanup', 'longevity', 'quality']))
      .default([]),
    order: z.number().default(99),
  }),
});

/**
 * Projects — real job photos only. Put images in src/assets/projects/
 * and one JSON file per photo in src/content/projects/.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string().max(125),
      caption: z.string(), // "Hail damage replacement · IKO Dual Brown · Lethbridge"
      service: z.enum([
        'hail-damage-replacement',
        'roof-replacement',
        'architectural-upgrade',
        'cedar-shake-removal',
        'metal-roofing',
        'open-metal-valleys',
        'roof-repair',
        'gutters',
        'cleanup',
        'crew',
        'other',
      ]),
      town: z.string().optional(), // only when known from the job folder name
      shotType: z.enum(['before', 'during', 'after', 'detail', 'aerial', 'cleanup', 'crew']),
      pairId: z.string().optional(), // same id on a before + after photo of the same roof
      featured: z.boolean().default(false), // show on home "Recent projects"
      heroFor: z.string().optional(), // page path this photo is the main image for (one page only)
    }),
});

export const collections = { reviews, projects };
