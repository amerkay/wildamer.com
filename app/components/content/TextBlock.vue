<script lang="ts" setup></script>

<template>
  <div class="!my-8 rounded border-2 border-border bg-card p-6 md:p-8 shadow-sm dark:bg-card/50">
    <div id="text-block-content">
      <slot />
    </div>
  </div>
</template>

<style>
#text-block-content p:first-child {
  margin-top: 0 !important;
}
</style>
