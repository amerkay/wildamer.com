<script lang="ts" setup></script>

<template>
  <div class="relative w-full">
    <Container class="flex flex-col gap-y-5 lg:flex-row lg:gap-10 lg:h-[720px]">
      <div class="flex h-full items-center justify-center lg:w-2/3 xl:w-1/2">
        <div class="text-center lg:text-left">
          <!-- <Badge
            to="#"
            variant="outline"
            class="px-3 py-1.5 text-xs font-normal lg:text-sm lg:py-2"
            >Help us protect Barn Owls,
            <NuxtLink to="#" class="font-bold">signup now</NuxtLink>
            <ArrowRight class="ml-1 h-4 w-4"
          /></Badge> -->
          <h1
            class="mb-4 mt-7 text-4xl font-bold md:text-4xl lg:mb-6 lg:mt-5 xl:text-5xl"
          >
            Hi! I'm Amer, Wildlife Conservation Tech Consultant
            <span>👋</span>
          </h1>
          <p class="text-lg text-muted-foreground lg:text-xl">
            Help us conserve Barn Owls by reporting nest sites, roost locations,
            and sightings across the UK. Your observations provide invaluable
            data for conservation efforts.
          </p>
          <div class="mt-8 grid grid-cols-1 gap-3 lg:flex lg:mt-12">
            <NuxtLink to="/public-barn-owl-map">
              <Button size="lg" variant="outline">View Public Map</Button>
            </NuxtLink>
            <NuxtLink to="/my/sightings/new">
              <Button size="lg" class="min-w-56">Report a Sighting</Button>
            </NuxtLink>
          </div>
          <p class="mt-5 text-sm text-muted-foreground">
            Already registered?
            <NuxtLink to="/auth/login" class="font-bold">Log in</NuxtLink> to
            quickly submit reports and view your contributions.
          </p>
        </div>
      </div>

      <div
        class="mt-12 lg:mt-0 flex h-full items-center justify-center lg:justify-end lg:w-1/3 xl:w-1/2"
      >
        <WildChat class="" />
      </div>
    </Container>
  </div>
</template>
