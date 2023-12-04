<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SetRepository } from '@/repositories/SetRepository'
import { onMounted, ref } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import type { Flashcard, Set } from '@/entities/Set'
import FlashcardDeck from '@/components/FlashcardDeck.vue'
import HeaderTop from '@/components/HeaderTop.vue'

const route = useRoute()
const setRepository = new SetRepository()
const flashcards = ref<Flashcard[]>([])
const set = ref<Set>({
  id: '',
  title: '',
  course: '',
  description: '',
  imageUrl: ''
})

onMounted(async () => {
  console.log(route.params.id)
  try {
    flashcards.value = await setRepository.getSetFlashcards(route.params.id)
    set.value = await setRepository.getSet(route.params.id)
  } catch (error) {
    console.error(error)
    alert('Error al cargar el set. Por favor, inténtelo de nuevo.')
  }
})
</script>

<template>
  <div class="flex flex-col items-start justify-start">
    <HeaderTop>
      <!--      Boton de regresar -->
      <div class="flex flex-row items-center justify-start">
        <router-link to="/flashcards" class="text-primary-100 group text-2xl font-semibold">
          <ArrowLeftIcon
            class="w-8 inline h-8 mr-2 transition-translate ease-in-out duration-100 group-hover:-translate-x-1/2"
          />
          Regresar
        </router-link>
      </div>
    </HeaderTop>
    <!--    Titulo-->
    <h2 class="w-full justify-start font-sans-Poppins text-stone-950 text-4xl h-[10%] font-bold">
      {{ set.title }}
    </h2>
    <!--    course-->
    <p class="w-full justify-start text-slate-600 text-2xl h-[10%] font-bold">
      {{ set.course }}
    </p>
    <!--    Descripcion-->
    <p
      class="w-full max-w-2xl mt-6 justify-start font-sans-Poppins text-stone-950 text-2xl h-[10%]"
    >
      {{ set.description }}
    </p>

    <FlashcardDeck :flashcards="flashcards"></FlashcardDeck>
    <!--    Boton de tomar quiz-->
    <div class="w-full">
      <button
        class="bg-accent-600 float-right text-white text-lg font-bold rounded-xl px-4 py-2 mt-4"
      >
        Tomar Quiz
      </button>
    </div>
  </div>
</template>

<style scoped></style>
