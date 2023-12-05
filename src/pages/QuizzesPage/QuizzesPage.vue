<script setup lang="ts">
import IndivQuiz from './IndivQuiz.vue'
import TermQuiz from './TermQuiz.vue'
import HeaderTop from '@/components/HeaderTop.vue'
import PlayQuizPage from '@/pages/PlayQuiz/PlayQuizPage.vue'
import { onMounted } from 'vue'
import { SetRepository } from '@/repositories/SetRepository'
import { ref } from 'vue'
import { showError } from '@/helpers/showError'

type Quiz = {
  id?: string
  title: string
  description: string
  course: string
  isPublic: boolean
  lastReviewTimestamp: Date | null
  progress: number
  numberOfFlashcards: number
}

const setRepository = new SetRepository()
const quizzesInProgress = ref<Quiz[]>([])
const quizzesFinished = ref<Quiz[]>([])
onMounted(async () => {
  console.log('QuizzesPage')
  // traer todos los sets del usuario
  try {
    const sets = await setRepository.getAllSets()
    console.log(sets)
    for (const set of sets) {
      console.log(set)
      const quiz: Quiz = {
        id: set.id,
        title: set.title,
        description: set.description,
        course: set.course,
        isPublic: set.isPublic,
        lastReviewTimestamp: set.lastReviewTimestamp,
        progress: 0,
        numberOfFlashcards: 0
      }

      // calcular el progreso del quiz conforme sus flashcards
      const flashcards = await setRepository.getSetFlashcards(set.id)
      const now = new Date()
      for (const flashcard of flashcards) {
        if (flashcard.lastReviewTimestamp == null) {
          continue
          // if the time  is in the future, skip
        } else if (flashcard.nextReviewTimestamp > now) {
          quiz.progress += 1
        }
      }
      quiz.numberOfFlashcards = flashcards.length
      if (quiz.progress == quiz.numberOfFlashcards) {
        quizzesFinished.value.push(quiz)
      } else {
        quizzesInProgress.value.push(quiz)
      }
      console.log('quizzes terminados')
      console.log(quizzesFinished.value)
      console.log('quizzes en progreso')
      console.log(quizzesInProgress.value)
    }
  } catch (error) {
    console.error(error)
    await showError('Error al cargar los quizzes. Por favor, inténtelo de nuevo.')
  }
})
</script>

<template>
  <div class="flex flex-col items-start justify-start">
    <HeaderTop title="Quizzes" />
    <div class="w-full justify-start font-sans-Poppins text-stone-950 text-2xl h-[10%] font-bold">
      En progreso
    </div>
    <div class="w-full flex flex-wrap justify-around items-start align-start">
      <IndivQuiz v-for="quiz in quizzesInProgress" :quiz="quiz" />
    </div>
    <div class="flex w-full justify-start text-stone-950 text-4xl ml-[10%] pt-12 font-bold">
      Terminados
    </div>
    <div class="ml-[10%] flex w-full h-1/5 flex-row">
      <TermQuiz />
      <TermQuiz />
      <TermQuiz />
    </div>
    <PlayQuizPage />
  </div>
</template>

<style scoped></style>
