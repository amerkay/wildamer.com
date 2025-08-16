<template>
  <div>
    <!-- Handle .webm video files -->
    <template v-if="image?.endsWith('.webm')">
      <video
        :class="cn(['w-full', mediaClasses, 'dark:hidden'])"
        :src="image"
        autoplay
        loop
        muted
        playsinline
      />
      <video
        v-if="imageDark"
        :class="cn(['w-full', mediaClasses, 'hidden dark:block'])"
        :src="imageDark"
        autoplay
        loop
        muted
        playsinline
      />
    </template>
    <!-- Handle regular images with light/dark variants -->
    <template v-else>
      <NuxtImg
        :class="cn('w-full', mediaClasses, 'dark:hidden')"
        :src="image"
        :alt="alt"
        format="webp"
        quality="85"
        loading="lazy"
        sizes="100vw sm:80vw md:70vw lg:50vw xl:40vw"
      />
      <NuxtImg
        v-if="imageDark"
        :class="cn('w-full', mediaClasses, 'hidden dark:block')"
        :src="imageDark"
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
import { cn } from "~/lib/utils";

interface Props {
  image: string;
  imageDark?: string;
  alt: string;
  mediaClasses?: string;
}

withDefaults(defineProps<Props>(), {
  imageDark: undefined,
  mediaClasses: "h-80 object-cover",
});
</script>
