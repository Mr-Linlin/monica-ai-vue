import { defineStore } from 'pinia'
export const useCommon = defineStore('common', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    setConfig(data: any) {
      if (data) {

      }

    },
  },
})