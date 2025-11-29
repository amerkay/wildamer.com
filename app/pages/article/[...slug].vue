<script lang="ts" setup>
const route = useRoute();

// Redirect to home page if on /article/
if (route.path === "/article/") {
  await navigateTo("/");
}

const { data: article } = await useAsyncData(route.path, () => {
  return queryCollection("article").path(route.path).first();
});

defineOgImageComponent("OGWildAmer", {
  title: article.value?.title,
  // image: article.value?.image,
});

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
  ogType: "article",
});
</script>

<template>
  <Container width="md" class="py-16">
    <div v-if="article" class="prose md:prose-lg lg:prose-xl prose-stone dark:prose-invert max-w-none mb-6">
      <h1>{{ article.title }}</h1>
      <p class="opacity-90">{{ article.description }}</p>

      <MediaDisplay :image="article.image" :image-dark="article.imageDark" :video="article.video"
        :video-dark="article.videoDark" :alt="article.title ?? ''" media-classes="border-2 rounded" />

      <ContentRenderer :value="article" tag="article" />
    </div>
  </Container>
</template>
