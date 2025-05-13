<template>
  <div class="dom-tree">
    <HtmlNode v-if="htmlData" :node="htmlData" />
  </div>
</template>

<script setup>
import HtmlNode from './HtmlNode.vue'
import { provide } from 'vue'

const highlightedNode = ref(null)
provide('highlightedLine', highlightedNode)

const { data: htmlData } = await useAsyncData('domTree', () =>
  $fetch('/api/dom-tree')
);
</script>

<style scoped>
.dom-tree {
  flex: 1;
  position: relative;
}
</style>
