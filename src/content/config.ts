import { defineCollection, z } from 'astro:content';

// --- Blog posts ---
// One Markdown file per post in src/content/blog/. See README for how to add a new post
// (or run `npm run new:post -- "My Post Title"`).
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Publish date, e.g. 2026-09-12
    date: z.coerce.date(),
    // Set true to hide from the blog index/RSS until you're ready to publish
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});

// --- Projects ---
// One Markdown file per project in src/content/projects/. See README for how to add a new
// project (or run `npm run new:project -- "My Project"`).
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['research', 'personal', 'work']),
    // Short one/two sentence summary shown on the projects index cards
    summary: z.string(),
    // Free-text date range shown on the card, e.g. "2017-2020" or "2024-present"
    dates: z.string().optional(),
    organization: z.string().optional(),
    // Sorting key: higher = more recent/prominent. Defaults to 0.
    order: z.number().default(0),
    // Optional cover image, path relative to /public, e.g. "/images/projects/tiles.jpg"
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Display width of the cover image on the project's own page, as a percentage of the
    // article's max-width (860px). Defaults to 100 (full width). Lower this for an image
    // that looks too large at full width (e.g. a tall/narrow diagram) - it doesn't affect
    // the project's listing-page thumbnail, only its own page.
    imageWidth: z.number().default(100),
    // Arbitrary related links shown as buttons on the project page
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    tags: z.array(z.string()).default([]),
    // Set true to hide from the index while still keeping the page around as a draft
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    // Set true for a project with no dedicated /projects/<slug> page of its own - just an
    // image + title tile on the /projects index that links straight out to its first `links`
    // entry (e.g. a shipped game's own product page, a Kickstarter). Used for the "Work
    // Projects" grid, matching how the old brandonmbooth.net site listed shipped titles as a
    // simple image grid rather than giving each one its own subpage. Requires at least one
    // entry in `links` - its url is what the tile links to.
    external: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
