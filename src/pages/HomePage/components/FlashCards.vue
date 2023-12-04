<template>
  <div class="flex flex-col items-center justify-start">
    <HeaderTop title="Sets de Flashcards" />
    <div class="w-full">
      <RouterLink to="creacionfc" class="float-right">
        <button class="bg-accent-600 text-white text-lg font-bold rounded-xl px-4 py-2 mt-4">
          + Crear un Nuevo set
        </button>
      </RouterLink>
    </div>
    <FcReciente
      :key="index"
      v-for="(groupKey, index) in Object.keys(setsComputed)"
      :group-title="groupKey"
    >
      <FcDentro v-for="set in setsComputed[groupKey]" :key="set.id" :set="set"></FcDentro>
    </FcReciente>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FcReciente from './FcReciente.vue'
import HeaderTop from '@/components/HeaderTop.vue'
import { SetRepository } from '@/repositories/SetRepository'
import { onMounted, ref, computed } from 'vue'
import type { Set } from '@/entities/Set'
import FcDentro from '@/pages/HomePage/components/FcDentro.vue'

const setRepository = new SetRepository()
const sets = ref<Set[]>([])

// get the computed property of the sets
// in format of
//{
//  'course': Set[]
//}
const setsComputed = computed(() => {
  const setsByCourse: Record<string, Set[]> = {}
  sets.value.forEach((set) => {
    if (!setsByCourse[set.course]) {
      setsByCourse[set.course] = []
    }
    setsByCourse[set.course].push(set)
  })
  return setsByCourse
})

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
