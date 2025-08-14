<template>
  <section>
    <Hero />
    <HowICanHelp />

    <!-- <Container>
      <h1>Welcome to My Vue App</h1>
      <p>This is the home page.</p>
      <Button>Click me</Button>

      <h2>Projects</h2>
      <ul>
        <li v-for="project in projects" :key="project.path">
          <NuxtLink :to="project.path">{{ project.title }}</NuxtLink>
        </li>
      </ul>
    </Container> -->
    <!-- <Intro />
    <HowItWorks /> -->
  </section>
</template>

<script setup lang="ts">
// const { data: projects } = await useAsyncData("projects-list", () => {
//   return queryCollection("projects").all();
// });
</script>
