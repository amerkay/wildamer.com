<script setup lang="ts">
import type { Globals } from "./NavigationBar.vue";
import SocialLinks from "./SocialLinks.vue";

export interface SocialLink {
  service: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  url?: string | null;
}

export interface FooterProps {
  navigation: {
    items: NavigationItem[];
  };
  globals: Globals;
}

const props = defineProps<FooterProps>();
</script>

<template>
  <footer class="dark bg-background border-t">
    <Container class="!py-12 text-foreground dark:text-white">
      <div class="flex flex-col items-start justify-between gap-8 md:flex-row">
        <div class="flex-1">
          <NuxtLink to="/" class="inline-block">
            <Logo />
          </NuxtLink>

          <p
            v-if="props.globals.description"
            ref="description"
            class="text-muted-foreground mt-2"
          >
            <span>
              {{ props.globals.description }}
            </span>
          </p>

          <!-- Social Links -->
          <SocialLinks
            v-if="props.globals.linkedin || props.globals.github"
            :linkedin="props.globals.linkedin"
            :github="props.globals.github"
            class="mt-4"
          />
        </div>

        <div class="flex flex-1 flex-col items-start md:items-end">
          <nav
            v-if="props.navigation.items?.length"
            class="w-full text-left md:w-auto"
          >
            <ul class="space-y-4">
              <li v-for="item in props.navigation.items" :key="item.id">
                <NuxtLink
                  :to="item.url || '#'"
                  class="font-medium hover:underline text-foreground hover:text-primary-foreground"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>

            <ThemeToggle class="mt-4" />
          </nav>
        </div>
      </div>
    </Container>
  </footer>
</template>
