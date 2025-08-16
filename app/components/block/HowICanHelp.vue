<template>
  <section class="bg-primary/4 dark:bg-primary/2 border-t text-foreground">
    <Container>
      <!-- <p class="font-semibold text-muted-foreground max-w-2xl">
        15+ years of experience as a full-stack software & product engineer
        means I can help you with anything tech!
        <NuxtLink to="https://www.linkedin.com/in/amerkawar" target="_blank"
          >LinkedIn</NuxtLink
        >
      </p> -->

      <h2
        class="mb-4 mt-3 text-4xl font-heading lg:mb-5 lg:text-5xl text-foreground max-w-2xl"
      >
        I'm offering to be your tech consultant volunteer.
      </h2>

      <p class="max-w-2xl text-lg lg:text-xl text-muted-foreground">
        15+ years of experience as a full-stack software & product engineer
        means I can help you with anything tech!
        <!-- <NuxtLink to="https://www.linkedin.com/in/amerkawar" target="_blank"
          >CV on LinkedIn</NuxtLink
        > -->
      </p>

      <div
        class="grid grid-cols-1 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16"
      >
        <template v-for="(f, i) in features" :key="i">
          <div
            v-if="i < 3 || showAllFeatures"
            class="group flex flex-col items-center justify-start transition-all duration-500 ease-in-out"
            :class="{
              'animate-slide-up': showAllFeatures && i >= 3,
            }"
            :style="`animation-delay: ${(i - 3) * 100}ms`"
          >
            <div
              class="flex p-4 items-center justify-center rounded-md border border-secondary"
            >
              <Icon
                :name="f.icon"
                size="24"
                class="h-52 w-52 transition-transform duration-300 text-secondary-foreground dark:text-white/90 transform group-hover:scale-110"
              />
            </div>
            <h3
              class="mt-4 text-balance text-center text-lg font-semibold lg:mt-5 lg:text-xl text-secondary-foreground dark:text-secondary"
            >
              {{ f.title }}
            </h3>
            <p
              class="mt-1 max-w-[400px] text-balance text-center text-muted-foreground lg:mt-2"
            >
              {{ f.description }}
            </p>
          </div>
        </template>
      </div>

      <div v-if="!showAllFeatures" class="flex justify-center pb-10">
        <Button variant="outline" @click="showAllFeatures = true">
          I can do a lot more!

          <Icon name="lucide:chevron-down" class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Container>
  </section>
</template>

<script lang="ts" setup>
const showAllFeatures = ref(false);

const features = [
  {
    icon: "lucide:users",
    title: "CRM setup & configuration (Salesforce, CiviCRM)",
    description:
      "Streamline your team's efforts with properly configured systems.",
  },
  {
    icon: "lucide:bar-chart-2",
    title: "Constituent segmentation & marketing automation",
    description:
      "Target your emails and ads more effectively with smart audience grouping.",
  },
  {
    icon: "lucide:map",
    title: "Interactive maps for sightings & landscapes",
    description:
      "Visualize your data on ArcGIS, or the free open-source Kepler.GL.",
  },
  {
    icon: "lucide:mail",
    title: "Email automation",
    description:
      "Set up automated donation follow-ups, reminders, and other repetitive communications.",
  },
  {
    icon: "lucide:file-text",
    title: "PDF template automation",
    description:
      "Personalize adoption kits, certificates, and letters automatically.",
  },
  {
    icon: "lucide:dollar-sign",
    title: "$10,000 Google AdGrant optimization",
    description:
      "Connect people to rescuers with 5%+ CTR through keyword and geo-targeting.",
  },
  {
    icon: "lucide:clipboard",
    title: "Volunteer onboarding system",
    description:
      "Easy-to-fill forms with seamless integration to Salesforce or other CRM.",
  },
  {
    icon: "lucide:heart",
    title: "Rescue management CRM",
    description:
      "Track intakes, species, condition, and outcomes in one organized system.",
  },
  {
    icon: "lucide:infinity",
    title: "And more…",
    description:
      "If it makes you more efficient at running your conservation non-profit, I can build it.",
  },
];
</script>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
  opacity: 0;
}
</style>
