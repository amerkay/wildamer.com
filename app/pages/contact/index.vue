<script setup lang="ts">
// Set page meta
definePageMeta({
  title: "Contact Me",
});

useHead({
  title: "Contact Me - Amer Kawar",
  meta: [
    {
      name: "description",
      content:
        "Get in touch for wildlife conservation technology projects, data analysis, and consulting services.",
    },
  ],
});

defineOgImageComponent("OGWildAmer", {
  title: "I'm on a mission to build tech for wildlife conservation!",
  cta: "Message me about your tech needs",
});
</script>

<template>
  <Container>
    <ContactForm />
  </Container>
</template>
