<template>
  <div class="border-t">
    <Container>
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2
          class="text-base/7 font-semibold text-primary-600 dark:text-primary-400"
        >
          Three Simple Steps
        </h2>
        <p
          class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white"
        >
          How to Report a Sighting
        </p>
        <!-- <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
          Please report all Barn Owl nests, roost sites, and sightings (dead or
          alive), anywhere in the UK. Thanks.
        </p> -->
      </div>
      <div class="mx-auto mt-16 max-w-2xl lg:max-w-none">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
        >
          <div v-for="step in steps" :key="step.name" class="flex flex-col">
            <dt
              class="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white"
            >
              <Icon
                :name="step.icon"
                class="size-5 flex-none text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              />
              {{ step.name }}
            </dt>
            <dd
              class="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400"
            >
              <p class="flex-auto">{{ step.description }}</p>
              <p class="mt-6">
                <NuxtLink :to="step.href" class="font-bold">
                  <!-- <Button variant="link"> -->
                  {{ step.linkText }}
                  <span aria-hidden="true">→</span>
                  <!-- </Button> -->
                </NuxtLink>
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  </div>
</template>

<script setup>
const steps = [
  {
    name: "1. Learn to Identify Barn Owls",
    description:
      "Just to make sure the bird you saw really was a Barn Owl. Pellet identification and owl sounds included.",
    linkText: "Owl Identification Guide",
    href: "#",
    icon: "lucide:search",
  },
  {
    name: "2. Complete the form",
    description:
      "Complete our short survey form. Now, mobile friendly, with automatic location detection.",
    linkText: "Survey Form",
    href: "#",
    icon: "lucide:file-text",
  },
  {
    name: "3. Signup",
    description:
      "Signup to make your future reporting even quicker and view your submissions.",
    linkText: "Signup",
    href: "/auth/signup",
    icon: "lucide:user-plus",
  },
];
</script>
