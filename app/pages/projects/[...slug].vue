<script lang="ts" setup>
const route = useRoute();

// Redirect to home page if on /projects/
if (route.path === "/projects/") {
  await navigateTo("/");
}

const { data: project } = await useAsyncData(route.path, () => {
  return queryCollection("projects").path(route.path).first();
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
  <Container>
    <!-- <pre>{{ project }}</pre> -->
    <ContentRenderer v-if="project" :value="project" />
  </Container>
</template>
