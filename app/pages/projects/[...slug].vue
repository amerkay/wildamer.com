<script lang="ts" setup>
const route = useRoute();

// Redirect to home page if on /projects/
if (route.path === "/projects/") {
  await navigateTo("/");
}

const { data: project } = await useAsyncData(route.path, () => {
  return queryCollection("projects").path(route.path).first();
});
</script>

<template>
  <div>
    <ContentRenderer v-if="project" :value="project" />
  </div>
</template>
