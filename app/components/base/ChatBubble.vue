<template>
  <div :class="classes" role="group" :aria-label="ariaLabel">
    <p v-if="showName" class="text-[11px] mb-0.5 opacity-70">{{ label }}</p>
    <div v-if="typing" class="flex items-center gap-1" aria-label="typing">
      <span class="sr-only">{{ label }} is typing</span>
      <span class="dot" /><span class="dot" /><span class="dot" />
    </div>
    <p v-else-if="text" class="leading-relaxed whitespace-pre-line">
      {{ text }}
    </p>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isMe: boolean;
  text?: string;
  typing?: boolean;
  showName?: boolean;
  label?: string;
}
const props = defineProps<Props>();

const classes = computed(() => {
  const base =
    "chat-bubble max-w-[85%] px-3 py-2 text-sm shadow-xs rounded-2xl";
  const side = props.isMe
    ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
    : "bg-background/90 text-foreground rounded-tl-none";
  const typing = props.typing ? "border-dashed" : "";
  return [base, side, typing].join(" ");
});

const ariaLabel = computed(() => {
  return props.label ? `${props.label} message bubble` : "Message bubble";
});

const { text, typing, showName, label } = toRefs(props);
</script>

<style scoped>
.chat-bubble {
  backdrop-filter: saturate(1.1);
}

/* typing dots – respect reduced motion */
.dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 9999px;
  background: color-mix(in oklab, var(--foreground) 70%, transparent);
  display: inline-block;
  margin-inline: 0.125rem;
  animation: dot-bounce 1.2s infinite ease-in-out;
}
.dot:nth-child(2) {
  animation-delay: 0.15s;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }
  40% {
    transform: translateY(-3px);
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
    opacity: 0.7;
  }
}
</style>
