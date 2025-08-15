<template>
  <ol class="relative border-s border-border ml-4">
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="['ms-6', index < items.length - 1 ? 'mb-10' : 'mb-0']"
    >
      <span
        class="absolute flex items-center justify-center w-8 h-8 bg-secondary rounded-full -start-4 ring-8 ring-background -mt-0.5"
      >
        <Icon
          :name="item.icon || 'heroicons:calendar-days'"
          class="text-secondary-foreground"
        />
      </span>
      <div class="flex items-center gap-3 mb-1">
        <h3 class="text-lg font-semibold text-foreground">
          {{ item.title }}
        </h3>
        <Badge
          v-if="item.badge"
          :variant="item.badgeVariant || 'default'"
          class="text-sm"
        >
          {{ item.badge }}
        </Badge>
      </div>
      <time
        class="block mb-2 text-sm font-normal leading-none text-muted-foreground"
      >
        {{ item.date }}
      </time>
      <p
        class="text-base font-normal text-muted-foreground"
        :class="{ 'mb-4': item.action }"
      >
        {{ item.description }}
      </p>
      <component
        :is="item.action.href ? 'a' : 'button'"
        v-if="item.action"
        :href="item.action.href"
        :class="[
          'inline-flex items-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg',
          'hover:bg-accent hover:text-accent-foreground focus:z-10 focus:ring-4 focus:outline-none focus:ring-ring/20',
        ]"
      >
        <Icon
          v-if="item.action.icon"
          :name="item.action.icon"
          class="w-3.5 h-3.5 me-2.5"
        />
        {{ item.action.text }}
      </component>
    </li>
  </ol>
</template>

<script setup lang="ts">
interface TimelineAction {
  text: string;
  href?: string;
  icon?: string;
}

interface TimelineItem {
  title: string;
  date: string;
  description: string;
  icon?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  action?: TimelineAction;
}

interface Props {
  items: TimelineItem[];
}

defineProps<Props>();
</script>
