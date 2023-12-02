<template>
  <div class="w-2/3 h-1/2 flex flex-col justify-center align-items">
    <tituloset class="text-xl text-sans-Poppins font-semibold items-start justify-center"
      >Historia de Mexico</tituloset
    >
    <contenedorfc
      class="flex-row rounded-xl mt-[3%] bg-primary-bloques flex justify-center w-full h-full"
    >
      <FcDentro />
      <FcDentro />
      <FcDentro />
    </contenedorfc>
  </div>
</template>

<script setup lang="ts">
import FcDentro from './FcDentro.vue'
</script>

<style scoped></style>
