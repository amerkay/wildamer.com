<script lang="ts" setup>
const route = useRoute();

// Redirect to home page if on /project/
if (route.path === "/project/") {
  await navigateTo("/");
}

const { data: project } = await useAsyncData(route.path, () => {
  return queryCollection("project").path(route.path).first();
});

defineOgImageComponent("OGWildAmer", {
  title: project.value?.title,
  image: project.value?.image,
});

useSeoMeta({
  title: project.value?.title,
  description: project.value?.description,
  ogType: "article",
});
</script>

<template>
  <Container width="md">
    <ContentRenderer v-if="project" :value="project" tag="article"
      class="prose prose-lg md:prose-xl prose-stone dark:prose-invert max-w-none mb-6" />
  </Container>
</template>
