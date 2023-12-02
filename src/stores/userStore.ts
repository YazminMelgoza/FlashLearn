import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: ref(''),
      email: ref(''),
      points: ref(0),
      id: ref(''),
      level: ref(1),
      isLoaded: ref(false),
      lastActivity: ref(null),
      streakDuration: ref(0)
    }
  }
})
