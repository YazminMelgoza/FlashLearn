<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SetRepository } from '@/repositories/SetRepository'
import { onMounted, ref } from 'vue'
import type { Flashcard } from '@/entities/Set'

const route = useRoute()
const setRepository = new SetRepository()
const flashcards = ref<Flashcard[]>([])

onMounted(async () => {
  console.log(route.params.id)
  try {
    const set = await setRepository.getSetFlashcards(route.params.id)
    console.log(set)
  } catch (error) {
    console.error(error)
    alert('Error al cargar el set. Por favor, inténtelo de nuevo.')
  }
})
</script>

<template>
  Id del set <br />
  {{ route.params.id }}

  Flashcards <br />
  {{ flashcards }}
</template>

<style scoped></style>
