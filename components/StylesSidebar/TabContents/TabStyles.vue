<template>
  <div>
    <div class="tab-content__filters">
      <FilterInput v-model="searchTerm" />
      <Button :icon="'plus'" :iconPosition="'only'" :iconSize="24" :text="'Add Style'" />
      <Button :icon="'paint-brush'" :iconPosition="'only'" :iconSize="24" :text="'Add Style'" />
      <Button :icon="'dock'" :iconPosition="'only'" :iconSize="24" :text="'Add Style'" />
    </div>
    <ActiveStyles :items="styles" :filter="searchTerm" />
    <BoxModel />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilterInput from '../FilterInput.vue'
import BoxModel from '../BoxModel.vue'
import ActiveStyles from '../ActiveStyles.vue'

const searchTerm = ref('')
const styles = ref([]);

const fetchData = async () => {
  const result = await $fetch(`/api/fetch-styles`);
  styles.value = result;
};

onMounted(async () => {
  await fetchData()
});

</script>

<style scoped lang="scss">
.tab-content__filters {
  border-bottom: 1px solid var(--border-accent);
  display: flex;
  align-items: center;

  .button {
    padding: 0 0.86rem;
    font-size: 0.96rem;
    font-family: var(--font-ui);
    letter-spacing: 0.01rem;
    display: flex;
    align-items: center;
    height: 100%;
    cursor: default;
    width: 33px;
    padding: 0;
    border-radius: 50%;

    &:hover {
      background-color: var(--background-hover-accent);
    }
  }
}
</style>