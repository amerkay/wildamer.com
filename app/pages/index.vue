<template>
  <section>
    <Hero />
    <HowICanHelp />
    <FeaturedProjects />
    <FAQ />
    <CTA />
  </section>
</template>

<script setup lang="ts">
defineOgImageComponent("OGLanding", {
  title: "I'm on a mission to build tech for wildlife conservation",
  centered: true,
});
</script>
