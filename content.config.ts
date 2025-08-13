import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      // Define custom schema for docs collection
      schema: z.object({
        isFeatured: z.boolean(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),
  },
});
