<template>
  <div class="flex flex-col h-full">
    <HeaderTop
      :title="`Buen día, ${username}!`"
      :subtitle="`Has estudiado por ${streakDuration} día${
        streakDuration != 1 ? 's' : ''
      } consecutivo${streakDuration != 1 ? 's' : ''}`"
    />
    <div class="flex flex-row h-full mb-5">
      <SetReciente />
      <MiProgreso />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderTop from '../../components/HeaderTop.vue'
import SetReciente from './components/SetReciente.vue'
import MiProgreso from './components/MiProgreso.vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
const userStore = useUserStore()

const username = ref(userStore.name)
const streakDuration = ref(userStore.streakDuration)
</script>

<style scoped></style>
