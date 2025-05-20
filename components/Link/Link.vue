<template>
  <router-link
    v-if="isInternalLink"
    :to="href"
    :class="computedClass"
    v-bind="props">
    <slot />
  </router-link>

  <a
    v-else
    :href="href"
    :class="computedClass"
    :rel="'noopener noreferrer'"
    target="_blank"
    v-bind="props">
    <slot />
  </a>
</template>

<script setup>
import { bem } from '@/utils/bem';

const props = defineProps({
  href: {
    type: String,
    required: true,
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
  block: 'link',
  modifiers: props.modifiers,
  extra: props.className,
}));

const isInternalLink = computed(() => props.href.startsWith('/') || props.href.startsWith('#'));
</script>
