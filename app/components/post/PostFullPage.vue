<script lang="ts" setup>
interface Props {
  collection: 'project' | 'article'
  containerWidth?: 'sm' | 'md' | 'max'
  containerClass?: string
  showTitle?: boolean
  showDescription?: boolean
  showMedia?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  containerWidth: 'md',
  containerClass: '',
  showTitle: false,
  showDescription: false,
  showMedia: false
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
  <Container :width="containerWidth" :class="containerClass">
    <div
      v-if="content"
      class="prose md:prose-lg lg:prose-xl prose-stone dark:prose-invert max-w-none mb-6"
    >
      <h1 v-if="showTitle">{{ content.title }}</h1>
      <p v-if="showDescription" class="opacity-90">{{ content.description }}</p>

      <MediaDisplay
        v-if="showMedia"
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
