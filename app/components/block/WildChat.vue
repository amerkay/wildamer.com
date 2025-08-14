<template>
  <div class="flex flex-col items-end w-full">
    <!-- for card: border bg-card text-card-foreground shadow-md -->
    <aside
      class="max-w-sm w-full md:max-w-sm lg:max-w-lg rounded-xl flex flex-col h-full"
      role="complementary"
      aria-label="Story chat preview"
    >
      <ChatWindow :participants="participants" :script="chatScript" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import ChatWindow from "~/components/chat/ChatWindow.vue";

// participants
const participants = [
  {
    id: "amer",
    label: "Amer Kawar",
    emoji: "👋",
    avatarImg: "/imgs/avatar-me.jpg",
    // avatarClass: "bg-primary text-primary-foreground shadow-sm",
  },
  {
    id: "owl",
    label: "Barn Owl Trust UK",
    emoji: "🦉",
    avatarImg: "/imgs/avatar-barnowl.jpg",
    // avatarClass: "bg-secondary text-secondary-foreground",
  },
  {
    id: "seal",
    label: "Seal Rescue Ireland",
    emoji: "🦭",
    avatarImg: "/imgs/avatar-seal.jpg",
    // avatarClass: "bg-accent text-accent-foreground",
  },
  {
    id: "flying-fox",
    label: "Bat Society of Cairns",
    emoji: "🦇",
    avatarImg: "/imgs/avatar-flyingfox2.jpg",
    // avatarClass: "bg-accent text-accent-foreground",
  },
];

// chat script
const chatScript = [
  {
    from: "owl",
    text: "Hi Amer — we're struggling with donor records and CRM workflows. Can you help us integrate donor management and Salesforce?",
    typingMs: 900,
    afterDelay: 350,
    showName: true,
  },
  {
    from: "seal",
    text: "Yes — our team needs consolidated donation records, automated receipts, and GDPR-compliant donor profiles.",
    typingMs: 800,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "flying-fox",
    text: "We need to track donations, manage campaigns, and ensure compliance with data protection laws.",
    typingMs: 800,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "amer",
    text: "Of course I can help you! Let's do it!",
    typingMs: 700,
    afterDelay: 0,
    showName: true,
  },
];
</script>
