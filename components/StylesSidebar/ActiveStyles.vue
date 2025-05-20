<template>
  <div class="style-list">
    <div
      v-for="item in filteredItems"
      :key="item.selector"
      class="style-list__section"
    >
      <div class="selector">{{ item.selector }} {</div>
      <div v-for="(value, key) in item.styles" :key="key" class="property">
        <span class="key">{{ key }}:</span>
        <span class="value">{{ value }};</span>
      </div>
      <div class="closing-brace">}</div>
      <div class="style-source">{{ item.source }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  filter: {
    type: String,
    default: '',
  },
});

const filteredItems = computed(() => {
  const term = props.filter.toLowerCase();
  return props.items.filter(item =>
    item.selector.toLowerCase().includes(term) ||
    Object.keys(item.styles || {}).some(key =>
      key.toLowerCase().includes(term) ||
      (item.styles?.[key] || '').toLowerCase().includes(term),
    ),
  );
});
</script>

<style scoped lang="scss">
.style-list {
  font-family: var(--font-base);
  font-size: var(--text-base);
  color: var(--foreground);
  background-color: var(--background);
}

.style-list__section {
  position: relative;
  padding: 4px;
  border-bottom: 1px solid var(--border-accent)
}

.selector {
  color: var(--foreground);
}

.property {
  padding-left: 20px;
  line-height: 1.4;

  &:hover {
    background-color: var(--node-hover-bg);
  }

  .key {
    color: var(--style-property-text);
  }

  .value {
    margin-left: 0.5ch;
  }
}

.style-source {
  position: absolute;
  top: 4px;
  right: 4px;
  text-decoration: underline;
}
</style>
