<script setup lang="ts"></script>

<template>
  <div class="inline-block">
    <div
      class="logo-circle relative flex items-center justify-center w-16 h-16 rounded-full bg-primary transition-all duration-300 ease-in-out overflow-hidden shadow-md hover:shadow-lg"
    >
      <img
        class="logo-image w-16 h-16 object-contain transition-all duration-300 ease-in-out hover:scale-105"
        src="/logo.png"
        alt="Logo"
      />
    </div>
  </div>
</template>

<style scoped>
.logo-image {
  /* Grayscale effect - make image grayscale on colored background */
  filter: grayscale(20%);
}

.logo-circle:hover .logo-image {
  /* Remove grayscale effect on hover - restore original colors */
  filter: grayscale(0%);
}

/* Dark mode adjustments */
.dark .logo-image {
  /* In dark mode, also use grayscale */
  filter: grayscale(20%);
}

.dark .logo-circle:hover .logo-image {
  /* Remove grayscale effect on hover in dark mode too */
  filter: grayscale(0%);
}
</style>
