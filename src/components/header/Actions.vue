<script setup lang="ts">

import useStore from '../../store';

const store: any = useStore()

!store.tabs.length && store.addNewTab()

const activePage = (): any => document.getElementById(`page-${store.activeTabId}`)

</script>

<template>

    <v-app-bar app flat density="compact" color="transparent" :height="56" class="py-0">

        <v-tabs :model-value="store.activeTabId" :height="32" hide-slider center-active show-arrows class="mt-auto pl-2">
            <template v-for="tab in store.tabs" :key="`page-tab-${tab.id}`">

                <v-tab :value="tab.id" :title="tab.title" class="rounded-t-lg pr-2"
                       :class="{'bg-surface': tab.id === store.activeTabId}"
                       @click.self="store.setActiveTabId(tab.id)">

                    <span class="d-flex" @click="store.setActiveTabId(tab.id)">
                        <img :src="`https://www.google.com/s2/favicons?domain=${tab.url}`"
                             :alt="tab.url" :height="16" :width="16" class="mr-2"/>

                        {{ tab.title }}
                    </span>

                    <v-btn size="small" density="compact" icon variant="text" class="ml-2"
                           @click="store.closeTab(tab.id)">
                        <v-icon icon="mdi-close" size="small"/>
                    </v-btn>

                </v-tab>

                <v-divider vertical inset class="mx-1"/>

            </template>
        </v-tabs>

        <v-btn :height="32" :min-width="32" :width="32" variant="text"
               class="mt-auto rounded-b-0 rounded-t-lg" @click="store.addNewTab">
            <v-icon icon="mdi-plus"/>
        </v-btn>

        <template #append>

            <v-btn rounded="0" :height="40" :min-width="40" :width="40" variant="text">
                <v-icon icon="mdi-minus"/>
            </v-btn>

            <v-btn rounded="0" :height="40" :min-width="40" :width="40" variant="text">
                <v-icon icon="mdi-crop-square"/>
            </v-btn>

            <v-btn rounded="0" :height="40" :min-width="40" :width="40" variant="text">
                <v-icon icon="mdi-close"/>
            </v-btn>

        </template>

    </v-app-bar>

    <v-app-bar app flat density="compact">

        <template #prepend>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="activePage().goBack()">
                <v-icon icon="mdi-arrow-left" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="activePage().reload()">
                <v-icon icon="mdi-reload" size="small"/>
            </v-btn>

            <v-btn icon variant="text" density="comfortable" class="mr-2" @click="activePage().goToIndex(0)">
                <v-icon icon="mdi-home-outline" size="small"/>
            </v-btn>

        </template>

        <div class="flex-fill pr-2">
            <v-text-field variant="solo-filled" flat density="compact" rounded hide-details
                          placeholder="Search web address or enter">

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

        <template v-slot:append>
            <v-app-bar-nav-icon density="comfortable"/>
        </template>

    </v-app-bar>

</template>