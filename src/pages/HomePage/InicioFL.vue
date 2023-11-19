<template>
  <div class="w-screen">
    <div v-if="userStore.isLoaded" class="flex flex-col h-full mt-10">
      <HeaderTop />
      <div class="flex flex-row h-full mb-5">
        <SetReciente />
        <MiProgreso />
      </div>
    </div>
    <div v-else class="w-full h-full items-center justify-center flex">
      <img class="" src="https://camaradecomerciogdl1.com/camaraaccess/static/img/loading2.gif" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderTop from './HeaderTop.vue'
import SetReciente from './SetReciente.vue'
import MiProgreso from './MiProgreso.vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

</script>

<style scoped></style>
