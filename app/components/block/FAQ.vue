<template>
  <div class="bg-background text-foreground border-t">
    <Container>
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <h2
            class="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl"
          >
            Why volunteer, and what's my goal?
          </h2>
          <p class="mt-4 text-base/7 text-pretty text-muted-foreground">
            My mission is to create tech solutions to advance wildlife
            conservation.
          </p>
        </div>
        <div class="mt-10 lg:col-span-7 lg:mt-0">
          <Accordion
            v-model="activeItem"
            type="single"
            class="w-full space-y-4"
            collapsible
            :default-value="defaultValue"
          >
            <AccordionItem
              v-for="(faq, idx) in parsedFaqs"
              :key="faq.question"
              :value="`item-${idx}`"
              class="mb-0"
            >
              <AccordionTrigger
                :class="[
                  'text-base/7 font-semibold text-foreground',
                  { 'pt-0': idx === 0 },
                ]"
                >{{ faq.question }}</AccordionTrigger
              >
              <AccordionContent class="mt-2 text-base/7">
                <template v-if="faq.type === 'timeline'">
                  <div
                    v-if="
                      faq.parsedParagraphsBefore &&
                      faq.parsedParagraphsBefore.length
                    "
                    class="prose prose-stone dark:!prose-inverse max-w-none mb-6 [&>p]:mb-3 [&>p:last-child]:mb-0 text-muted-foreground"
                  >
                    <div
                      v-for="(paragraph, i) in faq.parsedParagraphsBefore"
                      :key="i"
                      v-html="paragraph"
                    />
                  </div>
                  <Timeline
                    :items="faq.content"
                    :class="{
                      'mt-6':
                        faq.parsedParagraphsBefore &&
                        faq.parsedParagraphsBefore.length,
                    }"
                    class="mb-4"
                  />
                </template>
                <template v-else>
                  <div
                    class="prose prose-stone dark:prose-invert max-w-none [&>div]:mb-3 [&>div:last-child]:mb-0 [&_p]:mb-2 [&_p:last-child]:mb-0 text-muted-foreground"
                  >
                    <div
                      v-for="(paragraph, i) in faq.parsedContent"
                      :key="i"
                      v-html="paragraph"
                    />
                  </div>
                </template>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup>
import Timeline from "@/components/project/Timeline.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { markdown } from "very-small-parser/esm";
import { toText } from "very-small-parser/lib/html/toText";
import { toHast } from "very-small-parser/lib/markdown/block/toHast";
import { computed, ref, watch } from "vue";

const defaultValue = "item-0";
const activeItem = ref(defaultValue);

/**
 * Extract numeric index from accordion item value
 * @param {string} value - The accordion item value (e.g., "item-1")
 * @returns {number} The numeric index
 */
const getAccordionItemIndex = (value) => {
  return parseInt(value.replace("item-", ""));
};

/**
 * Find the accordion trigger element for a given index
 * @param {number} index - The accordion item index
 * @returns {Element|null} The trigger element or null if not found
 */
const findAccordionTrigger = (index) => {
  const allItems = document.querySelectorAll('[data-slot="accordion-item"]');
  const accordionItem = allItems[index];

  if (!accordionItem) return null;

  return accordionItem.querySelector('[data-slot="accordion-trigger"]');
};

/**
 * Check if an element is fully visible in the viewport
 * @param {Element} element - The element to check
 * @returns {boolean} True if element is visible, false otherwise
 */
const isElementVisible = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.left >= 0 &&
    rect.right <= window.innerWidth
  );
};

/**
 * Scroll to accordion item if its trigger is not visible
 * @param {string} itemValue - The accordion item value
 */
