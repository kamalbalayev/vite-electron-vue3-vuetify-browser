<script setup lang="ts">

defineProps<{ pageView: any }>()

import useStore from '../../store';
const store: any = useStore()

const themes = [
    {
        name: 'System',
        key: 'system',
    },
    {
        name: 'Light',
        key: 'light',
    },
    {
        name: 'Dark',
        key: 'dark',
    },
]

</script>

<template>
    <v-menu :close-on-content-click="false" offset="6">

        <template #activator="{ props }">
            <v-btn icon variant="text" density="comfortable" v-bind="props">
                <v-icon icon="mdi-menu"/>
            </v-btn>
        </template>

        <v-card min-width="300">
            <v-list density="compact" nav class="pa-2">

                <v-list-item>
                    <div class="d-flex justify-space-between align-center">

                        <v-list-item-title>
                            <v-icon icon="mdi-theme-light-dark" start size="small"/>
                            Theme
                        </v-list-item-title>

                        <v-list-item-action>
                            <div>
                                <v-select v-model="store.theme"
                                          :items="themes" item-title="name" item-value="key"
                                          density="compact" variant="solo-filled" hide-details/>
                            </div>
                        </v-list-item-action>

                    </div>
                </v-list-item>

                <v-divider class="my-3"/>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon icon="mdi-star-shooting-outline" start size="small"/>
                        Favourites
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon icon="mdi-history" start size="small"/>
                        History
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon icon="mdi-tray-arrow-down" start size="small"/>
                        Downloads
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon icon="mdi-puzzle-outline" start size="small"/>
                        Extensions
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon icon="mdi-help-circle-outline" start size="small"/>
                        Help
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon icon="mdi-cog-outline" start size="small"/>
                        Settings
                    </v-list-item-title>
                </v-list-item>

                <v-divider class="my-3"/>

                <v-list-item @click="pageView().print()">
                    <v-list-item-title>
                        <v-icon icon="mdi-printer-outline" start size="small"/>
                        Print
                    </v-list-item-title>
                </v-list-item>

                <v-list-item @click="pageView().openDevTools()">
                    <v-list-item-title>
                        <v-icon icon="mdi-tools" start size="small"/>
                        Open Dev Tools
                    </v-list-item-title>
                </v-list-item>

            </v-list>
        </v-card>
    </v-menu>
</template>