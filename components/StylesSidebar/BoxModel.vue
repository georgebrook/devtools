<template>
  <div class="box-model" @mouseleave="hover = null">
    <div
      v-for="section in sections"
      :key="section.name"
      :class="[sectionClass(section.name), { dimmed: hover && hover !== section.name }]"
      @mouseenter="hover = section.name"
    >
      <span
        v-if="section.label"
        :class="bem({
          block: 'box-model',
          element: 'label',
        })">{{ section.label }}</span>
      <span v-if="section.name === 'content'">2043×21</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { bem } from '@/utils/bem';

const hover = ref(null);

const sections = [
  { name: 'position', label: 'position' },
  { name: 'margin', label: 'margin' },
  { name: 'border', label: 'border' },
  { name: 'padding', label: 'padding' },
  { name: 'content' },
];

const sectionClass = (name) => bem({
  block: 'box-model',
  element: name,
  modifiers: [],
  extra: 'box-model__section',
});
</script>

<style scoped lang="scss">
.box-model {
  position: relative;
  width: 80%;
  height: 300px;
  margin: 40px auto;

  @media (max-width: 800px) {
    display: none;
  }
}

.box-model__label {
  position: absolute;
  position: absolute;
  top: 5px;
  left: 10px;
  font-family: var(--font-ui);
}

.box-model__section {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed 1px black;
}

.box-model__position {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background);
}

.box-model__margin {
  top: 30px;
  left: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 60px);
  background: var(--box-model-margin);

  @media (prefers-color-scheme: dark)  {
    color: var(--background);
  }
}

.box-model__border {
  top: 60px;
  left: 40px;
  width: calc(100% - 80px);
  height: calc(100% - 120px);
  background: var(--box-model-border);

  @media (prefers-color-scheme: dark)  {
    color: var(--background);
  }
}

.box-model__padding {
  top: 90px;
  left: 60px;
  width: calc(100% - 120px);
  height: calc(100% - 180px);
  background: var(--box-model-padding);

  @media (prefers-color-scheme: dark)  {
    color: var(--background);
  }
}

.box-model__content {
  top: 120px;
  left: 80px;
  width: calc(100% - 160px);
  height: calc(100% - 240px);
  background: var(--box-model-content);
  padding: 10px 20px;

  @media (prefers-color-scheme: dark)  {
    color: var(--background);
  }
}

.dimmed {
  background: var(--background) !important;

  @media (prefers-color-scheme: dark)  {
    color: var(--foreground);
  }
}
</style>
