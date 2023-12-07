<template>
    <div v-if="reinicio" class ="h-full w-full ">
        <PreguntaQuizVue/>
    </div>
    <div v-else class = "h-full w-full">
    <div class=" h-[20%] w-full flex flex-row justify-center items-center">
        <div class="w-[45%] h-full mr-10 rounded-2xl flex flex-row items-center justify-center bg-primary-barracolor text-lg font-semibold font-sans-Poppins ">
            👏 Obtuviste 17 acierttos  
        </div>
        <div class="w-[45%] h-full rounded-2xl flex flex-row items-center justify-center bg-primary-barracolor text-lg font-semibold font-sans-Poppins ">
            ✨ Obtuviste 450 puntos
        </div>
    </div>
    <div class = "h-[10%] w-full flex flex-row justify-center items-center font-semibold font-sans-Poppins text-xl">
        Conceptos que tienes que repasar
    </div>
    <FlashcardDeck class ="h-1/2 w-full " :flashcards="flashcards"></FlashcardDeck>
    <div class ="h-10 w-full text-xl flex flex-row font-bold font-sans-Poppins text-purple-700">
        <div class ="flex justify-start items-center w-[30%]" @click="HandleClick()"> Tomar de nuevo</div>
        <RouterLink class ="flex ml-[70%] justify-center items-center w-[30%] rounded-xl bg-primary-botonañadir text-primary-fondo" to ="/quizzes">
        <div> Salir </div>
        </RouterLink>
    </div>
    </div>
</template>
  
  <script setup lang="ts">
  import FlashcardDeck from '@/components/FlashcardDeck.vue'
  import type { Flashcard, Set } from '@/entities/Set';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router'
    import router from '@/router'
import PreguntaQuizVue from './PreguntaQuiz.vue';
    let reinicio = ref(false)
    const route = useRoute()
  const props = defineProps<{
    set: string,
    flashcardsincorrectas: Flashcard[]
    }>()
    const flashcards = ref<Flashcard[]>([])
    console.log(props.set)
    flashcards.value = props.flashcardsincorrectas
    const flashcards_actuales = route.params.id

    function HandleClick(){
        reinicio.value = true
    }
  </script>
  
  <style scoped></style>