const scrollToElementIfNeeded = (itemValue) => {
  const index = getAccordionItemIndex(itemValue);
  const trigger = findAccordionTrigger(index);

  if (!trigger) return;

  if (!isElementVisible(trigger)) {
    const accordionItem = trigger.closest('[data-slot="accordion-item"]');
    accordionItem?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

// Scroll to accordion item when opened, but only if the trigger is not visible
watch(activeItem, async (newValue) => {
  if (newValue) {
    setTimeout(() => scrollToElementIfNeeded(newValue), 301);
  }
});

// Parse markdown content to HTML
const parsedFaqs = computed(() => {
  return faqs.map((faq) => {
    if (faq.type === "paragraphs") {
      const parsedContent = faq.content.map((paragraph) => {
        try {
          const mdast = markdown.block.parse(paragraph);
          const hast = toHast(mdast);
          return toText(hast);
        } catch {
          // Fallback to original content if parsing fails
          return paragraph;
        }
      });
      return { ...faq, parsedContent };
    }

    if (faq.type === "timeline" && faq.paragraphsBefore) {
      const parsedParagraphsBefore = faq.paragraphsBefore.map((paragraph) => {
        try {
          const mdast = markdown.block.parse(paragraph);
          const hast = toHast(mdast);
          return toText(hast);
        } catch {
          return paragraph;
        }
      });
      return { ...faq, parsedParagraphsBefore };
    }

    return faq;
  });
});

const faqs = [
  {
    question: "Why offer volunteer work for free? What's my ultimate goal?",
    type: "timeline",
    paragraphsBefore: [
      "My ultimate goal is to build software that helps wildlife conservation organizations operate more efficiently and effectively, at scale.",
    ],
    content: [
      {
        title: "Phase 1: Volunteering, Research & Discovery",
        date: "July 2025 - June 2026",
        description:
          "The most common mistake entrepreneurs make is not understanding the needs of their users. This is why I'm dedicating an entire year to reaching out to wildlife conservation organizations to volunteer as their tech consultant. Helping them with their technology needs until I identify a common problem that needs a solution.",
        icon: "heroicons:magnifying-glass",
        badge: "Current",
        badgeVariant: "secondary",
      },
      {
        title: "Phase 2: Build a minimum viable product that scales",
        date: "Start: July 2026",
        description:
          "Build a minimum viable software to solve that problem. Build it in-public with regular progress updates posted online to reach more conservationists.",
        icon: "heroicons:wrench-screwdriver",
        // action: {
        //   text: "Follow Progress",
        //   href: "#",
        //   icon: "heroicons:arrow-top-right-on-square",
        // },
      },
      {
        title: "Phase 3: Scale & Grow",
        date: "Future Phase",
        description:
          "Growing it. Offering it to hundreds or thousands of conservation efforts.",
        icon: "heroicons:chart-bar",
        // badge: "Future",
        // badgeVariant: "outline",
      },
    ],
  },
  {
    question: "Why wildlife conservation?",
    type: "paragraphs",
    content: [
      "After living in the rainforest in Cairns for 2 years, the rest of the world feels too sterile! We need more wildlife. It's sad the way things are now. We should do more, and that's why I'm doing this.",
      "I recently closed my company Tweepi.com, a Twitter marketing software that helped more than 2 million marketers reach their target audiences on Twitter over 14 years of operation.",
      "Now, it's time for me to focus on wildlife conservation!",
    ],
  },

  {
    question: "Open-source software and transparency are the way to go",
    type: "paragraphs",
    content: [
      "My future project will be grounded in two guiding principles:",
      "1. **Free Open Source Software** (FOSS): I'm a strong believer in the power of open source software, especially its potential impact in the conservation space. By making the code freely available, it can give resource-strapped conservation groups the tools they need without adding financial strain. \\n This doesn't rule out making an income from it - I still need to make a living - but it means anyone with the know-how and resources can use it at no cost. Think WordPress: the software (Wordpress.org) is free, but someone still has to set it up and run it (Wordpress.com).",
      "2. **Open-book accounting**: I've always admired companies that operate with financial transparency. By sharing the numbers, this future project could inspire other conservation entrepreneurs to see that tech can both make an impact and pay the bills.",
    ],
  },
  // {
  //   question: "What drives my work and shapes my future projects?",
  //   type: "paragraphs",
  //   content: [
  //     "Lowering costs and increasing efficiency for conservation organizations.",
  //     "Salesforce can get expensive quickly if your organization needs more than 10 team members, and other subscriptions and licenses add up to thousands a year quickly.",
  //     "Badly designed donation flows can scare donors away. It should be bim-bam-boom quick!",
  //   ],
  // },
];
</script>
