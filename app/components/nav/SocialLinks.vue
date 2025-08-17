<script setup lang="ts">
import { Button } from "@/components/ui/button";

const props = defineProps<{
  linkedin?: string;
  github?: string;
}>();
</script>

<template>
  <div v-bind="$attrs" class="flex items-center space-x-2">
    <Button
      v-if="props.linkedin"
      as="a"
      variant="outline"
      size="lg"
      :href="props.linkedin"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      title="LinkedIn"
      class="size-10 p-0"
    >
      <Icon name="lucide:linkedin" class="size-6 text-current" size="20" />
    </Button>

    <Button
      v-if="props.github"
      as="a"
      variant="outline"
      size="lg"
      :href="props.github"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      title="GitHub"
      class="size-10 p-0"
    >
      <Icon name="lucide:github" class="size-6" size="20" />
    </Button>
  </div>
</template>

<style scoped></style>
