<template>
  <div :class="bem({ block: 'page', modifiers: ['lighthouse'] })">
    Coming Soon...
  </div>
</template>

<script setup>
import { bem } from '@/utils/bem';
</script>

<style scoped lang="scss">
.page {
  padding: 20px;
}
</style>
