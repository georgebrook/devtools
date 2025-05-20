<template>
  <aside ref="sidebarRef" :class="['styles-sidebar', ...modifiers, className]">
    <div class="styles-sidebar__resize-handle" @mousedown="startResize" />

    <Navigation
      v-model:active-index="activeTabIndex"
      nav-name="styles"
      :use-underline="true"
      @update:nav-items="stylesNav = $event" />

    <div class="tab-content">
      <component
        :is="tabComponents[activeTabIndex]"
        v-if="tabComponents[activeTabIndex]"
        class="tab-content__section is-active" />
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import TabAccessibility from '@/components/StylesSidebar/TabContents/TabAccessibility.vue';
import TabComputed from '@/components/StylesSidebar/TabContents/TabComputed.vue';
import TabDomBreakPoints from '~/components/StylesSidebar/TabContents/TabDomBreakPoints.vue';
import TabEventListeners from '@/components/StylesSidebar/TabContents/TabEventListeners.vue';
import TabLayout from '@/components/StylesSidebar/TabContents/TabLayout.vue';
import TabProperties from '@/components/StylesSidebar/TabContents/TabProperties.vue';
import TabStyles from '@/components/StylesSidebar/TabContents/TabStyles.vue';
import TabTypography from '@/components/StylesSidebar/TabContents/TabTypography.vue';

import Navigation from '@/components/Navigation/Navigation.vue';

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

const stylesNav = ref([]);
const activeTabIndex = ref(0);

const tabComponents = [
  TabStyles,
  TabComputed,
  TabLayout,
  TabEventListeners,
  TabTypography,
  TabDomBreakPoints,
  TabProperties,
  TabAccessibility,
];

const isResizing = ref(false);
const sidebarRef = ref(null);

const startResize = () => {
  isResizing.value = true;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', stopResize);
};

const handleMouseMove = (e) => {
  if (!isResizing.value || !sidebarRef.value) return;

  const newWidth = sidebarRef.value.getBoundingClientRect().right - e.clientX;
  sidebarRef.value.style.width = `${Math.max(newWidth, 930)}px`;
};

const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', stopResize);
};

onMounted(() => {
  sidebarRef.value
    ?.querySelector('.styles-sidebar__resize-handle')
    ?.addEventListener('mousedown', startResize);
});

onBeforeUnmount(() => {
  sidebarRef.value
    ?.querySelector('.styles-sidebar__resize-handle')
    ?.removeEventListener('mousedown', startResize);
  stopResize();
});
</script>

<style scoped lang="scss">
.styles-sidebar {
  width: 930px;
  min-width: 200px;
  max-width: 100%;
  position: relative;
  overflow: auto;
  margin-top: 35px;

  .navigation {
    position: fixed;
    z-index: 10;
    width: 100%;
    top: 34px;
  }
}

.styles-sidebar__resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  cursor: ew-resize;
  z-index: 20;
  background-color: transparent;
}

.tab-content {
  background: var(--background);
}

.tab-content__section {
  display: block;
  height: 100%;
}
</style>
