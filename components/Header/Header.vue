<template>
  <header :class="bem({ block: 'header', modifiers, extra: className })">
    <Navigation :nav-name="'tools'" :modifiers="['icons', 'tools']" />

    <Pipe />

    <Navigation
      :use-routing="true"
      :use-underline="true"
      :nav-name="'main'"
      :modifiers="['main']" />

    <Pipe />
    <Navigation :nav-name="'options'" :modifiers="['icons', 'options']" />
  </header>
</template>

<script setup>
import { bem } from '@/utils/bem'; // Adjust path as needed
import Navigation from '@/components/Navigation/Navigation.vue';
import Pipe from '@/components/Pipe/Pipe.vue';

const { modifiers, className } = defineProps({
  modifiers: {
    type: Array,
    default: () => [],
  },
  className: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  overflow: auto;
  flex-direction: row;
  align-items: center;
  height: 35px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
