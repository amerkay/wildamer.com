<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

export interface ContainerProps {
  as?:
    | "div"
    | "section"
    | "main"
    | "article"
    | "aside"
    | "nav"
    | "header"
    | "footer"
    | "form";
  class?: HTMLAttributes["class"];
  role?: string;
  isFullWidth?: boolean;
  width?: "sm" | "md" | "max";
}

const props = withDefaults(defineProps<ContainerProps>(), {
  as: "div",
  class: "",
  role: undefined,
  isFullWidth: true,
  width: "max",
});
</script>

<template>
  <component
    :is="props.as"
    :class="
      cn(
        'mx-4 max-w-6xl sm:mx-6 md:mx-8 xl:mx-auto',

        [
          {
            'my-0 py-16': isFullWidth,
            'my-16 rounded-xl border-2 border-accent-border bg-background p-4 sm:p-6 md:p-8 lg:p-12':
              !isFullWidth,

            'mx-4 max-w-2xl sm:mx-6 md:mx-auto': width === 'sm',
            'mx-4 max-w-4xl sm:mx-6 md:mx-8 lg:mx-auto': width === 'md',
            // '': width === 'max',
          },
        ],

        props.class
      )
    "
    :role="props.role"
  >
    <slot />
  </component>
</template>
