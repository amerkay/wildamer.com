<template>
  <section class="bg-background border-t text-foreground">
    <Container>
      <!-- <p class="text-center font-semibold text-muted-foreground">
        Currently, accepting non-profits to be your volunteer tech consultant
      </p> -->

      <h2
        class="mb-4 mt-3 text-4xl font-black lg:mb-5 lg:text-5xl text-foreground max-w-2xl"
      >
        I'm offering to be your tech consultant volunteer.
      </h2>

      <p class="max-w-2xl text-lg lg:text-xl text-primary">
        I can help you modernize your tech stack, saving you time and money
      </p>

      <div
        class="grid grid-cols-1 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16"
      >
        <template v-for="(f, i) in displayedFeatures" :key="i">
          <div class="group flex flex-col items-center justify-start">
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
          Show me more ways you can help
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

const displayedFeatures = computed(() => {
  return showAllFeatures.value ? features : features.slice(0, 3);
});
</script>
