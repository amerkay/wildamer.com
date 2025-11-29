<script lang="ts" setup></script>

<template>
  <div class="relative w-full">
    <Container class="flex flex-col gap-y-5 lg:flex-row lg:gap-10">
      <div class="flex h-full items-center justify-center lg:w-2/3 xl:w-1/2">
        <div class="text-center lg:text-left">
          <Badge
            to="#"
            variant="outline"
            class="px-3 py-1.5 text-xs font-normal lg:text-sm lg:py-2 flex-wrap tracking-tight"
            >Actively volunteering (no charge) &ndash;
            <NuxtLink to="/contact" class="font-bold">Contact me</NuxtLink>
            <Icon name="lucide:arrow-right" class="ml-0.5 h-4 w-4" />
          </Badge>
          <h1 class="mb-4 mt-7 text-4xl md:text-4xl lg:mb-6 lg:mt-5 xl:text-5xl font-heading">
            I'm on a mission to build tech for wildlife conservation
            <span>👋</span>
          </h1>
          <p class="text-lg text-muted-foreground lg:text-xl">
            I help wildlife NGOs and conservationists with tech solutions that save time and money.
            From CRM integrations to GIS mapping, let's chat about how I can help your org thrive.
          </p>

          <div class="mt-8 grid grid-cols-1 gap-3 lg:flex lg:mt-12">
            <NuxtLink to="#featured-projects">
              <Button size="lg" variant="outline" class="min-w-72 w-full sm:w-auto lg:min-w-auto"
                >My recent projects</Button
              >
            </NuxtLink>
            <NuxtLink to="/contact">
              <Button size="lg" class="min-w-72 w-full sm:w-auto"
                >Let's talk
                <small>(free for non-profits)</small>
              </Button>
            </NuxtLink>
          </div>
          <p class="mt-5 text-sm text-muted-foreground">
            Note: For-profit consultations hourly rate is $150. Please reach out before booking.
          </p>
        </div>
      </div>

      <div
        class="mt-12 lg:mt-0 flex h-full items-center justify-center lg:justify-end lg:w-1/3 xl:w-1/2"
      >
        <WildChat class="max-w-xs h-[600px] xl:max-w-sm xl:h-[550px]" />
      </div>
    </Container>
  </div>
</template>
