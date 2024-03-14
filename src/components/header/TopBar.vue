<script setup lang="ts">

import HeaderActions from './Actions.vue'

const {ipcRenderer} = require('electron')

import {ref} from 'vue'
import useStore from '../../store'

const store = useStore()

/*
* If the app is opened for the first time,
* create the first tab
* */
!store.tabs.length && store.addNewTab()

/*
Check that the page is maximized
* */
const isMaximized = ref(false)

ipcRenderer.on('isMaximized', (_event, value) => {
    isMaximized.value = value
})

/*
* Function to close the app
* */
const quitApp = () => ipcRenderer.invoke('quit-app')

/*
* Function that closes the page
* */
const closeTab = (id: number) => {
    store.tabs.length === 1 && quitApp()
    store.closeTab(id)
}

</script>

<template>

    <v-app-bar app flat density="compact" color="transparent" :height="56" class="top-bar">

        <v-tabs :model-value="store.activeTabId" :height="32" hide-slider center-active show-arrows
                class="mt-auto pl-2">
            <template v-for="tab in store.tabs" :key="`page-tab-${tab.id}`">

                <v-tab :value="tab.id" :title="tab.title" class="rounded-t-lg px-2"
                       :class="{'bg-primary': tab.id === store.activeTabId}"
                       @click.self="store.setActiveTabId(tab.id)">

                    <span class="d-flex align-center text-truncate text-none text-caption mr-2" style="max-width: 150px"
                          @click="store.setActiveTabId(tab.id)">

                        <img :src="`https://www.google.com/s2/favicons?domain=${tab.url}`"
                             :alt="tab.url" :height="16" :width="16" class="mr-2"/>

                        {{ tab.title }}

                    </span>

                    <v-btn size="small" density="compact" icon variant="text" @click="closeTab(tab.id)">
                        <v-icon icon="mdi-close" size="small"/>
                    </v-btn>

                </v-tab>

                <v-divider vertical inset class="mx-1"/>

            </template>
        </v-tabs>

        <v-btn :height="32" :min-width="32" :width="32" variant="text" color="primary"
               class="mt-auto rounded-b-0 rounded-t-lg" @click="store.addNewTab">
            <v-icon icon="mdi-plus"/>
        </v-btn>

        <template #append>

            <v-btn rounded="0" :height="40" :min-width="40" :width="40" variant="text"
                   @click="ipcRenderer.invoke('minimize-app')">
                <v-icon icon="mdi-minus"/>
            </v-btn>

            <v-btn rounded="0" :height="40" :min-width="40" :width="40" variant="text"
                   @click="ipcRenderer.invoke('maximize-app')">
                <v-icon :icon="`mdi-${isMaximized ? 'window-restore' : 'window-maximize'}`"/>
            </v-btn>

            <v-hover>
                <template #default="{ isHovering, props }">
                    <v-btn v-bind="props" rounded="0" :height="40" :min-width="44" :width="44"
                           :variant="isHovering ? 'flat' : 'text'" :color="isHovering ? 'red' : ''"
                           @click="quitApp">
                        <v-icon icon="mdi-close"/>
                    </v-btn>
                </template>
            </v-hover>

        </template>

    </v-app-bar>

    <HeaderActions/>

</template>

<style lang="scss">
.top-bar {

    user-select: none;
    -webkit-user-select: none;
    -webkit-app-region: drag;

    .v-tabs, button {
        -webkit-app-region: none;
    }

    .v-toolbar {

        &__append {
            margin-right: 0 !important;
        }
    }
}
</style>