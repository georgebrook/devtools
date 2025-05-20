<template>
  <nav
    ref="navRef"
    :class="computedClass"
    role="navigation"
    aria-label="Primary">
    <ul class="navigation__list" role="tablist">
      <template v-for="(item, index) in navItems" :key="index">
        <li v-if="item && item.label" class="navigation__item" role="presentation">
          <template v-if="useRouting">
            <RouterLink
              v-if="item.href"
              :to="item.href"
              :target="item.target"
              :class="[
                'navigation__button',
                activeIndex === index ? 'navigation__button--active' : ''
              ]"
              role="tab"
              :aria-selected="activeIndex === index">
              {{ item.label }}
            </RouterLink>
          </template>

          <template v-else>
            <Button
              :class="[
                'navigation__button',
                activeIndex === index ? 'navigation__button--active' : ''
              ]"
              :icon="item.iconName"
              :icon-position="item.iconName ? 'only' : null"
              :icon-size="item.iconSize"
              :text="item.label"
              role="tab"
              :aria-selected="activeIndex === index"
              @click="setActiveTab(index)" />
          </template>
        </li>
      </template>
    </ul>

    <div
      v-if="activeIndex !== null && useUnderline"
      class="navigation__underline"
      :style="{ left: `${underlineStyleRef.left}px`, width: `${underlineStyleRef.width}px` }"/>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/Button/Button.vue';
import { bem } from '@/utils/bem';

const emit = defineEmits(['update:activeIndex', 'update:navItems']);

const props = defineProps({
  navName: { type: String, required: true },
  modifiers: { type: Array, default: () => [] },
  className: { type: String, default: '' },
  useUnderline: { type: Boolean, default: false },
  useRouting: { type: Boolean, default: false },
});

const computedClass = computed(() =>
  bem({
    block: 'navigation',
    modifiers: props.modifiers,
    extra: props.className,
  }),
);

const activeIndex = ref(null);
const underlineStyleRef = ref({ left: 0, width: 0 });
const navRef = ref(null);
const navItems = ref([]);
const route = useRoute();

const updateUnderline = () => {
  if (props.useUnderline && navRef.value && activeIndex.value !== null) {
    const listItems = navRef.value.querySelectorAll('.navigation__item');
    const element = listItems[activeIndex.value];
    if (element) {
      underlineStyleRef.value = {
        left: element.offsetLeft,
        width: element.offsetWidth,
      };
    }
  }
};

const updateActiveIndexFromRoute = () => {
  if (props.useRouting) {
    const activeIdx = navItems.value.findIndex((item) => item.href === route.path);
    activeIndex.value = activeIdx >= 0 ? activeIdx : null;
    emit('update:activeIndex', activeIdx);
    updateUnderline();
  }
};

const setActiveTab = (index) => {
  activeIndex.value = index;
  emit('update:activeIndex', index);
  updateUnderline();
};

const fetchData = async() => {
  const result = await $fetch('/api/fetch-nav', {
    query: { type: props.navName },
  });
  navItems.value = result;
  emit('update:navItems', result);
};

let resizeObserver;
const initResizeObserver = () => {
  if (navRef.value) {
    resizeObserver = new ResizeObserver(updateUnderline);
    resizeObserver.observe(navRef.value);
  }
};

onMounted(async() => {
  await fetchData();
  if (props.useRouting) {
    updateActiveIndexFromRoute();
  } else {
    setActiveTab(0);
  }

  updateUnderline();

  initResizeObserver();
});

onBeforeUnmount(() => {
  if (resizeObserver && navRef.value) {
    resizeObserver.disconnect();
  }
});

if (props.useRouting) {
  watch(route, updateActiveIndexFromRoute);
  watch(() => props.navName, fetchData, { immediate: true });
}
</script>

<style scoped lang="scss">
.navigation {
  height: 35px;
  position: relative;
  background-color: var(--background-accent);
  border-top: 1px solid var(--border-accent);
  border-bottom: 1px solid var(--border-accent);
}

.navigation__list {
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
}

.navigation__item {
  height: 100%;
}

.navigation__button {
  padding: 0 0.86rem;
  font-size: 0.96rem;
  font-family: var(--font-ui);
  letter-spacing: 0.01rem;
  cursor: default;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    background-color: var(--background-hover-accent);
  }
}

.navigation__link--active {
  color: var(--foreground-active);
}

.navigation__underline {
  height: 20px;
  background-color: var(--foreground-active);
  position: absolute;
  bottom: -18px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: left 0.2s ease, width 0.2s ease;
}

.navigation--icons {
  .navigation__item {
    margin: 0 1px;
  }

  .navigation__button {
    width: 33px;
    padding: 0;
    border-radius: 50%;
  }
}

.navigation--tools {
  padding-left: 3px;
}

.navigation--main {
  flex-grow: 1;
}

.navigation--options {
  display: flex;
  height: 100%;
  padding-right: 6px;
}
</style>
