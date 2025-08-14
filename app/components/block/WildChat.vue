<template>
  <aside
    class="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-xl border bg-card text-card-foreground shadow-md p-4 md:p-5 h-[75vh] overflow-y-auto"
    role="complementary"
    aria-label="Story chat preview"
  >
    <!-- header -->
    <header class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <div
          class="size-8 rounded-full grid place-items-center bg-primary text-primary-foreground shadow-sm"
        >
          🦉
        </div>
        <div class="text-sm font-medium">
          Barn Owl Watch
          <span class="block text-xs text-muted-foreground"
            >Amer · Org · Barn Owl</span
          >
        </div>
      </div>
      <button
        class="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        type="button"
        @click="replay"
      >
        ↻ Replay
      </button>
    </header>

    <!-- chat log -->
    <ol
      ref="listEl"
      class="space-y-3 overflow-hidden"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      <li
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
        <!-- avatar left -->
        <div
          v-if="m.from !== 'amer'"
          class="shrink-0 size-8 rounded-full grid place-items-center border bg-muted/40 text-base"
          :class="avatarClass(m.from)"
          :aria-label="senderLabel(m.from)"
        >
          <span v-if="m.from === 'org'">🏛️</span>
          <span v-else-if="m.from === 'owl'">🦉</span>
        </div>

        <!-- bubble -->
        <ChatBubble
          :is-me="m.from === 'amer'"
          :text="m.text"
          :typing="m.typing"
          :show-name="m.showName"
          :label="senderLabel(m.from)"
        />

        <!-- avatar right -->
        <div
          v-if="m.from === 'amer'"
          class="shrink-0 size-8 rounded-full grid place-items-center border bg-primary text-primary-foreground shadow-sm"
          aria-label="Amer avatar"
        >
          👋
        </div>
      </li>
    </ol>
  </aside>
</template>

<script setup lang="ts">
import ChatBubble from "@/components/base/ChatBubble.vue";
import { nextTick, onMounted, ref } from "vue";

type Sender = "amer" | "org" | "owl";
type ScriptLine = {
  id?: string;
  from: Sender;
  text: string;
  typingMs?: number;
  afterDelay?: number;
  showName?: boolean;
};
type VisibleLine = Required<Pick<ScriptLine, "id" | "from">> & {
  text?: string;
  typing?: boolean;
  showName?: boolean;
};

const listEl = ref<HTMLOListElement | null>(null);

const script: ScriptLine[] = [
  {
    from: "org",
    text: "Hi Amer! We're launching Barn Owl Watch this month.\nCan you help us set up field sensors and a public sightings flow?",
    typingMs: 900,
    afterDelay: 350,
    showName: true,
  },
  {
    from: "amer",
    text: "Absolutely. I'll deploy low-power GPS tags, LoRa gateways, and a dashboard so volunteers can report safely.",
    typingMs: 700,
    afterDelay: 300,
  },
  {
    from: "owl",
    text: "Hoot hoot! My tag says 3% battery near River Bend…",
    typingMs: 1000,
    afterDelay: 250,
    showName: true,
  },
  {
    from: "amer",
    text: "On it. We’ll switch to power-save, queue a replacement, and keep nest locations privacy-safe on the public map.",
    typingMs: 800,
    afterDelay: 350,
  },
  {
    from: "org",
    text: "Perfect. Can we show a weekly heatmap + moderated photo uploads?",
    typingMs: 850,
    afterDelay: 250,
  },
  {
    from: "amer",
    text: "Yes—moderation, geofencing, and shareable links out of the box. I’ll send access after this demo.",
    typingMs: 700,
    afterDelay: 0,
  },
].map(
  (m, idx): ScriptLine => ({ id: `m-${idx}`, ...m, from: m.from as Sender })
);

const visible = ref<VisibleLine[]>([]);
const prefersReduced =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

function avatarClass(from: Sender) {
  return from === "org"
    ? "bg-secondary text-secondary-foreground"
    : "bg-accent text-accent-foreground";
}
function senderLabel(from: Sender) {
  if (from === "org") return "Barn Owl Trust";
  if (from === "owl") return "Barn Owl";
  return "Amer";
}

let currentRun = 0;
let activeTimers: number[] = [];
function clearTimers() {
  activeTimers.forEach((id) => clearTimeout(id));
  activeTimers = [];
}
function wait(ms: number, run: number) {
  return new Promise<void>((resolve) => {
    if (ms <= 0) return resolve();
    const id = setTimeout(() => {
      if (run === currentRun) resolve();
    }, ms);
    activeTimers.push(id as unknown as number);
  });
}

async function playOnce(run: number) {
  visible.value = [];
  for (const m of script) {
    if (run !== currentRun) break;
    if (m.typingMs && m.typingMs > 0) {
      visible.value.push({ id: `${m.id}-t`, from: m.from, typing: true, showName: m.showName });
      await nextTick();
      scrollToBottom();
      await wait(prefersReduced ? 0 : m.typingMs, run);
      if (run !== currentRun) break; // abort before swapping
      visible.value.splice(visible.value.length - 1, 1, { id: m.id!, from: m.from, text: m.text, showName: m.showName });
    } else {
      visible.value.push({ id: m.id!, from: m.from, text: m.text, showName: m.showName });
    }
    await nextTick();
    scrollToBottom();
    await wait(prefersReduced ? 0 : (m.afterDelay ?? 250), run);
  }
}

function scrollToBottom(force = false) {
  const ol = listEl.value;
  if (!ol) return;
  const scroller = ol.parentElement as HTMLElement | null; // aside with overflow
  if (!scroller) return;
  const { scrollTop, scrollHeight, clientHeight } = scroller;
  const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
  const threshold = 120; // px
  if (force || distanceFromBottom < threshold) {
    scroller.scrollTo({ top: scrollHeight, behavior: prefersReduced ? "auto" : "smooth" });
  }
}
async function replay() {
  currentRun += 1; // invalidate previous run
  clearTimers();
  await playOnce(currentRun);
}

onMounted(() => {
  replay();
});
</script>
