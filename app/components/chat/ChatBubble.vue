<template>
  <div class="flex items-start gap-2" :class="containerClasses">
    <!-- avatar left -->
    <div
      v-if="!isMe && (avatarEmoji || avatarImg)"
      class="shrink-0 size-11 rounded-full grid place-items-center border overflow-hidden"
      :class="
        avatarImg
          ? 'bg-transparent p-0'
          : 'bg-primary text-primary-foreground ' + avatarClass
      "
      :aria-label="avatarAriaLabel"
    >
      <NuxtImg
        v-if="avatarImg"
        :src="avatarImg"
        :alt="avatarAriaLabel"
        class="size-full object-cover rounded-full"
        preset="avatar"
        preload
      />
      <span v-else>{{ avatarEmoji }}</span>
    </div>

    <!-- message bubble -->
    <div :class="classes" role="group" :aria-label="ariaLabel">
      <p v-if="showName" class="text-[11px] mb-0.5 opacity-70">{{ label }}</p>
      <div
        v-if="typing"
        class="flex items-center gap-1 h-6"
        aria-label="typing"
      >
        <span class="sr-only">{{ label }} is typing</span>
        <span class="dot" /><span class="dot" /><span class="dot" />
      </div>
      <p v-else-if="text" class="leading-relaxed whitespace-pre-line">
        {{ text }}
      </p>
      <slot v-else />
    </div>

    <!-- avatar right -->
    <div
      v-if="isMe && (avatarEmoji || avatarImg)"
      class="shrink-0 size-11 rounded-full grid place-items-center border overflow-hidden shadow-sm"
      :class="
        avatarImg ? 'bg-transparent p-0' : 'bg-primary text-primary-foreground'
      "
      :aria-label="avatarAriaLabel"
    >
      <NuxtImg
        v-if="avatarImg"
        :src="avatarImg"
        :alt="avatarAriaLabel"
        class="size-full object-cover rounded-full"
        preset="avatar"
        preload
      />
      <span v-else>{{ avatarEmoji }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
interface Props {
  isMe: boolean;
  text?: string;
  typing?: boolean;
  showName?: boolean;
  label?: string;
  avatarEmoji?: string;
  avatarImg?: string;
  avatarClass?: string;
}
const props = defineProps<Props>();

const containerClasses = computed(() => {
  return props.isMe ? "justify-end" : "justify-start";
});

const classes = computed(() => {
  const base =
    "chat-bubble max-w-[85%] px-3 py-2 text-sm shadow-xs rounded-2xl";
  const side = props.isMe
    ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
    : "bg-secondary text-secondary-foreground rounded-tl-none";
  const typing = props.typing ? "border-dashed" : "";
  return [base, side, typing].join(" ");
});

const ariaLabel = computed(() => {
  return props.label ? `${props.label} message bubble` : "Message bubble";
});

const avatarAriaLabel = computed(() => {
  return props.label ? `${props.label} avatar` : "Avatar";
});

const { text, typing, showName, label } = toRefs(props);
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

.chat-bubble {
  backdrop-filter: saturate(1.1);
}

/* typing dots – respect reduced motion */
.dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 9999px;
  color: inherit;
  background: color-mix(in oklab, currentColor 70%, transparent);
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
