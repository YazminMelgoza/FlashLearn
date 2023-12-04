<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SetRepository } from '@/repositories/SetRepository'
import { onMounted, ref } from 'vue'
import type { Flashcard } from '@/entities/Set'
import FlashcardDeck from '@/components/FlashcardDeck.vue'

const route = useRoute()
const setRepository = new SetRepository()
const flashcards = ref<Flashcard[]>([])

onMounted(async () => {
  console.log(route.params.id)
  try {
    flashcards.value = await setRepository.getSetFlashcards(route.params.id)
  } catch (error) {
    console.error(error)
    alert('Error al cargar el set. Por favor, inténtelo de nuevo.')
  }
})
</script>

<template>
  <div class="flex flex-col items-start justify-start">
    <FlashcardDeck :flashcards="flashcards"></FlashcardDeck>
  </div>
</template>

<style scoped></style>
