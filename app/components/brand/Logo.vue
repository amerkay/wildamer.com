<script setup lang="ts"></script>

<template>
  <div class="inline-block">
    <div class="flex items-center space-x-4">
      <div
        class="logo-circle relative flex items-center justify-center w-16 h-16 rounded-full bg-primary transition-all duration-300 ease-in-out overflow-hidden shadow-md hover:shadow-lg"
      >
        <img
          class="logo-image w-16 h-16 object-contain filter grayscale-[20%] hover:grayscale-0 dark:grayscale-[20%] dark:hover:grayscale-0 transition-all duration-300 ease-in-out hover:scale-105"
          src="/logo.png"
          alt="Logo"
        />
      </div>

      <div class="text-block text-left leading-tight">
        <div class="font-black text-3xl text-gray-800 dark:text-gray-100">
          Amer Kawar
        </div>
        <div class="text-gray-600 dark:text-gray-300">
          Wildlife Tech Consultant
        </div>
      </div>
    </div>
  </div>
</template>
