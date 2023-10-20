<script setup lang="ts">
import { RouterView } from 'vue-router'
import HomePage from './pages/HomePage/HomePage.vue';
import HeaderTop from './pages/HomePage/HeaderTop.vue';
import SetReciente from './pages/HomePage/SetReciente.vue';
</script>

<template>
  <div class="flex flex-row min-h-screen bg-primary-fondo">

    <RouterView />
    <div class ="flex flex-col w-full mt-10">
      <HeaderTop />
      <div class = ""></div>
      <SetReciente />
    </div>
  </div>
</template>

<style scoped>
</style>