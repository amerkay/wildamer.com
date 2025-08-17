<script setup lang="ts">
const { className = "" } = defineProps<{ className?: string }>();

const colorMode = useColorMode();
const isDark = computed(
  () =>
    colorMode.preference === "dark" ||
    (colorMode.preference === "system" && colorMode.value === "dark")
);

const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};

// To prevent hydration mismatch, we'll show a default state during SSR
const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <Button
    id="theme-toggle"
    variant="outline"
    aria-label="Toggle Dark Mode"
    :class="['size-10 ', className]"
    @click="toggleTheme"
  >
    <!-- Show consistent icon during SSR, then switch to dynamic on client -->
    <div class="flex items-center justify-center">
      <Icon
        v-if="!isClient || !isDark"
        name="lucide:sun"
        class="h-7 w-7"
        size="20"
      />
      <Icon v-else name="lucide:moon" class="h-7 w-7" size="20" />
    </div>
  </Button>
</template>
