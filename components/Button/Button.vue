<!-- Button.vue -->
<template>
  <button :aria-label="text" :class="classNames" v-bind="attrs">
    <Icon
      v-if="icon && iconPosition !== 'after'"
      :name="icon"
      :size="iconSize"
      :class="bem({ block: 'button', element: 'icon' })" />

    <span v-if="iconOnly" class="sr-only">{{ text }}</span>
    <span v-else :class="bem({ block: 'button', element: 'text' })">{{ text }}</span>

    <Icon
      v-if="icon && iconPosition === 'after'"
      :name="icon"
      :size="iconSize"
      :class="bem({ block: 'button', element: 'icon' })" />
  </button>
</template>

<script setup>
import { bem } from '@/utils/bem';
import { computed } from 'vue';
import Icon from '@/components/Icon/Icon.vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  iconPosition: {
    type: String,
    default: 'before',
    validator: val => ['before', 'after', 'only'].includes(val),
  },
  iconSize: {
    type: Number,
    default: null,
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

const attrs = useAttrs();

const iconOnly = computed(() => props.iconPosition === 'only');

const classNames = computed(() =>
  bem({
    block: 'button',
    modifiers: [
      props.icon ? 'icon' : '',
      iconOnly.value ? 'icon-only' : '',
      ...props.modifiers,
    ],
    extra: props.className,
  }),
);
</script>

<style scoped lang="scss">
.button {
    display: inline-flex;
    cursor: pointer;
}

.button--icon {
    display: flex;
}

.button--icon-only {
    aspect-ratio: 1/1;
    justify-content: center;
}
</style>