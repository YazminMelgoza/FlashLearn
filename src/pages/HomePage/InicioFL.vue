<template>
    <div v-if="userStore.isLoaded" class="flex flex-col h-full">
      <HeaderTop :title="`Bienvenido, ${username}!`" :subtitle="`Has estudiado por ${streakDuration } dias consecutivos`"/>
      <div class="flex flex-row h-full mb-5">
        <SetReciente />
        <MiProgreso />
      </div>
    </div>
    <div v-else class="w-full h-full items-center justify-center flex">
      <img class="" src="https://camaradecomerciogdl1.com/camaraaccess/static/img/loading2.gif" alt="">
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
