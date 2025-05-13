<template>
  <div class="dom-tree">
    <span class="dom-tree__type code__line">&lt;!DOCTYPE html&gt;</span>
    <HtmlNode :node="htmlData" />
  </div>
</template>

<script setup>
import HtmlNode from './HtmlNode.vue'
import { ref, onMounted, provide } from 'vue';

const htmlData = ref(null);
const highlightedNode = ref(null);

provide('highlightedLine', highlightedNode);

const fetchHtmlData = async () => {
  try {
    // Simulate fetching the JSON data (you would typically fetch it from an API or a file)
    const response = await fetch('@/lib/mock-data/dom-tree.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    htmlData.value = await response.json();
  } catch (error) {
    console.error('Error fetching HTML data:', error);
  }
};

onMounted(() => {
  fetchHtmlData();
});
</script>

<style scoped>
.dom-tree {
  flex: 1;
}

.dom-tree__type {
  color: var(--soft-text-neutral);
  padding-left: 20px;
}
</style>
