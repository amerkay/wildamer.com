import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        isFeatured: z.boolean(),
        isComingSoon: z.boolean().optional(),
        featuredOrder: z.number().optional(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        imageDark: z.string().optional(),
        video: z.string().optional(),
        videoDark: z.string().optional(),
        date: z.date(),
        cardPreHeading: z.string().optional(),
        cardHeading: z.string().optional(),
        forOrganization: z.string().optional(),
        forOrganizationLink: z.string().optional(),
        githubLink: z.string().optional(),
        projectLink: z.string().optional(),
      }),
    }),
  },
});
