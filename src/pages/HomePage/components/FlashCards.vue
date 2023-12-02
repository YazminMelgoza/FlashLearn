<template>
  <div class=" flex flex-col items-center justify-start">
    <HeaderTop title="Sets de Flashcards"/>
    <botonanadir
      class="w-48 h-12 rounded-3xl ml-auto bg-primary-botonañadir text-white font-sans-Poppins font-bold flex justify-center mt-[5%] mr-[18%]"
    >
      <botontexto class="flex justify-center items-center">+ Nuevo Set</botontexto>
    </botonanadir>
    <FcReciente />
  </div>
</template>

<script setup lang="ts">
import FcReciente from './FcReciente.vue'
import HeaderTop from '@/components/HeaderTop.vue'

</script>

<style scoped></style>
