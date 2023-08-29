import { defineStore } from "pinia";
export const useSystem = defineStore('system', {
  state: () => {
    return {
      isCollapse: false
    }
  },
})