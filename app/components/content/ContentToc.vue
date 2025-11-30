<script lang="ts">
// Source Nuxt UI: https://github.com/nuxt/ui/blob/v4/src/runtime/components/content/ContentToc.vue
// Heavily modified for WildAmer.com needs
import { computed } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { useRouter, useNuxtApp } from '#imports'
import { useScrollspy } from '~/composable/useScrollspy'
import { cn } from '~/lib/utils'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '~/components/ui/accordion'
import type { TocLink } from '@nuxt/content'
import type { HTMLAttributes } from 'vue'

export type ContentTocLink = TocLink & {
  class?: HTMLAttributes['class']
}

export interface ContentTocProps<T extends ContentTocLink = ContentTocLink> {
  /**
   * The title of the table of contents.
   * @defaultValue 'Table of Contents'
   */
  title?: string
  /**
   * Display a line next to the active link.
   * @defaultValue false
   */
  highlight?: boolean
  /**
   * Whether the accordion is open by default.
   * @defaultValue false
   */
  defaultOpen?: boolean
  links?: T[]
  class?: HTMLAttributes['class']
}

export interface ContentTocEmits {
  move: [id: string]
  highlighted: [ids: string[]]
}

export interface ContentTocSlots<T extends ContentTocLink = ContentTocLink> {
  link(props: { link: T }): unknown
  top(props: { links?: T[] }): unknown
  bottom(props: { links?: T[] }): unknown
}
</script>

<script setup lang="ts" generic="T extends ContentTocLink">
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ContentTocProps<T>>(), {
  title: 'Table of Contents',
  highlight: false,
  defaultOpen: false,
  links: () => [],
  class: undefined
})
const emits = defineEmits<ContentTocEmits>()
const slots = defineSlots<ContentTocSlots<T>>()

const router = useRouter()
const { activeHeadings, updateHeadings } = useScrollspy()

const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate<{
  links: T[]
  level: number
}>({
  props: {
    links: Array,
    level: Number
  }
})

function scrollToHeading(id: string) {
  const encodedId = encodeURIComponent(id)
  router.push(`#${encodedId}`)
  emits('move', id)
}

function flattenLinks(links: T[]): T[] {
  return links.flatMap((link) => [
    link,
    ...(link.children ? flattenLinks(link.children as T[]) : [])
  ])
}

const indicatorStyle = computed(() => {
  if (!activeHeadings.value?.length) {
    return
  }

  const flatLinks = flattenLinks(props.links || [])
  const activeIndex = flatLinks.findIndex((link) => activeHeadings.value.includes(link.id))
  const linkHeight = 28
  const gapSize = 0

  return {
    '--indicator-size': `${linkHeight * activeHeadings.value.length + gapSize * (activeHeadings.value.length - 1)}px`,
    '--indicator-position': activeIndex >= 0 ? `${activeIndex * (linkHeight + gapSize)}px` : '0px'
  }
})

const nuxtApp = useNuxtApp()

nuxtApp.hooks.hook('page:loading:end', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'))
  updateHeadings(headings)
})
nuxtApp.hooks.hook('page:transition:finish', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'))
  updateHeadings(headings)
})

// Emit when highlighted headings change
watch(activeHeadings, (ids) => {
  if (ids.length) {
    emits('highlighted', ids)
  }
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <DefineListTemplate v-slot="{ links, level }">
    <ul :class="cn(level > 0 ? 'ml-4 space-y-1' : 'space-y-2')" class="not-prose">
      <li
        v-for="(link, index) in links"
        :key="index"
        :class="cn(link.children && link.children.length > 0 ? 'space-y-1' : '')"
      >
        <a
          :href="`#${link.id}`"
          :class="
            cn(
              'block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
              activeHeadings.includes(link.id)
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground',
              link.class
            )
          "
          @click.prevent="scrollToHeading(link.id)"
        >
          <slot name="link" :link="link">
            <span>
              {{ link.text }}
            </span>
          </slot>
        </a>

        <ReuseListTemplate
          v-if="link.children?.length"
          :links="link.children as T[]"
          :level="level + 1"
        />
      </li>
    </ul>
  </DefineListTemplate>

  <Accordion
    type="single"
    collapsible
    :default-value="defaultOpen ? 'toc' : undefined"
    :class="cn('rounded-lg border bg-card', props.class)"
  >
    <div v-if="!!slots.top" class="p-4 pb-0">
      <slot name="top" :links="links" />
    </div>

    <AccordionItem v-if="links?.length" value="toc" class="border-0">
      <AccordionTrigger class="px-4 py-3 lg:pointer-events-none lg:hover:no-underline">
        <span class="text-sm font-semibold">{{ props.title }}</span>
      </AccordionTrigger>

      <AccordionContent class="px-4 pb-4 lg:block!">
        <div class="relative">
          <div
            v-if="highlight"
            class="absolute left-0 top-0 w-0.5 bg-primary transition-all duration-300"
            :style="indicatorStyle"
          />
          <ReuseListTemplate :links="links" :level="0" />
        </div>
      </AccordionContent>
    </AccordionItem>

    <div v-else-if="!links?.length" class="p-4">
      <p class="text-sm font-semibold">{{ props.title }}</p>
    </div>

    <div
      v-if="!!slots.bottom"
      :class="cn('p-4', !!slots.top || !!links?.length ? 'pt-0 border-t' : '')"
    >
      <slot name="bottom" :links="links" />
    </div>
  </Accordion>
</template>
