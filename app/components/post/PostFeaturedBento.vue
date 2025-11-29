<template>
  <section class="border-t text-foreground">
    <Container>
      <h2 class="text-base/7 font-semibold text-secondary-foreground dark:text-secondary">
        {{ preHeading }}
      </h2>
      <p class="mt-2 max-w-xl text-4xl font-heading tracking-tight text-foreground sm:text-5xl">
        {{ heading }}
      </p>
      <div
        v-if="featuredPosts && featuredPosts.length > 0"
        class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6"
      >
        <PostCard
          v-for="(post, index) in featuredPosts"
          :key="post.path || index"
          :post="post"
          :grid-classes="cardLayouts[index]?.gridClasses || ''"
          :background-modifiers="cardLayouts[index]?.backgroundModifiers"
          :content-modifiers="cardLayouts[index]?.contentModifiers"
          :border-modifiers="cardLayouts[index]?.borderModifiers"
          :media-classes="cardLayouts[index]?.mediaClasses || 'h-80 object-cover'"
        />
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
interface Props {
  collectionType: 'project' | 'article'
  preHeading: string
  heading: string
}

const props = defineProps<Props>()

const { data: featuredPosts } = await useAsyncData(`featured-${props.collectionType}s`, () => {
  return queryCollection(props.collectionType)
    .where('isFeatured', '=', true)
    .order('featuredOrder', 'ASC')
    .order('date', 'DESC')
    .limit(5)
    .all()
})

// Define layout configurations for each card position
const cardLayouts = [
  // First card (top-left, large)
  {
    gridClasses: 'lg:col-span-3',
    backgroundModifiers: 'max-lg:rounded-t-4xl lg:rounded-tl-4xl',
    contentModifiers: 'max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]',
    borderModifiers: 'max-lg:rounded-t-4xl lg:rounded-tl-4xl',
    mediaClasses: 'h-80 object-cover object-top-left'
  },
  // Second card (top-right, large)
  {
    gridClasses: 'lg:col-span-3',
    backgroundModifiers: 'lg:rounded-tr-4xl',
    contentModifiers: 'lg:rounded-tr-[calc(2rem+1px)]',
    borderModifiers: 'lg:rounded-tr-4xl',
    mediaClasses: 'h-80 object-cover object-top-left'
  },
  // Third card (bottom-left, small)
  {
    gridClasses: 'lg:col-span-2',
    backgroundModifiers: 'lg:rounded-bl-4xl',
    contentModifiers: 'lg:rounded-bl-[calc(2rem+1px)]',
    borderModifiers: 'lg:rounded-bl-4xl',
    mediaClasses: 'h-80 object-cover object-top-left'
  },
  // Fourth card (bottom-center, small)
  {
    gridClasses: 'lg:col-span-2',
    backgroundModifiers: '',
    contentModifiers: '',
    borderModifiers: '',
    mediaClasses: 'h-80 object-cover object-top-left'
  },
  // Fifth card (bottom-right, small)
  {
    gridClasses: 'lg:col-span-2',
    backgroundModifiers: 'max-lg:rounded-b-4xl lg:rounded-br-4xl',
    contentModifiers: 'max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]',
    borderModifiers: 'max-lg:rounded-b-4xl lg:rounded-br-4xl',
    mediaClasses: 'h-80 object-cover object-top-left'
  }
]
</script>
