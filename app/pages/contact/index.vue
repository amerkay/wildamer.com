<script setup lang="ts">
defineOgImageComponent('OGWildAmer', {
  title: "I'm on a mission to build tech for wildlife conservation!",
  cta: 'Message me about your tech needs'
})

useSeoMeta({
  title: 'Contact me',
  description:
    'Get in touch for wildlife conservation technology projects, data analysis, and consulting services.',
  ogType: 'website'
})
</script>

<template>
  <Container>
    <ContactForm />
  </Container>
</template>
