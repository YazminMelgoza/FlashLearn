import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: ref(''),
      email: ref(''),
      points: ref(0)
    }
  }
})
