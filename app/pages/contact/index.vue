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
</script>

<template>
  <Container>
    <ContactForm />
  </Container>
</template>
