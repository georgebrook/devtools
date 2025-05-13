<template>
    <div :class="computedClass">
        <span :class="lineClass"></span>
    </div>
</template>

<script setup>
import { bem } from '@/utils/bem';
import { computed } from 'vue';

const props = defineProps({
    modifiers: {
        type: Array,
        default: () => [],
    },
    className: {
        type: String,
        default: '',
    }
});

const computedClass = computed(() => {
    return bem({
        block: 'pipe',
        modifiers: props.modifiers,
        extra: props.className
    });
});

const lineClass = computed(() => {
    return bem({
        block: 'pipe',
        element: 'line',
    });
});
</script>

<style scoped lang="scss">
.pipe {
    display: inline-flex;
    align-items: center;
    background-color: var(--background-accent);
    border-top: 1px solid var(--border-accent);
    border-bottom: 1px solid var(--border-accent);
    padding: 0 2px;
    height: 100%;
}

.pipe__line {
    display: inline-flex;
    margin: 0 1px 0 2px;
    width: 1px;
    height: 20px;
    background-color: var(--border-accent);
}
</style>