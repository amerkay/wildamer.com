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
const tocRef = ref<HTMLElement>()

// Redirect to home page if on collection root
if (route.path === `/${props.collection}/`) {
  await navigateTo('/')
}

const { data: content } = await useAsyncData(route.path, () => {
  return queryCollection(props.collection).path(route.path).first()
})

// Throw 404 if content not found
if (!content.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

defineOgImageComponent('OGWildAmer', {
  title: content.value?.title,
  image: content.value?.image
})

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description,
  ogType: 'article'
})

function onTocHighlighted(ids: string[]) {
  const firstId = ids[0]
  if (!firstId) return
  const activeLink = tocRef.value?.querySelector(`a[href="#${encodeURIComponent(firstId)}"]`)
  if (activeLink) {
    ;(activeLink as HTMLElement).style.scrollMargin = '3rem'
    setTimeout(() => {
      activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }, 200)
  }
}
</script>

<template>
  <Container v-if="content" width="max" :class="[containerClass, 'pb-32 md:pb-40']">
    <!-- Main content area -->
    <div class="lg:grid lg:grid-cols-[1fr_300px] lg:gap-16">
      <!-- Article content -->
      <div class="max-w-3xl">
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
            v-if="!content.isHideFeaturedImageOnPage && (content.image || content.video)"
            :image="content.image"
            :image-dark="content.imageDark"
            :video="content.video"
            :video-dark="content.videoDark"
            :alt="content.title ?? ''"
            media-classes="border-2 rounded"
          />

          <!-- TOC for mobile (below featured image) -->
          <ContentToc
            v-if="content.body?.toc?.links?.length"
            :links="content.body.toc.links"
            :default-open="false"
            highlight
            class="lg:hidden not-prose my-8"
          />

          <ContentRenderer :value="content" tag="article" />
        </div>
      </div>

      <!-- TOC Sidebar (desktop only) -->
      <aside v-if="content.body?.toc?.links?.length" class="hidden lg:block">
        <div ref="tocRef" class="sticky top-10 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <ContentToc
            :links="content.body.toc.links"
            :default-open="true"
            highlight
            @highlighted="onTocHighlighted"
          />
        </div>
      </aside>
    </div>
  </Container>
</template>
