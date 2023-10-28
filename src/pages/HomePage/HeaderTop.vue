<template>
  <div class="w-full h-1/5">
    <header class="inline-flex w-full flex-row align-middle justify-start items-center">
      <saludo
        class="flex mr-auto font-sans-Popping text-3xl flex-col justify-start items-start ml-20 font-bold text-black-900"
      >
        Buenos dias {{ username }}!
        <subtitulo
          class="flex mt-auto h-1/12 w-4/5 text-xl font-semibold text-primary-seleccionado justify-start mb-auto"
        >
          Llevas 365 dias consecutivos aprendiendo</subtitulo
        >
      </saludo>
      <datosusuario class="flex flex-row h-auto right-auto justify-end">
        <puntajedeusuario
          class="flex h-auto font-semibold text-purple-500 text-lg align-middle items-center justify-center"
        >
          <svg
            class="mr-3"
            width="20"
            height="25"
            viewBox="0 0 49 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.5 2L17 17L2 22.5L17 28.5L25.5 45.5L32 28.5L47.5 22.5L32 17L25.8692 2.85196L25.5 2Z"
              fill="#AB10D2"
              stroke="#B600BA"
            />
          </svg>
          500 puntos</puntajedeusuario
        >
        <usuario class="flex flex-row h-auto font-semibold right:auto">
          <iconodeusuario class="w-16 h-16 rounded-full bg-blue-500"> </iconodeusuario>
          <nombredeusuario
            class="w-2/3 h-full text-lg text-primary-seleccionado flex justify-start items-center ml-3"
          >
            {{ username }}</nombredeusuario
          >
          <niveldeusuario> </niveldeusuario>
        </usuario>
      </datosusuario>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
const userStore = useUserStore()
import { ref } from 'vue'
const username = ref('')

onMounted( () => {
  console.log('HeaderTop mounted')
  username.value = userStore.name
})

</script>

<style scoped></style>
