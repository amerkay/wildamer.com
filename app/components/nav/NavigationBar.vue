<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

interface NavigationItem {
  id: string;
  title: string;
  url?: string;
  variant?: string;
  children?: NavigationItem[];
  isDropdown?: boolean;
}

interface Navigation {
  items: NavigationItem[];
}

export interface Globals {
  title: string;
  description: string;
  linkedin?: string;
  github?: string;
}

const _props = defineProps<{
  navigation: Navigation;
  globals: Globals;
}>();

// Common styles
const getItemClasses = (
  isActive: boolean,
  variant?: string,
  isMobile = false
) => {
  const base = isMobile
    ? "block rounded-md px-3 py-2 text-base font-medium"
    : "rounded-md px-3 py-2 text-base font-medium";

  if (variant === "primary") {
    return [
      isActive
        ? "bg-primary text-primary-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary/90",
      base,
    ];
  }

  return [
    isActive
      ? "bg-secondary text-secondary-foreground"
      : "text-foreground hover:bg-secondary hover:text-secondary-foreground",
    base,
  ];
};

const getDropdownClasses = (active: boolean) => [
  active ? "bg-secondary text-secondary-foreground" : "text-card-foreground",
  "block px-4 py-2 text-base",
];
</script>

<template>
  <Disclosure
    v-slot="{ open, close }"
    class="dark top-0 z-50 w-full bg-background text-foreground border-b"
    as="header"
  >
    <Container class="!py-0">
      <div class="relative flex h-24 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary hover:text-secondary-foreground focus:ring-2 focus:ring-primary focus:outline-none focus:ring-inset"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Icon
              v-if="!open"
              name="lucide:menu"
              class="block"
              size="24"
              aria-hidden="true"
            />
            <Icon
              v-else
              name="lucide:x"
              class="block"
              aria-hidden="true"
              size="24"
            />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <NuxtLink class="flex shrink-0 items-center" to="/" @click="close">
            <Logo />
          </NuxtLink>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="flex space-x-1">
              <template v-for="item in navigation.items" :key="item.id">
                <!-- Dropdown menus -->
                <Menu
                  v-if="item.children?.length || item.isDropdown"
                  class="relative"
                  as="div"
                >
                  <div>
                    <MenuButton
                      class="inline-flex items-center justify-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary hover:text-secondary-foreground focus:outline-none"
                    >
                      <span>{{ item.title }}</span>
                      <Icon
                        name="lucide:chevron-down"
                        class="-mr-1 ml-1 size-4 text-current/70"
                        aria-hidden="true"
                        size="18"
                      />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 min-w-[200px] origin-top-right rounded-md bg-card py-1 text-card-foreground shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      <MenuItem
                        v-for="child in item.children"
                        v-slot="{ active, close: closeMenu }"
                        :key="child.id"
                      >
                        <NuxtLink
                          :to="child.url || '#'"
                          :class="getDropdownClasses(active)"
                          @click.capture="closeMenu"
                        >
                          {{ child.title }}
                        </NuxtLink>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>

                <!-- Regular navigation items -->
                <NuxtLink
                  v-else
                  v-slot="{ isActive, href, navigate }"
                  :to="item.url || '#'"
                  custom
                >
                  <a
                    :href="href"
                    :class="getItemClasses(isActive, item.variant)"
                    :aria-current="isActive ? 'page' : undefined"
                    @click="navigate"
                  >
                    {{ item.title }}
                  </a>
                </NuxtLink>
              </template>
            </div>
          </div>

          <!-- Social icons (desktop) -->
          <SocialLinks
            class="hidden sm:block mx-6"
            :linkedin="globals?.linkedin"
            :github="globals?.github"
          />

          <ThemeToggle />
        </div>
      </div>
    </Container>

    <DisclosurePanel class="border-t border-border sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <template v-for="item in navigation.items" :key="item.id">
          <!-- Mobile dropdown menus -->
          <div v-if="item.children?.length" class="space-y-1">
            <Disclosure v-slot="{ open: childOpen }">
              <DisclosureButton
                class="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary hover:text-secondary-foreground"
              >
                <span>{{ item.title }}</span>
                <Icon
                  :name="`lucide:chevron-down`"
                  :class="[
                    childOpen ? 'rotate-180 transform' : '',
                    'size-5 text-foreground/70',
                  ]"
                  size="18"
                />
              </DisclosureButton>
              <DisclosurePanel class="ml-4 space-y-1 pt-1 pb-2">
                <template v-for="child in item.children" :key="child.id">
                  <NuxtLink
                    v-slot="{ isActive, href, navigate }"
                    :to="child.url || '#'"
                    custom
                    @click="close"
                  >
                    <DisclosureButton
                      as="a"
                      :href="href"
                      :class="getItemClasses(isActive, child.variant, true)"
                      :aria-current="isActive ? 'page' : undefined"
                      @click="navigate"
                    >
                      {{ child.title }}
                    </DisclosureButton>
                  </NuxtLink>
                </template>
              </DisclosurePanel>
            </Disclosure>
          </div>

          <!-- Mobile regular items -->
          <template v-else>
            <NuxtLink
              v-slot="{ isActive, href, navigate }"
              :to="item.url || '#'"
              custom
            >
              <DisclosureButton
                as="a"
                :href="href"
                :class="getItemClasses(isActive, item.variant, true)"
                :aria-current="isActive ? 'page' : undefined"
                @click="navigate"
              >
                {{ item.title }}
              </DisclosureButton>
            </NuxtLink>
          </template>
        </template>
      </div>

      <!-- Social icons (mobile) -->
      <div class="px-4 pt-2 pb-4">
        <SocialLinks :linkedin="globals?.linkedin" :github="globals?.github" />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>
a[href]:hover {
  text-decoration: none;
}
</style>
