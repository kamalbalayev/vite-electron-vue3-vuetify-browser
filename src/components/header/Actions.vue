<script setup lang="ts">

import HeaderMenu from "./Menu.vue";

const props = defineProps<{ pageView: any }>()

import {onMounted, ref, watch} from "vue";
import useStore from '../../store';

const store: any = useStore()

const searchText = ref<string | null>(store.getActiveTab().searchText || '')
const searchInput = ref<HTMLInputElement>(null)

const updateActiveTab = (): void => {

    searchText.value = props.pageView().getURL()

    store.updateActiveTab({
        id: store.activeTabId,
        searchText: props.pageView().getURL(),
        title: props.pageView().getTitle()
    })

}

const search = () => {

    const text = searchText.value.toLowerCase().trim()
    const regex = new RegExp('^(https?:\\/\\/)','i');

    const url = (regex.test(text) ? text : `${store.getActiveTab().url}search?q=${text}`).replaceAll(' ', '+')

    if (text) {
        props.pageView().loadURL(url)
        finishLoad()
    }

}

const finishLoad = () => props.pageView()?.addEventListener('update-target-url', () => updateActiveTab())

onMounted(() => setTimeout(()=> finishLoad(), 20))

watch(() => store.activeTabId, () => {

    searchText.value = store.getActiveTab().searchText || ''

    setTimeout(()=> finishLoad(), 20)

})

watch(() => searchText.value, (value) => {
    store.updateActiveTab({
        id: store.activeTabId,
        searchText: value,
    })
})

const goToHome = (): void => {
    props.pageView().goToIndex(0)
    searchText.value = null
}

</script>

<template>
    <v-app-bar app flat density="compact" color="primary">

        <template #prepend>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="pageView().goBack()">
                <v-icon icon="mdi-arrow-left" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="pageView().reload()">
                <v-icon icon="mdi-reload" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="goToHome">
                <v-icon icon="mdi-home-outline" size="small"/>
            </v-btn>

        </template>

        <div class="flex-fill pr-2">
            <v-text-field v-model="searchText" ref="searchInput" variant="solo-filled" flat density="compact"
                          rounded hide-details placeholder="Search web address or enter" bg-color="primary"
                          @keydown.enter="search">

                <template #prepend-inner>
                    <v-icon icon="mdi-magnify" size="small" start/>
                </template>

                <template #append-inner>
                    <div class="mr-n1 d-flex">
                        <v-btn icon variant="text" density="compact" class="ml-2">
                            <v-icon icon="mdi-star-outline" size="small"/>
                        </v-btn>
                    </div>
                </template>

            </v-text-field>
        </div>

        <template #append>
            <HeaderMenu :pageView="pageView"/>
        </template>

    </v-app-bar>
</template>