<template>
  <div>
    <!-- If explicit video props provided, render them with light/dark variants -->
    <template v-if="video">
      <video
        :class="cn(['w-full', mediaClasses, 'dark:hidden'])"
        :src="video"
        autoplay
        loop
        muted
        playsinline
      />
      <video
        v-if="videoDark"
        :class="cn(['w-full', mediaClasses, 'hidden dark:block'])"
        :src="videoDark"
        autoplay
        loop
        muted
        playsinline
      />
    </template>

    <!-- Handle regular images with light/dark variants -->
    <template v-else>
      <NuxtImg
        v-if="image"
        :class="cn('w-full', mediaClasses, 'dark:hidden')"
        :src="image"
        :alt="alt"
        format="webp"
        quality="85"
        loading="lazy"
        sizes="sm:100vw md:900px lg:1400px"
        densities="1,2"
        placeholder="blur"
      />
      <NuxtImg
        v-if="imageDark"
        :class="cn('w-full', mediaClasses, 'hidden dark:block dark:opacity-100!')"
        :src="imageDark"
        :alt="alt"
        format="webp"
        quality="85"
        loading="lazy"
        sizes="sm:100vw md:900px lg:1400px"
        densities="1,2"
        placeholder="blur"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  image?: string
  imageDark?: string
  video?: string
  videoDark?: string
  alt?: string
  mediaClasses?: string
}

withDefaults(defineProps<Props>(), {
  image: undefined,
  imageDark: undefined,
  video: undefined,
  videoDark: undefined,
  alt: undefined,
  mediaClasses: 'h-80 object-cover object-top'
})
</script>
