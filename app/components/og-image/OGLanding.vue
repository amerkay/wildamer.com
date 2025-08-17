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
    class="w-full h-full flex flex-row p-10 relative overflow-hidden"
    :style="{
      backgroundColor: '#17130f',
      color: 'hsl(60 20% 99.0196%)',
      fontFamily: 'Montserrat, sans-serif',
    }"
  >
    <!-- Floating animal avatars (curved wind path, spaced out) -->
    <img
      src="/imgs/avatar-barnowl.jpg"
      alt="Barn Owl"
      class="absolute -top-2 right-4 w-28 h-28 rounded-full object-cover border-4 shadow-lg opacity-80"
      :style="{ borderColor: 'hsl(26 17% 20%)' }"
      width="112"
      height="112"
    />
    <img
      src="/imgs/avatar-flyingfox.jpg"
      alt="Flying Fox"
      class="absolute top-28 -right-4 w-26 h-26 rounded-full object-cover border-4 shadow-lg opacity-70"
      :style="{ borderColor: 'hsl(26 17% 20%)' }"
      width="128"
      height="128"
    />
    <img
      src="/imgs/avatar-flyingfox2.jpg"
      alt="Flying Fox Gliding"
      class="absolute top-76 -right-2 w-24 h-24 rounded-full object-cover border-4 shadow-lg opacity-60"
      :style="{ borderColor: 'hsl(26 17% 20%)' }"
      width="96"
      height="96"
    />
    <img
      src="/imgs/avatar-hedgehog.jpg"
      alt="Hedgehog"
      class="absolute top-54 right-8 w-24 h-24 rounded-full object-cover border-4 shadow-lg opacity-65"
      :style="{ borderColor: 'hsl(26 17% 20%)' }"
      width="100"
      height="100"
    />
    <img
      src="/imgs/avatar-seal.jpg"
      alt="Seal"
      class="absolute -bottom-3 -right-3 w-28 h-28 rounded-full object-cover border-4 shadow-lg opacity-75"
      :style="{ borderColor: 'hsl(26 17% 20%)' }"
      width="112"
      height="112"
    />
    <img
      src="/imgs/avatar-elephant.png"
      alt="Elephant"
      class="absolute bottom-22 right-4 w-28 h-28 rounded-full object-cover border-4 shadow-lg opacity-75"
      :style="{ borderColor: 'hsl(26 17% 20%)' }"
      width="125"
      height="125"
    />

    <!-- Main content wrapper -->
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

          <p class="my-0" :class="centered ? 'text-center' : ''">
            Wildlife Tech Consultant &ndash; WildAmer.com
          </p>
          <p class="-my-2" :class="centered ? 'text-center' : ''">
            15+ YoE software & product engineer
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
