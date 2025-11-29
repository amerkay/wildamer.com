import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const schemaDef = z.object({
  title: z.string(),
  description: z.string(),
  isFeatured: z.boolean(),
  isComingSoon: z.boolean().optional(),
  featuredOrder: z.number().optional(),
  tags: z.array(z.string()),
  isHideFeaturedImageOnPage: z.boolean().optional(),
  image: z.string().optional(),
  imageDark: z.string().optional(),
  video: z.string().optional(),
  videoDark: z.string().optional(),
  publishedAt: z.date(),
  updatedAt: z.date(),
  cardHeading: z.string().optional(),
  forOrganization: z.string().optional(),
  forOrganizationLink: z.string().optional(),
  githubLink: z.string().optional(),
  projectLink: z.string().optional()
})

export default defineContentConfig({
  collections: {
    project: defineCollection({
      type: 'page',
      source: 'project/*.md',
      schema: schemaDef
    }),

    article: defineCollection({
      type: 'page',
      source: 'article/*.md',
      schema: schemaDef
    })
  }
})
