<template>
  <div class=tab-coming-soon>
    
    <p>Coming Soon...</p>
    <BoxModel />
  </div>
</template>

<script setup>
import BoxModel from '../BoxModel.vue';
</script>

<style scoped> 
.tab-coming-soon {
  padding: 20px;
  background: var(--background);
  z-index: 10;
  position: relative;
}
</style>
