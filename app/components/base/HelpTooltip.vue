<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover/index'

interface Props {
    content: string
    maxWidth?: string
}

const { content, maxWidth = 'max-w-xs' } = defineProps<Props>()

const open = ref(false)

// Use VueUse to detect if device has fine pointer (mouse) or coarse (touch)
const isFinePointer = useMediaQuery('(pointer: fine)')

// Timeout references for debouncing
let openTimeout: ReturnType<typeof setTimeout> | null = null
let closeTimeout: ReturnType<typeof setTimeout> | null = null

// Open on hover for mouse devices with delay to prevent flashing
const handleMouseEnter = () => {
    if (isFinePointer.value) {
        // Clear any pending close timeout
        if (closeTimeout) {
            clearTimeout(closeTimeout)
            closeTimeout = null
        }

        // Set a delay before opening (300ms)
        openTimeout = setTimeout(() => {
            open.value = true
            openTimeout = null
        }, 300)
    }
}

const handleMouseLeave = () => {
    if (isFinePointer.value) {
        // Clear any pending open timeout
        if (openTimeout) {
            clearTimeout(openTimeout)
            openTimeout = null
        }

        // Set a small delay before closing (100ms)
        closeTimeout = setTimeout(() => {
            open.value = false
            closeTimeout = null
        }, 100)
    }
}

// Toggle on click/tap
const handleClick = () => {
    // Clear any pending timeouts when explicitly clicking
    if (openTimeout) {
        clearTimeout(openTimeout)
        openTimeout = null
    }
    if (closeTimeout) {
        clearTimeout(closeTimeout)
        closeTimeout = null
    }

    open.value = !open.value
}

// Clean up timeouts on component unmount
onUnmounted(() => {
    if (openTimeout) clearTimeout(openTimeout)
    if (closeTimeout) clearTimeout(closeTimeout)
})
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger class="inline-flex items-center gap-2 cursor-help" aria-label="Help information"
            @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleClick">
            <slot>
                <Icon name="lucide:circle-question-mark" size="15" />
            </slot>
        </PopoverTrigger>
        <PopoverContent :class="maxWidth">
            <p class="text-xs">
                {{ content }}
            </p>
        </PopoverContent>
    </Popover>
</template>
