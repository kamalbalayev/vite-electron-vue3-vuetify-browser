<script setup lang="ts">
import useStore from '../store/index';
const store: any = useStore()
</script>

<template>
    <template v-for="page in store.tabs" :key="`page-${page.id}`">
        <div class="flex-fill fill-height" style="display: flex" v-show="page.id === store.activeTabId">
            <webview :src="page.url" :id="`page-${page.id}`" plugins nodeintegration
                     class="d-flex flex-fill fill-height"/>
        </div>
    </template>
</template>