import {ref} from "vue";
import {defineStore} from 'pinia';

interface Tab {
    id: number,
    url?: string,
    title?: string,
    searchText?: string | null
}

const useStore = defineStore('app', () => {

    const homePageUrl = ref<string>('https://www.google.com/')
    const theme = ref<string>('system')
    const tabs = ref<Tab[]>([])
    const activeTabId = ref<number | null>(null)

    const setHomePage = (url: string): void => {
        homePageUrl.value = url
    }

    const addNewTab = (): void => {
        const newTab: Tab = {
            id: Date.now(),
            url: homePageUrl.value,
            title: 'New Tab'
        }
        tabs.value.push(newTab)
        activeTabId.value = newTab.id
    }

    const closeTab = (id: number): void => {
        tabs.value = tabs.value.filter((tab: Tab)=> tab.id !== id)

        if(id === activeTabId.value){
            setTimeout(()=> setActiveTabId(tabs.value[tabs.value.length - 1].id), 10)
        }

    }

    const setActiveTabId = (tabId: number): void => {
        activeTabId.value = tabId
    }

    const getActiveTab = (): Tab => tabs.value.find((tab: Tab) => tab.id === activeTabId.value)

    const updateActiveTab = (tabData: Tab): void => {
        const currentTab: Tab = tabs.value.find((tab: Tab) => tab.id === activeTabId.value)
        currentTab.id = tabData.id
        if(tabData.url) currentTab.url = tabData.url
        if(tabData.title) currentTab.title = tabData.title
        if(tabData.searchText) currentTab.searchText = tabData.searchText
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

});

export default useStore;