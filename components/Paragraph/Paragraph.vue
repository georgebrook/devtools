<template>
  <p :class="computedClass" v-bind="props">
    <slot />
  </p>
</template>

<script setup>
import { bem } from '@/utils/bem';

const props = defineProps({
  modifiers: {
    type: Array,
    default: () => [],
  },
  className: {
    type: String,
    default: '',
  },
});

const computedClass = computed(() => bem({
  block: 'paragraph',
  modifiers: props.modifiers,
  extra: props.className,
}));
</script>

<style scoped lang="scss"></style>