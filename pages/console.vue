<template>
  <div :class="bem({ block: 'page', modifiers: ['console'] })">
    <Console />
  </div>
</template>

<script setup>
import { bem } from '@/utils/bem';
import Console from '@/components/Console/Console.vue';
</script>

<style scoped lang="scss">
</style>
