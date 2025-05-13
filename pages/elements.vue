<template>
    <div :class="bem({ block: 'page', modifiers: ['elements'] })">
        <HtmlViewer />
        <StylesSidebar />
    </div>
</template>

<script setup>
import { bem } from '@/utils/bem';
import StylesSidebar from '@/components/StylesSidebar/StylesSidebar.vue';
import HtmlViewer from '@/components/DomTree/HtmlViewer.vue';
</script>

<style scoped lang="scss">
.page--elements {
    display: flex;
}
</style>