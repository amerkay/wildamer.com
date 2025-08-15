<template>
  <div class="bg-background text-foreground border-t">
    <Container>
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <h2
            class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl"
          >
            Why volunteer and what's my goal?
          </h2>
          <p class="mt-4 text-base/7 text-pretty text-gray-600">
            My mission is to create tech solutions to advance wildlife
            conservation.
          </p>
        </div>
        <div class="mt-10 lg:col-span-7 lg:mt-0">
          <Accordion
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
                  'text-base/7 font-semibold text-gray-900',
                  { 'pt-0': idx === 0 },
                ]"
                >{{ faq.question }}</AccordionTrigger
              >
              <AccordionContent class="mt-2 text-base/7 text-gray-600">
                <template v-if="faq.type === 'timeline'">
                  <div
                    v-if="
                      faq.parsedParagraphsBefore &&
                      faq.parsedParagraphsBefore.length
                    "
                    class="prose prose-gray max-w-none mb-6 [&>p]:mb-3 [&>p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic [&_a]:text-blue-600 [&_a:hover]:underline"
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
                    class="prose prose-gray max-w-none [&>div]:mb-3 [&>div:last-child]:mb-0 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic [&_a]:text-blue-600 [&_a:hover]:underline"
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
import { markdown } from "very-small-parser";
import { toText } from "very-small-parser/lib/html/toText";
import { toHast } from "very-small-parser/lib/markdown/block/toHast";
import { computed } from "vue";

const defaultValue = "item-0";

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
    question: "Why offer volunteer for free? What's my ultimate goal?",
    type: "timeline",
    paragraphsBefore: [
      "My ultimate goal is to build software that helps wildlife conservation organizations operate more efficiently and effectively, at scale.",
    ],
    content: [
      {
        title: "Phase 1: Volunteering, Research & Discovery",
        date: "June 2025 - June 2026",
        description:
          "Reaching out to wildlife conservation orgs to volunteer as their tech consultant. Help them with their technology needs until I identify a common problem that needs a solution.",
        icon: "heroicons:magnifying-glass",
        badge: "Current",
        badgeVariant: "secondary",
      },
      {
        title: "Phase 2: Build minimum viable product that scales",
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
          "Grow it. Offer it to 100's or 1000's of conservation efforts.",
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
    question:
      "What are the main priorities guiding my work and future projects?",
    type: "paragraphs",
    content: [
      "My top two priorities when it comes to my volunteering work and future software I build are: Lowering per donation and tech costs and increasing efficiency.",
      "Salesforce can get expensive quickly if your organization needs more than 10 team members, and other subscriptions and licenses add up to thousands a year quick.",
      "Badly designed donation flows can scare donors away. It should be bim-bam-boom quick!",
    ],
  },
  {
    question: "Which values guide my work in tech and conservation?",
    type: "paragraphs",
    content: [
      "1. **Free Open Source Software** (or FOSS): The same way most NGOs use Wordpress for free, but need admins to deploy and manage it. \\n This does not mean I cannot sell the software I build and make income to live off of. It means that use it for free if you have the tech know how and staff.  A bonus side effect is that it will help me other developers in the space.",
      "2. **Open-book accounting**: I've always admired companies that do that. In this case, it could help other conservationist entrepreneurs learn how they could also make money while helping through tech.",
    ],
  },
];
</script>
