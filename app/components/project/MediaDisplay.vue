<template>
  <div>
    <!-- Handle .webm video files -->
    <video
      v-if="image?.endsWith('.webm')"
      :class="cn(['w-full', mediaClasses])"
      autoplay
      loop
      muted
      playsinline
    >
      <source :src="image" type="video/webm" />
    </video>
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
