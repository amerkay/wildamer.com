<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { TooltipTrigger } from 'reka-ui';

interface Props extends PrimitiveProps { }

const props = defineProps<Props>()
</script>

<template>
    <TooltipTrigger v-bind="props">
        <slot />
    </TooltipTrigger>
</template>
