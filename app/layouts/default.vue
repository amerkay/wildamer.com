<script setup lang="ts">
import { useHead } from "#app";
import { Toaster } from "@/components/ui/sonner";
import { computed } from "vue";

const siteData = {
  headerNavigation: {
    items: [
      {
        id: "home",
        title: "Home",
        url: "/",
      },
      {
        id: "contact",
        title: "Contact Me",
        url: "/contact",
      },
    ],
  },
  footerNavigation: {
    items: [
      {
        id: "home",
        title: "Home",
        url: "/",
      },
      {
        id: "contact",
        title: "Contact Me",
        url: "/contact",
      },
    ],
  },
  globals: {
    title: "Amer Kawar - Wildlife Conservation Tech Consultant",
    description:
      "Explore my work in wildlife conservation technology, including projects on data analysis, and all things tech.",
    logo: {},
    logo_dark_mode: {},
    favicon: "",
  },
};

const finalSiteData = computed(() => siteData);

const headerNavigation = computed(() => {
  return finalSiteData.value?.headerNavigation || { items: [] };
});
const footerNavigation = computed(
  () => finalSiteData.value?.footerNavigation || { items: [] }
);
const globals = computed(
  () => finalSiteData.value?.globals || siteData.globals
);

const siteTitle = computed(() => globals.value?.title || "Unknown");
const siteDescription = computed(() => globals.value?.description || "");
const faviconURL = computed(
  () => "/favicon.ico"
  //   globals.value?.favicon
  //     ? `${directusUrl}/assets/${globals.value.favicon}?height=100`
  //     : "/favicon.ico"
);

useHead({
  titleTemplate: (pageTitle) =>
    pageTitle ? `${pageTitle} | ${siteTitle.value}` : siteTitle.value,
  meta: [
    { name: "description", content: siteDescription },
    { property: "og:title", content: siteTitle },
    { property: "og:description", content: siteDescription },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: faviconURL }],
});
</script>

<template>
  <div>
    <NavigationBar :navigation="headerNavigation" :globals="globals" />
    <NuxtPage class="min-h-[65vh]" />
    <Footer :navigation="footerNavigation" :globals="globals" />
    <Toaster />
  </div>
</template>
