<!-- FilterInput.vue -->
<template>
  <input
    v-model="inputValue"
    type="text"
    placeholder="Filter"
    class="filter-input"
    @input="$emit('update:modelValue', inputValue)"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue || '')

watch(() => props.modelValue, val => {
  inputValue.value = val
})
</script>

<style scoped lang="scss">
.filter-input {
  background-image: url('@/assets/icons/filter.svg');
  margin: 5px 7px;
  background-color: var(--background-accent);
  border-radius: 15px;
  padding-left: 40px;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: 14px center;
  font-size: 0.96rem;
  font-family: var(--font-ui);
  letter-spacing: 0.01rem;
  height: 24px;
  display: inline-flex;
  width: 100%;
  border: 2px solid transparent;

  &::placeholder {
    color: var(--foreground);
    opacity: 1;
  }

  &:focus {
    outline: none;
    border: 2px solid var(--foreground-active);
  }
}

</style>
