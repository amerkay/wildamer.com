<template>
  <div class="relative flex-1 overflow-hidden">
    <!-- Hidden preload images for SSR -->
    <div class="sr-only" aria-hidden="true">
      <NuxtImg
        v-for="participant in participantsWithImages"
        :key="`preload-${participant.id}`"
        :src="participant.avatarImg"
        :alt="participant.label"
        preset="avatar"
        preload
      />
    </div>

    <!-- fade overlay at top -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-8"
    >
      <div
        v-if="isScrollable"
        class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"
      />
    </Transition>

    <div
      ref="listEl"
      class="space-y-3 h-full overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Chat conversation"
    >
      <div
        v-for="(m, i) in visible"
        :key="m.id"
        v-motion
        class="flex items-start gap-2"
        :class="m.from === 'amer' ? 'justify-end' : 'justify-start'"
        :initial="{ opacity: 0, y: 12 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 180,
            damping: 18,
            delay: i * 0.04,
          },
        }"
      >
        <ChatBubble
          :is-me="m.from === 'amer'"
          :text="m.text"
          :typing="m.typing"
          :show-name="m.showName"
          :label="senderLabel(m.from)"
          :avatar-emoji="participantEmoji(m.from)"
          :avatar-img="participantAvatarImg(m.from)"
          :avatar-class="avatarClass(m.from)"
        />
      </div>
      <div v-if="isScriptComplete" class="flex justify-end">
        <Button variant="outline" size="xs" @click="replay"> ↻ Replay </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { computed, nextTick, onMounted, ref } from "vue";
import ChatBubble from "~/components/chat/ChatBubble.vue";
import Button from "~/components/ui/button/Button.vue";

interface Participant {
  id: string;
  label: string;
  emoji: string;
  avatarImg?: string;
  avatarClass?: string;
}

type ScriptLine = {
  id?: string;
  from: string;
  text: string;
  typingMs?: number;
  afterDelay?: number;
  showName?: boolean;
};

interface Props {
  participants: Participant[];
  script: ScriptLine[];
}
const props = defineProps<Props>();

// Add IDs to script lines if they don't have them
const scriptWithIds = computed(() =>
  props.script.map((m, idx) => ({
    ...m,
    id: m.id || `m-${idx}`,
  }))
);

const participantById = Object.fromEntries(
  props.participants.map((p) => [p.id, p])
) as Record<string, Participant>;

const participantsWithImages = computed(() =>
  props.participants.filter((p) => p.avatarImg)
);

function senderLabel(from: string): string {
  return participantById[from]?.label || "";
}
function avatarClass(from: string): string {
  return participantById[from]?.avatarClass || "";
}
function participantEmoji(from: string): string {
  return participantById[from]?.emoji || "";
}
function participantAvatarImg(from: string): string | undefined {
  return participantById[from]?.avatarImg;
}

const listEl = ref<HTMLDivElement | null>(null);
const { y: scrollY } = useScroll(listEl);
const isScrollable = computed(() => scrollY.value > 0);
const visible = ref<
  Array<{
    id: string;
    from: string;
    text?: string;
    typing?: boolean;
    showName?: boolean;
  }>
>([]);
const isScriptComplete = ref(false);

let currentRun = 0;
let activeTimers: number[] = [];
function clearTimers() {
  activeTimers.forEach((id) => clearTimeout(id));
  activeTimers = [];
}
function wait(ms: number, run: number): Promise<void> {
  return new Promise((resolve) => {
    if (ms <= 0) return resolve();
    const id = setTimeout(() => {
      if (run === currentRun) resolve();
    }, ms);
    activeTimers.push(id as unknown as number);
  });
}

async function playOnce(run: number) {
  visible.value = [];
  isScriptComplete.value = false;
  for (const m of scriptWithIds.value) {
    if (run !== currentRun) break;
    if (m.typingMs && m.typingMs > 0) {
      visible.value.push({
        id: `${m.id}-t`,
        from: m.from,
        typing: true,
        showName: m.showName,
      });
      await nextTick();
      scrollToBottom();
      await wait(m.typingMs, run);
      if (run !== currentRun) break;
      visible.value.splice(visible.value.length - 1, 1, {
        id: m.id!,
        from: m.from,
        text: m.text,
        showName: m.showName,
      });
    } else {
      visible.value.push({
        id: m.id!,
        from: m.from,
        text: m.text,
        showName: m.showName,
      });
    }
    await nextTick();
    scrollToBottom();
    await wait(m.afterDelay ?? 250, run);
  }
  if (run === currentRun) {
    isScriptComplete.value = true;
    await nextTick();
    scrollToBottom();
  }
}

function scrollToBottom() {
  const div = listEl.value;
  if (!div) return;
  requestAnimationFrame(() => {
    div.scrollTo({ top: div.scrollHeight, behavior: "smooth" });
  });
}

async function replay() {
  currentRun += 1;
  clearTimers();
  await playOnce(currentRun);
}

onMounted(() => {
  replay();
});
</script>
