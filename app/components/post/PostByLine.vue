<template>
  <div class="mt-4 md:mt-6 mb-8 pb-3 border-b">
    <div class="flex items-start gap-4 text-sm w-full">
      <MeAvatar class="size-10 shrink-0" />
      <div class="">
        <p class="font-medium text-foreground">Amer Kawar</p>

        <time
          v-if="publishedAt || updatedAt"
          :datetime="displayDate.toISOString()"
          class="text-muted-foreground"
        >
          <span v-if="updatedAt && updatedAt !== publishedAt">Updated </span>
          {{
            displayDate.toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }}
        </time>
      </div>
    </div>

    <div v-if="tags && tags.length > 0" class="mt-3 flex items-center gap-2 flex-wrap">
      <Badge v-for="tag in tags" :key="tag" variant="outline">
        {{ tag }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  publishedAt?: string | Date
  updatedAt?: string | Date
  tags?: string[]
}

const props = defineProps<Props>()

const displayDate = computed(() => {
  if (props.updatedAt && props.updatedAt !== props.publishedAt) {
    return new Date(props.updatedAt)
  }
  return new Date(props.publishedAt || new Date())
})
</script>
