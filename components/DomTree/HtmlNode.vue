<template>
  <span v-if="depth === 0" class="dom-tree__type code__line">
    <span class="code__line-options">
      <Icon :name="'dots-horizontal'" :size="13" />
    </span>
    &lt;!DOCTYPE html&gt;
  </span>

  <div class="code">
    <div @click="highlight(tagLineId)" :class="lineClasses('line', [noIconModifier, selectedModifier(tagLineId)])"
      :style="{ paddingLeft: `${(depth + 1) * indentSize}px` }">
      <span class="code__line-options">
        <Icon :name="'dots-horizontal'" :size="15" />
      </span>
      <Icon v-if="showToggle" @click.stop="toggle" class="code__toggle-icon" :size="25" :name="toggleIcon" />
      <span class="token tag">
        &lt;<span class="token tag-name">{{ node.tag }}</span>
      </span>
      <template v-for="(value, key) in node.attributes" :key="key">
        <span class="token attr-name">&nbsp;{{ key }}</span>
        <span class="token attr-value">="<span class="token string">{{ value }}</span>"</span>
      </template>
      <span class="token tag">&gt;</span>
    </div>

    <div v-show="expanded" class="code__children">
      <span v-if="showToggle" class="code__children-reference-line"
        :style="{ left: `${(depth + 1) * indentSize}px` }"></span>

      <template v-for="(child, index) in node.children || []" :key="index">
        <div v-if="child.content" :class="lineClasses('line', [selectedModifier(contentLineId)])"
          :style="{ paddingLeft: `${(depth + 1) * indentSize + 28}px` }" @click="highlight(contentLineId)">
          <span class="code__line-options">
            <Icon :name="'dots-horizontal'" :size="10" />
          </span>
          {{ child.content }}
        </div>
        <HtmlNode v-else :node="child" :depth="depth + 1" ref="childNodes" />
      </template>

      <div v-if="!node.noEndTag" @click="highlight(endTagLineId)"
        :class="lineClasses('line', [selectedModifier(endTagLineId)])" :style="endTagStyle">
        <span class="code__line-options">
          <Icon :name="'dots-horizontal'" :size="10" />
        </span>
        <span @click="highlight(endTagLineId)"
          :class="lineClasses('line', [selectedModifier(endTagLineId)], 'token tag')" :style="'padding-left: 20px'">
          &lt;/<span class="token tag-name">{{ node.tag }}</span>&gt;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, nextTick } from 'vue'

const props = defineProps({
  node: Object,
  depth: {
    type: Number,
    default: 0,
  },
})

const tagLineId = Symbol('tag')
const contentLineId = Symbol('content')
const endTagLineId = Symbol('end-tag')

const highlightedLine = inject('highlightedLine', ref(null))
const isSelected = (id) => computed(() => highlightedLine.value === id)
const highlight = (id) => {
  if (highlightedLine.value !== id) {
    highlightedLine.value = id
  }
}

const expanded = ref(true);
const childNodes = ref([]);

const hasChildren = props.node.children?.length > 0 || props.node.content
const showToggle = computed(() => hasChildren && props.node.tag !== 'html')
const indentSize = 13
const iconWidth = computed(() => (showToggle.value ? 5 : 20))
const toggleIcon = computed(() => (expanded.value ? 'arrow-down-solid' : 'arrow-right-solid'))

const endTagStyle = computed(() => {
  return props.node.tag !== 'html'
    ? { paddingLeft: `${(props.depth + 1) * indentSize - iconWidth.value}px` }
    : {}
})

const lineClasses = (element, modifiers = [], extra) =>
  bem({
    block: 'code',
    element,
    modifiers,
    extra,
  })

const selectedModifier = (id) => (isSelected(id).value ? 'highlight' : null)
const noIconModifier = props.node.noEndTag ? 'no-icon' : ''

// Recursive function to collapse all descendant nodes
function collapseAllChildren() {
  expanded.value = false
  // Wait until DOM updates so childNodes are accurate refs
  nextTick(() => {
    childNodes.value.forEach((childComponent) => {
      if (childComponent && typeof childComponent.collapseAllChildren === 'function') {
        childComponent.collapseAllChildren()
      }
    })
  })
}

function toggle() {
  if (hasChildren && props.node.tag !== 'html') {
    if (expanded.value) {
      // Currently expanded, collapsing now => collapse all children too
      collapseAllChildren()
    } else {
      // Expanding parent - do NOT expand children, so children stay collapsed
      expanded.value = true
    }
  }
}

// Expose collapseAllChildren so parent nodes can call it
defineExpose({ collapseAllChildren })
</script>


<style scoped lang="scss">
.code__line-options {
  display: none;
  position: absolute;
  left: 1px;
  top: 3px;
}

.code__line {
  display: inline-block;
  cursor: default;
  position: relative;
  width: 100%;
  z-index: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &:hover {
    +.code__children {
      >.code__children-reference-line {
        background-color: var(--hover-bg);
      }
    }

    &::before {
      background-color: var(--hover-bg);
    }
  }
}

.dom-tree__type {
  color: var(--soft-text-neutral);
  padding-left: 15px;
}

.code__line--highlight {
  .code__line-options {
    display: block;
  }

  +.code__children {
    >.code__children-reference-line {
      background-color: var(--focus-bg);
    }
  }

  &::after {
    background-color: var(--focus-bg);
  }

  &:hover {
    &::before {
      background-color: transparent;
    }

    +.code__children {
      >.code__children-reference-line {
        background-color: var(--focus-bg);
      }
    }
  }
}

.code__children {
  position: relative;
}

.code__children-reference-line {
  content: '';
  position: absolute;
  width: 1px;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 10;
}

.code__line--no-icon {
  padding-left: 14px;
}

.code__toggle-icon {
  position: relative;
  z-index: 100;
  display: inline;
  margin: -4px -13px -7px -5px;
}
</style>
