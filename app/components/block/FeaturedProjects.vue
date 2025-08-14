<template>
  <section id="featured-projects" class="bg-background border-t">
    <Container>
      <h2
        class="text-base/7 font-semibold text-secondary-foreground dark:text-secondary"
      >
        Featured projects
      </h2>
      <p
        class="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
      >
        Time &amp; money saving projects I worked on for non-profits
      </p>
      <div
        v-if="featuredProjects && featuredProjects.length > 0"
        class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6"
      >
        <ProjectCard
          v-for="(project, index) in featuredProjects"
          :key="project.path || index"
          :project="project"
          :grid-classes="cardLayouts[index]?.gridClasses || ''"
          :background-modifiers="cardLayouts[index]?.backgroundModifiers"
          :content-modifiers="cardLayouts[index]?.contentModifiers"
          :border-modifiers="cardLayouts[index]?.borderModifiers"
          :media-classes="
            cardLayouts[index]?.mediaClasses || 'h-80 object-cover'
          "
        />
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
const { data: featuredProjects } = await useAsyncData(
  "featured-projects",
  () => {
    return queryCollection("projects")
      .where("isFeatured", "=", true)
      .order("featuredOrder", "ASC")
      .order("date", "DESC")
      .limit(5)
      .all();
  }
);

// Define layout configurations for each card position
const cardLayouts = [
  // First card (top-left, large)
  {
    gridClasses: "lg:col-span-3",
    backgroundModifiers: "max-lg:rounded-t-4xl lg:rounded-tl-4xl",
    contentModifiers:
      "max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]",
    borderModifiers: "max-lg:rounded-t-4xl lg:rounded-tl-4xl",
    mediaClasses: "h-80 object-cover object-bottom",
  },
  // Second card (top-right, large)
  {
    gridClasses: "lg:col-span-3",
    backgroundModifiers: "lg:rounded-tr-4xl",
    contentModifiers: "lg:rounded-tr-[calc(2rem+1px)]",
    borderModifiers: "lg:rounded-tr-4xl",
    mediaClasses: "h-80 object-cover object-bottom",
  },
  // Third card (bottom-left, small)
  {
    gridClasses: "lg:col-span-2",
    backgroundModifiers: "lg:rounded-bl-4xl",
    contentModifiers: "lg:rounded-bl-[calc(2rem+1px)]",
    borderModifiers: "lg:rounded-bl-4xl",
    mediaClasses: "h-80 object-cover object-bottom",
  },
  // Fourth card (bottom-center, small)
  {
    gridClasses: "lg:col-span-2",
    backgroundModifiers: "",
    contentModifiers: "",
    borderModifiers: "",
    mediaClasses: "h-80 object-cover object-bottom",
  },
  // Fifth card (bottom-right, small)
  {
    gridClasses: "lg:col-span-2",
    backgroundModifiers: "max-lg:rounded-b-4xl lg:rounded-br-4xl",
    contentModifiers:
      "max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]",
    borderModifiers: "max-lg:rounded-b-4xl lg:rounded-br-4xl",
    mediaClasses: "h-80 object-cover object-bottom",
  },
];
</script>
