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
  import { computed, useAttrs } from 'vue'
  import { bem } from '@/utils/bem'
  
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
  })
  
  const attrs = useAttrs()
  
  // Correctly handle empty strings or undefined desc
  const isDecorative = computed(() => !props.desc || props.desc.trim() === '')
  
  // Ensure descId is only set when desc is not an empty string or undefined
  const titleId = computed(() => `icon-title-${props.name}`)
  const descId = computed(() => (props.desc && props.desc.trim() ? `icon-desc-${props.name}` : undefined))
  
  const computedStyle = computed(() => {
    return props.size
      ? { width: `${props.size}px`, height: `${props.size}px`, ...props.style }
      : props.style
  })
  
  const computedClass = computed(() => {
    return bem({
      block: 'icon',
      modifiers: [props.name],
      extra: props.className,
    })
  })
  </script>
  
  <style scoped lang="scss">
  </style>
  