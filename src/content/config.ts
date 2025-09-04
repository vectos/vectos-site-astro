import { defineCollection, z } from "astro:content";

const tech = defineCollection({
  schema: z.object({
    slug: z.string(),
    name: z.string(),
  }),
});

const brochure = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

const value = z.object({
  text: z.string(),
  result: z.number(),
});

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    banner: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    draft: z.boolean().optional().default(false),
    series: z.string().optional(),
  }),
});

const project = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    banner: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tech: z.string().array(),
    brochure: brochure.array(),
    value: value.array().optional(),
  }),
});

export const collections = { tech, blog, project };
