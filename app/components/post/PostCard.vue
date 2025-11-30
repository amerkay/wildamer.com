<template>
  <div :class="cn('relative', gridClasses)">
    <div :class="cn('absolute inset-0 rounded-lg bg-background', backgroundModifiers)" />
    <div
      :class="
        cn(
          'relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]',
          contentModifiers
        )
      "
    >
      <MediaDisplay
        v-if="post?.image || post?.imageDark || post?.video || post?.videoDarkPostCard"
        :image="post.image"
        :image-dark="post.imageDark"
        :video="post.video"
        :video-dark="post.videoDark"
        :alt="post.title ?? ''"
        :media-classes="mediaClasses"
      />
      <div class="py-10 px-6 md:px-10 pt-4">
        <div class="mb-2 md:flex md:items-center md:justify-between md:gap-x-4">
          <time
            v-if="post.publishedAt"
            :datetime="new Date(post.publishedAt).toISOString()"
            class="mb-2 block md:mb-0 text-muted-foreground text-sm"
          >
            {{
              new Date(post.publishedAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }}
          </time>
          <div class="flex items-center gap-x-4 gap-y-2 text-xs flex-wrap">
            <template v-if="post.tags && post.tags.length > 0">
              <Badge v-for="tag in post.tags.slice(0, 3)" :key="tag" variant="outline">
                {{ tag }}
              </Badge>
            </template>
          </div>
        </div>

        <NuxtLink
          v-if="!post?.isComingSoon"
          :to="post.path"
          class="mt-2 text-xl font-normal text-foreground font-heading"
        >
          {{ post?.cardHeading || post.title }}
        </NuxtLink>
        <h3 v-else class="mt-2 text-xl font-normal text-muted-foreground font-heading">
          {{ post?.cardHeading || post.title }}
        </h3>
        <p class="mt-2 max-w-lg text-sm/6 text-muted-foreground">
          {{ post?.description }}
        </p>
        <Badge v-if="post?.isComingSoon" variant="secondary" class="mt-4">
          Work in progress,
          <NuxtLink :to="post.path" class="!text-secondary-foreground"
            >coming soon&hellip;</NuxtLink
          >
        </Badge>
      </div>
    </div>
    <div
      :class="
        cn(
          'pointer-events-none absolute inset-0 rounded-lg shadow-sm ring-1 ring-border',
          borderModifiers
        )
      "
    />
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error: Missing types
import type { PostsCollectionItem, ProjectsCollectionItem } from '@nuxt/content'
import { cn } from '~/lib/utils'

interface Props {
  post: ProjectsCollectionItem | PostsCollectionItem
  gridClasses: string
  backgroundModifiers?: string
  contentModifiers?: string
  borderModifiers?: string
  mediaClasses?: string
}

withDefaults(defineProps<Props>(), {
  backgroundModifiers: '',
  contentModifiers: '',
  borderModifiers: '',
  mediaClasses: 'max-h-80 object-cover'
})
</script>
