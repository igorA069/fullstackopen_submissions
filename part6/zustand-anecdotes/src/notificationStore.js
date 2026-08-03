import { create } from "zustand";

const useNotificationStore = create(set => ({
  text: '',
  actions: {
    showNotification: text => {
      set(() => ({ text }))
      setTimeout(() => {
        set(() => ({ text: '' }))
      }, 5000)
    }
  }
}))

export const useNotificationMessage = () => useNotificationStore(state => state.text)
export const useNotificationActions = () => useNotificationStore(state => state.actions)