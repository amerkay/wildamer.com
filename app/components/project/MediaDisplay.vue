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
      <img
        :class="cn('w-full', mediaClasses, 'dark:hidden')"
        :src="image"
        :alt="alt"
      />
      <img
        :class="cn('w-full', mediaClasses, 'hidden dark:block')"
        :src="imageDark"
        :alt="alt"
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
