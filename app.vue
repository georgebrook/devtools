<template>
  <Header :modifiers="['someModifier']" className="additional-class" />
  <NuxtPage />
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
.page {
  background-color: var(--background);
}
</style>