<template>
  <section>
    <Hero />

    <FAQ class="bg-secondary/20 dark:bg-background-darker!" />
    <CTA />

    <PostFeaturedBento
      collection-type="article"
      pre-heading="Featured articles"
      heading="Insights and guides for non-profit organizations"
      class=""
    />

    <PostFeaturedBento
      collection-type="project"
      pre-heading="Featured projects"
      heading="Time &amp; money saving projects I worked on for wildlife conservation"
      class="bg-secondary/20 dark:bg-background!"
    />

    <!-- <HowICanHelp /> -->
  </section>
</template>

<script setup lang="ts">
defineOgImageComponent('OGWildAmer', {
  title: "I'm on a mission to build tech for wildlife conservation!",
  cta: 'I can be your tech consultant volunteer'
})
</script>
