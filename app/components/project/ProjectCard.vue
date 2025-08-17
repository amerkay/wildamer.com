<template>
  <div :class="cn('relative', gridClasses)">
    <div
      :class="
        cn('absolute inset-0 rounded-lg bg-background', backgroundModifiers)
      "
    />
    <div
      :class="
        cn(
          'relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]',
          contentModifiers
        )
      "
    >
      <MediaDisplay
        :image="project.image"
        :image-dark="project.imageDark"
        :video="project.video"
        :video-dark="project.videoDark"
        :alt="project.title ?? ''"
        :media-classes="mediaClasses"
      />
      <div class="p-10 pt-4">
        <h3 class="text-sm/4 font-semibold text-accent-foreground">
          {{ project.cardPreHeading || project.title }}
        </h3>
        <p class="mt-2 text-lg font-medium tracking-tight text-foreground">
          {{ project.cardHeading || project.title }}
        </p>
        <p class="mt-2 max-w-lg text-sm/6 text-muted-foreground">
          {{ project.description }}
        </p>
        <Badge v-if="project.isComingSoon" variant="secondary" class="mt-4">
          Write up coming soon&hellip;
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
import type { ProjectsCollectionItem } from "@nuxt/content";
import { cn } from "~/lib/utils";

interface Props {
  project: ProjectsCollectionItem;
  gridClasses: string;
  backgroundModifiers?: string;
  contentModifiers?: string;
  borderModifiers?: string;
  mediaClasses?: string;
}

withDefaults(defineProps<Props>(), {
  backgroundModifiers: "",
  contentModifiers: "",
  borderModifiers: "",
  mediaClasses: "h-80 object-cover",
});
</script>
