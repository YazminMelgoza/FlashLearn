<template>
  <Suspense>
  <div v-if="reinicio" class="h-full w-full">
    <PreguntaQuizVue />
  </div>
  <div v-else class="h-full w-full">
    <div class="h-[20%] w-full flex flex-row justify-center items-center">
      <div
        class="w-[45%] h-full mr-10 rounded-2xl flex flex-row items-center justify-center bg-primary-barracolor text-lg font-semibold font-sans-Poppins"
      >
        👏 Obtuviste {{ correctas }} aciertos
      </div>
      <div
        class="w-[45%] h-full rounded-2xl flex flex-row items-center justify-center bg-primary-barracolor text-lg font-semibold font-sans-Poppins">
        ✨ Obtuviste {{ puntos }} puntos
      </div>
    </div>
    <div
      class="h-[10%] w-full flex flex-row justify-center items-center font-semibold font-sans-Poppins text-xl"
    >
      Conceptos que tienes que repasar
    </div>
    <FlashcardDeck class="h-1/2 w-full" :flashcards="flashcards"></FlashcardDeck>
    <div class="h-10 w-full text-xl flex flex-row font-bold font-sans-Poppins text-purple-700">
      <div class="flex justify-start items-center w-[30%]" @click="HandleClick()">
        Tomar de nuevo
      </div>
      <RouterLink
        class="flex ml-[70%] justify-center items-center w-[30%] rounded-xl bg-primary-botonañadir text-primary-fondo"
        to="/quizzes"
      >
        <div>Salir</div>
      </RouterLink>
    </div>
  </div>
</Suspense>
</template>

<script setup lang="ts">
import FlashcardDeck from '@/components/FlashcardDeck.vue'
import type { Flashcard, Set } from '@/entities/Set'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PreguntaQuizVue from './PreguntaQuiz.vue'
import FlashcardRepository from '@/pages/PlayQuiz/PlayQuizPage'

const flashcardRepository = new FlashcardRepository
const reinicio = ref(false)
const route = useRoute()
const props = defineProps<{
  set: string
  flashcardsincorrectas: Flashcard[]
  flashcardscorrectas: Flashcard[]
}>()

const emit = defineEmits<{
  (e: 'reinicio'): void
}>()
const flashcards = ref<Flashcard[]>([])
const flashcards_cor = ref<Flashcard[]>([])
const puntos = ref(0)
console.log(props.set)
flashcards_cor.value = props.flashcardscorrectas
const correctas = flashcards_cor.value.length
flashcards.value = props.flashcardsincorrectas
const flashcards_actuales = route.params.id
onMounted(async () => {
try {
  for (let flashcard of flashcards_cor.value) {
    if (!(flashcard.lastReviewTimestamp instanceof Date) || isNaN(flashcard.lastReviewTimestamp.getTime())) {
        // Handle the case where lastReviewTimestamp is not a valid Date
        // For example, set it to the current date
        flashcard.lastReviewTimestamp = new Date();
    }
  flashcard.easePercentage = await flashcardRepository.calcularNuevoFactorDificultad(flashcard,true)
  console.log(flashcard.easePercentage)
  puntos.value += 3/flashcard.easePercentage
  console.log(puntos)
}
  puntos.value = Math.round(puntos.value)
  console.log(puntos.value)
  } catch (error) {
    console.error(error)
    alert('Error al cargar el set. Por favor, inténtelo de nuevo.')
  }
})
function HandleClick() {
  reinicio.value = true
  emit('reinicio')
}
</script>

<style scoped></style>
