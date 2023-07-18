import { defineStore } from 'pinia'
export const useCommon = defineStore('common', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    async setConfig(data: any) {
      if (data) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

    },
  },
})