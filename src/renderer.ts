import {createApp} from "vue"
import {createVuetify, ThemeDefinition} from 'vuetify'

// eslint-disable-next-line import/no-unresolved
import {aliases, mdi} from 'vuetify/iconsets/mdi'

// eslint-disable-next-line import/no-unresolved
import * as components from 'vuetify/components'

// eslint-disable-next-line import/no-unresolved
import * as directives from 'vuetify/directives'

// eslint-disable-next-line import/no-unresolved
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

import App from './App.vue'
import router from './router/index'

import {createPinia, Pinia} from 'pinia'

const pinia: Pinia = createPinia()

const light: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        lighten: "#edeff5",
        primary: "#002a8d",
    },
}

const dark: ThemeDefinition = {
    dark: true,
    colors: {
        background: "#020617",
        surface: "#0f172a",
        lighten: "#090f1b",
        primary: "#002a8d",
    },
}

const vuetify = createVuetify(
    {
        defaults: {
            global: {
                ripple: true
            }
        },
        theme: {
            defaultTheme: 'dark',
            themes: {
                light,
                dark,
            },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            }
        },
        components,
        directives
    }
)

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.config.compilerOptions.isCustomElement = tag => tag === 'webview'
app.mount("#app")
