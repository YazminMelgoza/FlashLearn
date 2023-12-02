<template>
  <div class="w-full h-1/5">
    <header class="flex w-full items-center justify-start py-4">
      <div class="w-[-webkit-fill-available] flex flex-col ">
        <!--      Titulo-->
        <p class=" font-sans-Popping text-3xl flex-col justify-start items-start font-bold text-black-900">
          {{ title }}
        </p>
        <!--      Subtitulo-->
        <p class="mt-auto h-1/12 w-4/5 text-xl font-semibold text-primary-seleccionado justify-start mb-auto">
          {{ subtitle }}
        </p>

      </div>
      <div class="flex flex-row h-auto justify-end gap-5">
        <!-- puntaje de usuario -->
        <div class="flex h-auto whitespace-nowrap font-semibold text-purple-500 text-lg items-center">
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
          {{ userPoints }} 150 puntos
        </div>
        <div class="flex flex-row h-auto font-semibold gap-4 items-center">
<!--          Circulito-->
          <div class="w-16 h-16 rounded-full bg-blue-500">
          </div>
<!--          Nombre de usuario-->
          <div class=" text-lg text-primary-100 flex flex-col">
            <span>

            {{ username }}
            </span>
            <span class="text-teal-500">
              Nivel 1
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { UserRepository } from '@/repositories/UserRepository'

const props = defineProps(['userPoints', 'title', 'subtitle', 'userPoints',  'userName']) // Añade las props necesarias

const userStore = useUserStore()
const username = ref('')
const userRepository = new UserRepository()

onMounted(() => {
  // Si no hay datos en el estado, cárgalos desde firestore
  if (!userStore.isLoaded) {
    console.log('Usuario no cargado')

  } else {
    console.log('Usuario cargado')
    username.value = userStore.name
  }
})
</script>
