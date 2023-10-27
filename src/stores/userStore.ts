import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: ref(''),
      email: ref('')
    }
  }
})


interface UserInfo {
  name: string;
  email: string;
}