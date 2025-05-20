<template>
  <component :is="`h${level}`" :class="computedClass">
    <slot />
  </component>
</template>

<script setup>
import { bem } from '@/utils/bem';

const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: value => value >= 1 && value <= 6,
  },
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
  block: 'headsing',
  modifiers: [...props.modifiers, `${props.level}`],
  extra: props.className,
}));
</script>

<style scoped lang="scss">
.heading {
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.3rem;
}
</style>