import {ref} from 'vue'
import {defineStore} from 'pinia'

interface Tab {
    id?: number,
    url?: string,
    title?: string,
    searchText?: string | null
}

const useStore = defineStore('app', () => {

    const homePageUrl = ref<string>('https://www.google.com/')
    const theme = ref<string>('system')
    const tabs = ref<Tab[]>([])
    const activeTabId = ref<number | null>(null)

    const setHomePage = (url: string) => homePageUrl.value = url

    const addNewTab = () => {

        const newTab: Tab = {
            id: Date.now(),
            url: homePageUrl.value,
            title: 'New Tab'
        }

        tabs.value.push(newTab)
        activeTabId.value = newTab.id

    }

    const closeTab = (id: number) => {
        tabs.value = tabs.value.filter((tab: Tab) => tab.id !== id)
        id === activeTabId.value && setActiveTabId(tabs.value[tabs.value.length - 1].id)
    }

    const setActiveTabId = (tabId: number) => activeTabId.value = tabId

    const getActiveTab = () => tabs.value.find((tab: Tab) => tab.id === activeTabId.value)

    const updateActiveTab = (payload: Tab) => {
        tabs.value = tabs.value.map((tab: Tab) => tab.id === activeTabId.value ? {...tab, ...payload} : tab)

        console.log(activeTabId.value)
    }

    return {
        homePageUrl,
        theme,
        tabs,
        activeTabId,
        setHomePage,
        addNewTab,
        closeTab,
        getActiveTab,
        setActiveTabId,
        updateActiveTab,
    }

})

export default useStore