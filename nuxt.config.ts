import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    // docs @ https://www.shadcn-vue.com/docs/installation/nuxt.html
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    // docs @ https://motion.vueuse.org/getting-started/nuxt
    "@vueuse/motion/nuxt",
  ],

  components: [
    { path: "~/components", pathPrefix: false },
    // { path: "~/components/block", pathPrefix: false, priority: 2 },
    // { path: "~/components/shared", pathPrefix: false },
    // { path: "~/components/base", pathPrefix: false },
    // { path: "~/components/forms", pathPrefix: false },
    {
      path: "~/components/ui",
      extensions: [".vue"],
      pathPrefix: false,
      priority: 1,
    },
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      ignore: [/^\/\.netlify\/images/], // skip Netlify Image CDN endpoints
    },
  },

  content: {
    experimental: { sqliteConnector: "native" },
  },

  image: {
    // provider: "ipxStatic",
    // Default quality for all images
    quality: 85,
    // Predefined screen sizes for responsive images
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    // Default format
    format: ["webp", "png", "jpg"],
    // Densities for high-DPI screens
    densities: [1, 2],
    // Presets for common use cases
    presets: {
      avatar: {
        modifiers: {
          format: "webp",
          width: 44,
          height: 44,
          quality: 85,
        },
      },
      hero: {
        modifiers: {
          format: "webp",
          quality: 85,
        },
      },
      thumbnail: {
        modifiers: {
          format: "webp",
          quality: 80,
        },
      },
    },
  },
});
