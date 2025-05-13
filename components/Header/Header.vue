<template>
  <header :class="bem({ block: 'header', modifiers, extra: className })">
    <Navigation :navName="'tools'" :modifiers="['icons', 'tools']" />

    <Pipe/>

    <Navigation
      :useRouting="true"
      :useUnderline="true"
      :navName="'main'"
      :modifiers="['main']"
    />

    <Pipe />
    <Navigation :navName="'options'" :modifiers="['icons', 'options']" />
  </header>
</template>

<script setup>
import { bem } from '@/utils/bem'; // Adjust path as needed
import Navigation from '@/components/Navigation/Navigation.vue';
import Pipe from '@/components/Pipe/Pipe.vue';

// Define props
const props = defineProps({
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
  flex-direction: row;
  align-items: center;
  height: 35px;
}
</style>
