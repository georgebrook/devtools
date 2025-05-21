<template>
  <aside ref="sidebarRef" :class="['styles-sidebar', ...modifiers, className]">
    <div class="styles-sidebar__resize-handle" @mousedown="startResize" />

    <header :class="bem({ block: 'styles-sidebar', element: 'header' })">

      <Navigation
        v-model:active-index="activeTabIndex"
        nav-name="styles"
        :use-underline="true"
        @update:nav-items="stylesNav = $event" />
    </header>

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
import { bem } from '@/utils/bem';

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
  sidebarRef.value.style.width = `${Math.max(newWidth, 100)}px`;
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
  width: 800px;
  max-width: 100%;
  min-width: 100px;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  margin-top: 35px;

  @media (max-width: 800px) {
    display: none;
  }

  .navigation__underline {
    bottom: -18px;
    display: none;
  }
}

.styles-sidebar__header {
  overflow: auto;
  position: fixed;
  z-index: 10;
  width: 100%;
  top: 35px;
}

.styles-sidebar__resize-handle {
  position: absolute;
  left: -10px;
  top: 0;
  bottom: 0;
  width: 20px;
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
