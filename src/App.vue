<script setup lang="ts">
import { RouterView } from 'vue-router'
import HomePage from './components/NavigationBar.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'
import { ref } from 'vue'
import router from './router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const path = computed(() => route.path)
const isLogged = ref(false)

onAuthStateChanged(auth, (user) => {
  if (!user) {
    router.push('/login')
    isLogged.value = false
  } else {
    console.log(user)
    isLogged.value = true
    if (path.value === '/login' || path.value === '/registro') {
      router.push('/inicio')
    }
  }
})
</script>

<template>
  <div class="flex flex-row min-h-screen bg-primary-fondo">
    <HomePage v-if="isLogged" class="fixed h-screen bg-white" />
    <!--    <RouterView class="ml-[15rem] w-[calc(100% - 15rem)]" />-->
    <RouterView :class="isLogged ? 'ml-[15rem] w-[calc(100% - 15rem)]' : 'w-full'" />
  </div>
</template>

<style scoped></style>
