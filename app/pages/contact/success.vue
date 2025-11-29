<script setup lang="ts">
// Set page meta
definePageMeta({
  title: 'Message Sent Successfully'
})

useHead({
  title: 'Message Sent Successfully'
})
</script>

<template>
  <Container>
    <div class="max-w-2xl mx-auto text-center py-16">
      <div class="mb-8">
        <Icon name="lucide:circle-check" class="text-primary mx-auto mb-4" size="64" />
        <h1 class="text-4xl font-heading tracking-tight mb-4">Message Sent Successfully!</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Thank you for reaching out. I've received your message and will get back to you as soon as
          possible.
        </p>
      </div>

      <div class="space-y-4">
        <NuxtLink to="/">
          <Button variant="default" class="w-full sm:w-auto"> Return to Home </Button>
        </NuxtLink>
      </div>
    </div>
  </Container>
</template>
