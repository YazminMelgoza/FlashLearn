<script setup lang="ts">
import { RouterView } from 'vue-router'
import HomePage from './components/NavigationBar.vue'
import { useUserStore } from './stores/userStore'
import { onMounted } from 'vue'
import { UserRepository } from './repositories/UserRepository'

const userStore = useUserStore()

function isLogged() {
  return userStore.uid && userStore.uid !== ''
}

async function syncUserWithDatabaseWhenPageReloaded() {
  if (!userStore.uid) return
  const usersRepository = new UserRepository()
  await usersRepository.loadUser(userStore.uid)
}

onMounted(syncUserWithDatabaseWhenPageReloaded)
</script>

<template>
  <div class="flex flex-row min-h-screen bg-primary-fondo">
    <HomePage v-if="isLogged()" class="fixed h-screen bg-white" />
    <!--    <RouterView class="ml-[15rem] w-[calc(100% - 15rem)]" />-->
    <div class="w-screen p-10">
      <RouterView :class="isLogged() ? 'ml-[15rem] w-[calc(100% - 15rem)]' : 'w-full'" />
    </div>
  </div>
</template>
