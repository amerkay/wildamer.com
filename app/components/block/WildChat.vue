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
    avatarImg: "/imgs/avatar-me.png",
    avatarClass: "bg-primary text-primary-foreground shadow-sm",
  },
  {
    id: "owl",
    label: "Barn Owl Trust UK",
    emoji: "🦉",
    avatarImg: "/imgs/avatar-barnowl.jpg",
    avatarClass: "bg-secondary text-secondary-foreground",
  },
  {
    id: "seal",
    label: "Seal Rescue Ireland",
    emoji: "🦭",
    avatarImg: "/imgs/avatar-seal.jpg",
    avatarClass: "bg-accent text-accent-foreground",
  },
  {
    id: "flying-fox",
    label: "Bat Society of Cairns",
    emoji: "🦇",
    avatarImg: "/imgs/avatar-flyingfox2.jpg",
    avatarClass: "bg-accent text-accent-foreground",
  },
];

// chat script
const chatScript = [
  {
    from: "owl",
    text: "Hoot, Amer! Our donor CRM is a mouse maze. Can you finish moving us into CiviCRM?",
    typingMs: 1400,
    afterDelay: 450,
    showName: true,
  },
  {
    from: "owl",
    text: "Oh, and I loved the GIS data maps. When can we get the owl sightings app online?",
    typingMs: 900,
    afterDelay: 350,
    // showName: true,
  },
  {
    from: "seal",
    text: "Meanwhile I'm drowning in Salesforce fields. Streamline rescues + donations, please.",
    typingMs: 800,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "flying-fox",
    text: "I want magical email automation and a volunteer onboarding form that doesn't scare humans away.",
    typingMs: 800,
    afterDelay: 300,
    showName: true,
  },
  {
    from: "amer",
    text: "I'm all over it. Let's get you sorted!",
    typingMs: 700,
    afterDelay: 0,
    showName: true,
  },
];
</script>
