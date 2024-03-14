<script setup lang="ts">

import HeaderMenu from './Menu.vue'

import {onMounted, ref, watch} from 'vue'
import {useComposable} from '../../composables'
import useStore from '../../store'

const {pageView} = useComposable()
const store = useStore()

const searchText = ref<string>(store.getActiveTab().searchText || '')
const searchInput = ref<HTMLInputElement>(null)

/*
* Function that updates the data of the active tab
* */
const updateActiveTab = () => {

    searchText.value = pageView().getURL()

    store.updateActiveTab({
        searchText: pageView().getURL(),
        title: pageView().getTitle()
    })

}

/*
* You can convert the text in the search bar
*  into the required format and perform the search.
* */
const search = () => {

    const text = searchText.value.toLowerCase().trim()
    const regex = new RegExp('^(https?:\\/\\/)', 'i')

    const url = (regex.test(text) ? text : `${store.getActiveTab().url}search?q=${text}`).replaceAll(' ', '+')

    if (text) {
        pageView().loadURL(url)
        finishLoad()
    }

}

/*
* You can update the active tab data by listening
* to the "update-target-url" event.
*/
const finishLoad = () => pageView()?.addEventListener('update-target-url', () => updateActiveTab())

/*
* By running the "finishLoad" function inside the setTimeOut function,
*  we make sure that all DOM elements are mounted.
* */
onMounted(() => setTimeout(() => finishLoad(), 20))

/*
* When activeTabId is updated in the store,
* we change the searchText value and call the finishLoad function
* */
watch(() => store.activeTabId, () => {
    searchText.value = store.getActiveTab().searchText || ''
    setTimeout(() => finishLoad(), 20)
})

/*
* Function to navigate to the specified home page of the web page
* */
const goToHome = () => {
    pageView().goToIndex(0)
    searchText.value = null
}

</script>

<template>
    <v-app-bar app flat density="compact" color="primary">

        <template #prepend>

            <v-btn icon variant="text" density="comfortable" class="mr-2"
                   :disabled="!pageView()?.canGoBack()" @click="pageView().goBack()">
                <v-icon icon="mdi-arrow-left" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="pageView().reload()">
                <v-icon icon="mdi-reload" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2"
                   :disabled="!pageView()?.canGoForward()" @click="pageView().goForward()">
                <v-icon icon="mdi-arrow-right" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="goToHome">
                <v-icon icon="mdi-home-outline" size="small"/>
            </v-btn>

        </template>

        <div class="flex-fill pr-2">
            <v-text-field v-model="searchText" ref="searchInput" variant="solo-filled" flat density="compact"
                          rounded hide-details placeholder="Search web address or enter" bg-color="primary"
                          @change="store.updateActiveTab({searchText: $event.target.value})"
                          @keydown.enter="search" >

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
            <HeaderMenu/>
        </template>

    </v-app-bar>
</template>