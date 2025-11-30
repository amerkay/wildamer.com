<template>
  <div>
    <!-- If explicit video props provided, render them with light/dark variants -->
    <template v-if="video">
      <video
        v-if="videoDark && isDark"
        :class="cn(['w-full', mediaClasses])"
        :src="videoDark"
        autoplay
        loop
        muted
        playsinline
      />
      <video
        v-else
        :class="cn(['w-full', mediaClasses])"
        :src="video"
        autoplay
        loop
        muted
        playsinline
      />
    </template>

    <!-- Handle regular images with light/dark variants -->
    <template v-else>
      <NuxtImg
        v-if="imageDark && isDark"
        :class="cn('w-full', mediaClasses)"
        :src="imageDark"
        :alt="alt"
        format="webp"
        quality="85"
        loading="lazy"
        sizes="100vw sm:80vw md:70vw lg:50vw xl:40vw"
      />
      <NuxtImg
        v-else
        :class="cn('w-full', mediaClasses)"
        :src="image"
        :alt="alt"
        format="webp"
        quality="85"
        loading="lazy"
        sizes="100vw sm:80vw md:70vw lg:50vw xl:40vw"
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
  mediaClasses: 'h-80 object-cover'
})

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>
