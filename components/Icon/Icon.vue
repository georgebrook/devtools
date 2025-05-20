<template>
  <svg
    :class="computedClass"
    :role="isDecorative ? 'presentation' : 'img'"
    :aria-hidden="isDecorative ? 'true' : undefined"
    :aria-labelledby="!isDecorative ? [titleId, descId].filter(Boolean).join(' ') : undefined"
    :style="computedStyle"
    v-bind="attrs"
  >
    <use :href="`/icon-sprite.svg#${name}`" />
    <template v-if="!isDecorative">
      <title :id="titleId">{{ name }}</title>
      <desc v-if="desc" :id="descId">{{ desc }}</desc>
    </template>
  </svg>
</template>
  
<script setup>
import { computed, useAttrs } from 'vue';
import { bem } from '@/utils/bem';
  
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: null,
  },
  className: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});
  
const attrs = useAttrs();
  
const isDecorative = computed(() => !props.desc || props.desc.trim() === '');
  
const titleId = computed(() => `icon-title-${props.name}`);
const descId = computed(() => (props.desc && props.desc.trim() ? `icon-desc-${props.name}` : undefined));
  
const computedStyle = computed(() => props.size
  ? { width: `${props.size}px`, height: `${props.size}px`, ...props.style }
  : props.style);
  
const computedClass = computed(() => bem({
  block: 'icon',
  modifiers: [props.name],
  extra: props.className,
}));
</script>  