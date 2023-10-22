<script setup lang="ts">
import { RouterView } from 'vue-router'
import HomePage from './pages/HomePage/HomePage.vue';

</script>

<template>
  <div class="flex flex-row min-h-screen bg-primary-fondo">
    <HomePage />
    <RouterView />

  </div>
</template>

<style scoped>
</style>