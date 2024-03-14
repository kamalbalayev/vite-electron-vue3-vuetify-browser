import useStore from '../store'

export const useComposable = () => {

    const store = useStore()

    const pageView = () => document.getElementById(`page-${store.activeTabId}`)

    return {pageView}

}