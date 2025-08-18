<script setup lang="ts">
import ChatWindow from "~/components/chat/ChatWindow.vue";

// participants
const participants = [
  {
    id: "amer",
    label: "Amer Kawar",
    emoji: "👋",
    avatarImg: "/imgs/avatar-me.png",
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
  {
    id: "elephant",
    label: "Pangea ElephantTrust",
    emoji: "🐘",
    avatarImg: "/imgs/avatar-elephant.png",
    // avatarClass: "bg-accent text-accent-foreground",
  },
];

// chat script
const chatScript = [
  {
    from: "owl",
    text: "Hey Amer, hoot hoot! Loved those map visualizations. Could you build a sightings app?",
    typingMs: 1700,
    afterDelay: 450,
    showName: true,
  },
  {
    from: "seal",
    text: "I'm drowning in Salesforce CRM fields, here. Can you streamline our flow?",
    typingMs: 800,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "flying-fox",
    text: "I hang upside down all night thinking: better email automation, better volunteer forms.",
    typingMs: 1000,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "elephant",
    text: "Half my herd of donors abandon the form mid-way. I heard you build awesome, high-converting donation forms, yeah?",
    typingMs: 800,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "amer",
    text: "I'm all over it. Let's get you sorted!",
    typingMs: 500,
    afterDelay: 0,
    showName: true,
  },
];
</script>

<template>
  <div class="flex flex-col items-end w-full">
    <!-- for card: border bg-card text-card-foreground shadow-md -->
    <aside
      class="max-w-sm w-full md:max-w-sm lg:max-w-lg rounded-xl flex flex-col h-full"
      role="complementary"
      aria-label="Story chat preview"
    >
      <ChatWindow
        :participants="participants"
        :script="chatScript"
        :start-threshold="0.3"
      />
    </aside>
  </div>
</template>
