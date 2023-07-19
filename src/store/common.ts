import { defineStore } from 'pinia'
import { ElNotification } from "element-plus";
import api from '@/api/apis';

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
    },
    async getUserInfo() {
      const { code, user } = await api.getUserInfo()
      // console.log(user);
      if (code == 200) {
        localStorage.setItem('user', JSON.stringify(user))
        return user
      }
    }
  },
  getters: {
    getUser(): any {
      if (this.user) {

        return this.user
      } else {
        const user = localStorage.getItem('user');
        if (user !== null) {
          this.user = JSON.parse(user)
          return this.user;
        }
        return {}
      }
    },
  },
})