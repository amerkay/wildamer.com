<template>
  <section>
    <Hero />
    <!-- <HowICanHelp /> -->
    <PostFeaturedBento
      collection-type="article"
      pre-heading="Featured articles"
      heading="Insights and guides for non-profit organizations"
      class="dark"
    />

    <PostFeaturedBento
      collection-type="project"
      pre-heading="Featured projects"
      heading="Time &amp; money saving projects I worked on for wildlife conservation"
    />

    <FAQ />
    <CTA />
  </section>
</template>

<script setup lang="ts">
defineOgImageComponent('OGWildAmer', {
  title: "I'm on a mission to build tech for wildlife conservation!",
  cta: 'I can be your tech consultant volunteer'
})
</script>
