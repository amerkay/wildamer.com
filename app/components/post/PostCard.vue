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
      <div class="p-10 pt-4">
        <h3 v-if="post.cardPreHeading" class="text-sm/4 font-semibold text-accent-foreground">
          {{ post.cardPreHeading }}
        </h3>
        <NuxtLink v-if="!post?.isComingSoon" :to="post.path">
          <p
            class="mt-2 text-lg font-medium tracking-tight text-foreground hover:text-primary transition-colors"
          >
            {{ post?.cardHeading || post.title }}
          </p>
        </NuxtLink>
        <p v-else class="mt-2 text-lg font-medium tracking-tight text-foreground">
          {{ post?.cardHeading || post.title }}
        </p>
        <p class="mt-2 max-w-lg text-sm/6 text-muted-foreground">
          {{ post?.description }}
        </p>
        <Badge v-if="post?.isComingSoon" variant="secondary" class="mt-4">
          Write up<NuxtLink :to="post.path" class="!text-secondary-foreground"
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
  mediaClasses: 'h-80 object-cover'
})
</script>
