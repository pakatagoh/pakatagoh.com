import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    isPublished: z.boolean(),
    createdAt: z.string(),
    isoCreatedAt: z.string(),
    updatedAt: z.string().optional(),
    isoUpdatedAt: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
