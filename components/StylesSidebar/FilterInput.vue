<template>
  <div class="filter-input-wrapper">
    <Icon
      :name="'filter'"
      :size="18"
      :class="bem({ block: 'input', element: 'icon' })"
    />
    <input
      v-model="inputValue"
      type="text"
      placeholder="Filter"
      class="filter-input"
    >
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue || '');

watch(() => props.modelValue, val => {
  inputValue.value = val;
});

watch(inputValue, val => {
  emit('update:modelValue', val);
});
</script>

<style scoped lang="scss">
.filter-input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--background-accent);
  border-radius: 15px;
  padding: 0 7px;
  height: 24px;
  width: 100%;
  border: 2px solid transparent;
  margin: 7px;

  &:focus-within {
    border-color: var(--foreground-active);
  }
}

.input__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.filter-input {
  border: none;
  background: none;
  font-size: 0.96rem;
  font-family: var(--font-ui);
  letter-spacing: 0.01rem;
  width: 100%;
  height: 100%;
  outline: none;

  &::placeholder {
    color: var(--foreground);
    opacity: 1;
  }
}
</style>
