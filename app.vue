<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup>
import Header from '@/components/Header/Header.vue';
</script>

<style lang="scss">
.page {
  background-color: var(--background);
}
</style>
