<template>
    <aside :class="['styles-sidebar', ...modifiers, className]" ref="sidebarRef">
        <div :class="['styles-sidebar__resize-handle']" @mousedown="startResize" />
        <Navigation navName="styles" :useUnderline="true" v-model:activeIndex="activeTabIndex"
            @update:navItems="stylesNav = $event" />

        <div class="tab-content">
            <div v-for="(item, index) in stylesNav" :key="item.label"
                :class="['tab-content__section', { 'is-active': activeTabIndex === index }]">
                <p>
                    element.style {
                    }
                </p>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Navigation from '@/components/Navigation/Navigation.vue';

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

const stylesNav = ref([]);
const activeTabIndex = ref(0);
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
    if (newWidth > 930) {
        sidebarRef.value.style.width = `${newWidth}px`;
    } else {
        sidebarRef.value.style.width = '930px';
    }
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
};

onMounted(() => {
    const handle = sidebarRef.value?.querySelector('.styles-sidebar__resize-handle');
    handle?.addEventListener('mousedown', startResize);
});

onBeforeUnmount(() => {
    const handle = sidebarRef.value?.querySelector('.styles-sidebar__resize-handle');
    handle?.removeEventListener('mousedown', startResize);
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
    border-left: 1px solid var(--border-accent);
}

.styles-sidebar__resize-handle {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10px;
    cursor: ew-resize;
    z-index: 10;
    background-color: transparent;
}

.tab-content {
    background: var(--background);
    height: 100%;
    position: relative;
}

.tab-content__section {
    display: none;

    &.is-active {
        display: block;
    }
}
</style>
