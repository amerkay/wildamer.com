<template>
  <div class="dark bg-background text-foreground border-t">
    <Container class="py flex flex-col items-center py-16 text-center lg:py-24">
      <h3 class="mb-4 text-3xl md:mb-5 md:text-4xl font-heading">
        I'd love to hear from you!
      </h3>
      <p class="text-lg text-muted-foreground md:text-xl">
        If you like my conservation mission, contact me, I can be your tech
        consultant volunteer
      </p>
      <div
        class="mt-8 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row"
      >
        <!-- <Button size="lg" class="w-full lg:w-auto" variant="outline"
        >Learn more</Button
      > -->
        <NuxtLink to="/contact">
          <Button
            size="xl"
            class="min-w-xs w-full lg:w-auto"
            variant="secondary"
            >Contact me</Button
          >
        </NuxtLink>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup></script>
