<script lang="ts" setup>
interface Props {
  collection: 'project' | 'article'
  containerWidth?: 'sm' | 'md' | 'max'
  containerClass?: string
  showTitle?: boolean
  showDescription?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  containerWidth: 'md',
  containerClass: '',
  showTitle: false,
  showDescription: false
})

const route = useRoute()

// Redirect to home page if on collection root
if (route.path === `/${props.collection}/`) {
  await navigateTo('/')
}

const { data: content } = await useAsyncData(route.path, () => {
  return queryCollection(props.collection).path(route.path).first()
})

defineOgImageComponent('OGWildAmer', {
  title: content.value?.title,
  image: content.value?.image
})

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description,
  ogType: 'article'
})
</script>

<template>
  <Container v-if="content" :width="containerWidth" :class="containerClass">
    <h1 v-if="showTitle" class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading">
      {{ content.title }}
    </h1>

    <PostByLine
      :published-at="content.publishedAt"
      :updated-at="content.updatedAt"
      :tags="content.tags"
    />

    <div class="prose md:prose-lg lg:prose-xl prose-stone dark:prose-invert max-w-none mb-6">
      <p v-if="showDescription" class="opacity-90">{{ content.description }}</p>

      <MediaDisplay
        v-if="!content.isHideFeaturedImageOnPage"
        :image="content.image"
        :image-dark="content.imageDark"
        :video="content.video"
        :video-dark="content.videoDark"
        :alt="content.title ?? ''"
        media-classes="border-2 rounded"
      />

      <ContentRenderer :value="content" tag="article" />
    </div>
  </Container>
</template>
