<template>
  <div class="overflow-hidden border-t">
    <Container>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <div class="lg:pt-4 lg:pr-8 lg:col-span-3">
          <div class="w-full">
            <h2
              class="text-base/7 font-semibold text-primary-600 dark:text-primary-400"
            >
              Conservation Mission
            </h2>
            <p
              class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white"
            >
              Help Protect Barn Owls
            </p>
            <p class="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              As spring begins, paired Barn Owls will roost together in a
              potential nest site. If the pair are successful then eggs will
              follow, sometimes in March, more often in April, but also in May
              or summer. The site will usually be familiar to one or both owls,
              and an established pair will have bred there over consecutive
              years. This is because Barn Owls are highly site faithful.
            </p>
            <p class="mt-4 text-lg/8 text-gray-700 dark:text-gray-300">
              Barn Owls are most sensitive to disturbance when they are just
              beginning to breed, so care must be taken around their nest sites.
              Recording a Barn Owl nest site on this survey provides incredibly
              valuable information that enables us to promote their conservation
              during a critical time.
            </p>
            <p class="mt-4">
              <NuxtLink to="/auth/signup">
                <Button size="lg"> Sign Up to Report Sightings </Button>
              </NuxtLink>
            </p>
          </div>
        </div>
        <img
          src="/imgs/BAROW-Owlet-on-branch-Richard-Tadman-B-CROPPED-OWLETS-PAGE-scaled-1.jpg"
          alt="Product screenshot"
          class="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0 dark:ring-white/10 max-w-xl lg:col-span-2"
          width="2513"
          height="2560"
        />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts"></script>
