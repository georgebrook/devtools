<template>
  <div>
    <div v-if="isDesktop">
      <Header />
      <NuxtPage />
    </div>
    <div v-else class="desktop-warning">
      Mobile view for this may well not be developed.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/Header/Header.vue';

const isDesktop = ref(1500);

const checkScreenWidth = () => {
  isDesktop.value = window.innerWidth > 1500;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});
</script>

<style lang="scss">
.desktop-warning {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  text-align: center;
}

.page {
  background-color: var(--background);
}
</style>
