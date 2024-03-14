<script setup lang="ts">

import HeaderTopBar from './components/header/TopBar.vue'

const {ipcRenderer} = require('electron')
import {onMounted, watch} from "vue"
import {useTheme} from 'vuetify'
import useStore from './store'

const store = useStore()
const theme = useTheme()

const setThemeColor = () => {

    /*Sets the color mode of the app*/
    ipcRenderer.invoke('theme', store.theme)

    /*Sets color mode for Vuetify*/
    theme.global.name.value = store.theme === 'system'
        ? window.matchMedia
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            : 'light'
        : store.theme
}

onMounted(() => setThemeColor())
watch(() => store.theme, () => setThemeColor())

</script>

<template>
    <v-app>

        <HeaderTopBar/>

        <v-main>

            <RouterView/>

        </v-main>

    </v-app>
</template>

<style lang="scss">
html {
    overflow: hidden;
}
</style>