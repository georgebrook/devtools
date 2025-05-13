<template>
  <div class="code" :style="node.tag !== 'html' ? { paddingLeft: '14px' } : { paddingLeft: '20px' }">
    <div @click="highlight(tagLineId)" :class="bem({
      block: 'code',
      element: 'line',
      modifiers: [
        ...(node.noEndTag ? ['no-icon'] : []),
        ...(isSelected(tagLineId).value ? ['highlight'] : []),
      ],
    })">
      <!-- Only show the toggle icon if the node is not 'html' -->
      <Icon v-if="hasChildren && node.tag !== 'html'" @click="toggle" class="code__toggle-icon" :size="25"
        :name="expanded ? 'arrow-down-solid' : 'arrow-right-solid'" />

      <!-- Start tag -->
      <span class="token tag">&lt;<span class="token tag-name">{{ node.tag }}</span></span>

      <!-- Attributes -->
      <template v-for="(value, key) in node.attributes" :key="key">
        <span class="token attr-name">&nbsp;{{ key }}</span>=<span class="token attr-value">"<span
            class="token string">{{ value }}</span>"</span>
      </template>

      <!-- End bracket -->
      <span class="token tag">&gt;</span>
    </div>

    <div v-if="expanded" class="code__children">
      <div v-if="node.content" @click="highlight(contentLineId)" :class="bem({
        block: 'code',
        element: 'line',
        modifiers: [
          'content',
          ...(isSelected(contentLineId).value ? ['highlight'] : []),
        ],
      })" :style="{ paddingLeft: '30px' }">
        {{ node.content }}
      </div>

      <HtmlNode v-for="(child, index) in node.children || []" :key="index" :node="child" :depth="depth + 1" />

      <div v-if="!node.noEndTag" @click="highlight(endTagLineId)" :class="bem({
        block: 'code',
        element: 'line',
        modifiers: [
          'end',
          ...(isSelected(endTagLineId).value ? ['highlight'] : []),
        ],
      })" :style="node.tag !== 'html' ? { paddingLeft: '18px' } : {}">
        <span class="token tag">&lt;/<span class="token tag-name">{{ node.tag }}</span>&gt;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { bem } from '@/utils/bem';

const props = defineProps({
  node: Object,
  depth: {
    type: Number,
    default: 0,
  },
})

// Unique ID for this line — could be the node itself, or some ID if available
const lineId = Symbol(); // or props.node.id if each node has a unique ID

// Get shared highlighted line reference
const tagLineId = Symbol('tag');
const contentLineId = Symbol('content');
const endTagLineId = Symbol('end-tag');

const highlightedLine = inject('highlightedLine', ref(null));
const isSelected = (id) => computed(() => highlightedLine.value === id);
const highlight = (id) => {
  if (highlightedLine.value !== id) {
    highlightedLine.value = id;
  }
};

const expanded = ref(true);
const toggle = () => {
  if (hasChildren && props.node.tag !== 'html') {
    expanded.value = !expanded.value;
  }
}

const hasChildren = props.node.children?.length > 0 || props.node.content;
</script>

<style scoped lang="scss">
.code__line,
.code__content {
  display: inline-block;
  cursor: default;
  position: relative;
  width: 100%;
  z-index: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -5000px;
    top: 0;
    width: calc(100% + 10000px);
    height: 100%;
    z-index: -1;
  }


  &:hover {
    &::before {
      background-color: var(--hover-bg);
    }
  }
}

.code__line--highlight {
  &::after {
    background-color: var(--focus-bg);
  }

  &:hover {
    &::before {
      background-color: transparent;
    }
  }
}

.code__line--no-icon {
  padding-left: 14px;
}

.code__toggle-icon {
  display: inline;
  margin: -5px -5px -7px -4px;
}
</style>