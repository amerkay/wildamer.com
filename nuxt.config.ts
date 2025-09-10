import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    "nuxt-og-image",
    "@nuxtjs/seo",
  ],
  ssr: true,

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
  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  site: {
    url: "https://wildamer.com",
    name: "Amer Kawar - Wildlife Conservation Tech Consultant",
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  content: {
    experimental: { sqliteConnector: "native" },
  },
  compatibilityDate: "2025-07-15",
  nitro: {
    prerender: {
      ignore: [/^\/\.netlify\/images/], // skip Netlify Image CDN endpoints
    },
  },
  vite: {
    plugins: [tailwindcss()],
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

  ogImage: {
    fonts: ["Anton:400", "Montserrat:400", "Montserrat:700"],
    zeroRuntime: true,

    defaults: {
      cacheMaxAgeSeconds: 60,
      component: "OGWildAmer",
    },
  },

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
});
