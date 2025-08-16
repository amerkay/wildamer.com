<script setup lang="ts"></script>

<template>
  <div class="inline-block">
    <div class="flex items-center space-x-2 md:space-x-4">
      <div
        class="logo-circle relative flex items-center justify-center rounded-full border-2 bg-primary transition-all duration-300 ease-in-out overflow-hidden shadow-md hover:shadow-lg"
      >
        <NuxtImg
          class="logo-image w-12 h-12 sm:w-16 sm:h-16 object-contain filter grayscale-[20%] hover:grayscale-0 dark:grayscale-[20%] dark:hover:grayscale-0 transition-all duration-300 ease-in-out hover:scale-105"
          src="/logo.png"
          alt="Logo"
          width="559"
          height="560"
          format="webp"
          quality="90"
          loading="eager"
          sizes="64px md:96px"
        />
      </div>

      <div class="text-block text-left leading-tight">
        <div
          class="font-black text-xl sm:text-3xl text-gray-800 dark:text-gray-100"
        >
          Amer Kawar
        </div>
        <div class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Wildlife Tech Consultant
        </div>
      </div>
    </div>
  </div>
</template>
