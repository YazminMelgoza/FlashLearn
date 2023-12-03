<template>
  <div class="flex flex-col items-center justify-start">
    <HeaderTop title="Sets de Flashcards" />
    <RouterLink to="creacionfc">
      <div
        class="w-48 h-12 rounded-3xl ml-auto bg-primary-botonañadir text-white font-sans-Poppins font-bold flex justify-center mt-[5%] mr-[18%]"
      >
        <div class="flex justify-center items-center">+ Nuevo Set</div>
      </div>
    </RouterLink>
    <FcReciente />
    {{ sets }}
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FcReciente from './FcReciente.vue'
import HeaderTop from '@/components/HeaderTop.vue'
import { SetRepository } from '@/repositories/SetRepository'
import { onMounted, ref } from 'vue'
import type { Set } from '@/entities/Set'

const setRepository = new SetRepository()
const sets = ref<Set[]>([])

onMounted(async () => {
  try {
    sets.value = await setRepository.getAllSets()
  } catch (error) {
    console.error(error)
    alert('Error al cargar los sets. Por favor, inténtelo de nuevo.')
  }
})
</script>

<style scoped></style>
