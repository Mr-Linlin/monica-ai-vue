import { defineStore } from 'pinia'
import { ElNotification } from "element-plus";

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
        this.user = data.user
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    },
    loginOut() {
      const localStorageName = [
        'user',
        'token',
      ]
      localStorageName.forEach((item) => {
        localStorage.removeItem(item)
      })
      ElNotification({
        title: "成功",
        message: '退出登录成功',
        type: "success",
        duration: 1500,
      });
      location.reload()
    }
  },
  getters: {
    getUser: (state: { user: any }) => {
      if (state.user) {
        return state.user
      } else {
        const user = localStorage.getItem('user');
        if (user !== null) {
          return JSON.parse(user);
        }
        return {}
      }
    },
  },
})