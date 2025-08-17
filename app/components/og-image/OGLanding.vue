<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    centered?: boolean;
  }>(),
  {
    title: "I'm on a mission to build tech for wildlife conservation",
    centered: true,
  }
);
</script>

<template>
  <div
    class="w-full h-full flex flex-row p-10"
    :style="{
      backgroundColor: '#17130f',
      color: 'hsl(60 20% 99.0196%)',
      fontFamily: 'Montserrat, sans-serif',
    }"
  >
    <div
      class="flex flex-col h-full w-full"
      :class="centered ? 'justify-center items-center' : 'justify-center'"
    >
      <!-- Main Content -->
      <div
        class="flex flex-col"
        :class="
          centered
            ? 'justify-center items-center text-center mb-8 max-w-4xl'
            : 'flex-1 justify-start items-start'
        "
      >
        <h1
          class="text-7xl font-normal"
          :style="{
            fontFamily: 'Anton, sans-serif',
            lineHeight: '1.1em',
          }"
        >
          {{ title }}
        </h1>
      </div>

      <!-- Logo and Name Section -->
      <div
        class="text-2xl"
        :class="
          centered
            ? 'flex flex-col justify-center items-center'
            : 'w-full flex flex-row justify-start items-center max-w-lg  gap-6'
        "
      >
        <div
          class="w-24 h-24 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-lg"
          :style="{
            backgroundColor: '#4a7c59',
            borderColor: 'hsla(300, 52%, 90%, 0.7)',
          }"
        >
          <img
            src="/logo.png"
            alt="Logo"
            class="w-24 h-24 object-contain"
            :style="{ filter: 'grayscale(20%)' }"
            width="64"
            height="64"
          />
        </div>

        <!-- Name and about me Section -->
        <div :class="centered ? 'flex flex-col items-center' : '-mt-2'">
          <div
            class="text-4xl font-normal leading-none mb-0 w-full"
            :class="centered ? 'text-center mt-4' : ''"
            :style="{
              fontFamily: 'Anton, sans-serif',
            }"
          >
            Amer Kawar
          </div>

          <p class="my-0">Wildlife Tech Consultant &ndash; WildAmer.com</p>
          <p class="-my-2">15+ YoE software & product engineer</p>
        </div>
      </div>
    </div>
  </div>
</template>
