<script setup lang="ts">
import { useRoute } from 'vue-router'
import { SetRepository } from '@/repositories/SetRepository'
import { onMounted, ref, watch } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import router from '@/router'
import { computed } from 'vue'
import type { Flashcard, Set } from '@/entities/Set'
import HeaderTop from '@/components/HeaderTop.vue'
import PosibleRespuesta from './PosibleRespuesta.vue'
import type { Quiz } from './QuizzesPage.vue'

const route = useRoute()
const setRepository = new SetRepository()
const flashcards = ref<Flashcard[]>([])
const set_quiz = ref<Set>({})
const flashcardscorrectas = ref<Flashcard[]>([])
const flashcardsincorrectas = ref<Flashcard[]>([])
const reiniciar = ref(false);
async function sleep(ms: number): Promise<void> {
    return new Promise(
        (resolve) => setTimeout(resolve, ms));
}

const props = defineProps<{
  quiz: Quiz[]
}>()

const quiz_actual = ref<Quiz[]>({})
console.log("quiz actual:")
console.log(quiz_actual)
let arreglo: number[] = []
const descubrir = ref(false);
onMounted(async () => {
  console.log(route.params.id)
  try {
    flashcards.value = await setRepository.getSetFlashcards(route.params.id)
    set_quiz.value = await setRepository.getSet(route.params.id)
    quiz_actual.value = await setRepository.getSet(route.params.id)
    
  } catch (error) {
    console.error(error)
    alert('Error al cargar el set. Por favor, inténtelo de nuevo.')
  }
  function randomizar(){
    let numero = Math.floor(Math.random() * flashcards.value.length) 
    return numero
  }
  console.log("quiz:")
  console.log(quiz_actual.numberOfFlashcards)
  // Usa un bucle for para agregar 4 elementos al arreglo
  for (let i = 0; i < 3; i++) {
    // Genera un número aleatorio del 0 al 9
    let numero = randomizar()
    arreglo.push(numero)
    while(arreglo[i] == currentFlashcardIndex.value){
      arreglo[i] = randomizar()
    }
    for(let x=0; x<3; x++){
      if(x!=i){
      while(arreglo[i] == arreglo[x]){
        arreglo[i] = randomizar()
      }
      }
    } 
    // Usa el método push para agregar el número al final del arreglo
  }
  arreglo.push(currentFlashcardIndex.value)

  mezclar(arreglo)
  // Muestra el arreglo en la consola
  console.log(arreglo)
})

const currentFlashcardIndex = ref(0)
let currentFlashcard = computed(() => {
  return flashcards.value![currentFlashcardIndex.value]
})
console.log(currentFlashcard.value)
function intercambiar(arr: number[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
// Declara una función auxiliar para mezclar el orden de los elementos de un arreglo usando el algoritmo de Fisher-Yates
function mezclar(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    intercambiar(arr, i, j)
  }
}
function handleRespuestaIncorrecta(active: boolean) {
      // Handle the information of an incorrect answer, and you also have the 'active' value
      descubrir.value = !descubrir.value
      console.log(descubrir)
      console.log('Respuesta incorrecta. Active value:', active);
      active = !active
      flashcardsincorrectas.value.push(flashcards.value![currentFlashcardIndex.value])
      console.log(flashcardsincorrectas.value)

      setTimeout(nextQuestion, 2000)
    }
function handleRespuestaCorrecta(correcto: boolean , active: boolean ) {
      // Handle the information of a correct answer, and you have both 'correcto' and 'active' values
      console.log('Respuesta correcta:', correcto);
      console.log('Active value:', active);
      flashcardscorrectas.value.push(flashcards.value![currentFlashcardIndex.value])
      // Perform additional actions if needed
      setTimeout(nextQuestion, 2000)
    }

function actualizarDescurbir(actualizar: boolean){
  descubrir.value = actualizar
}

function reiniciarRespuestas(reinicio: boolean){
  reiniciar.value = reinicio
}
function nextQuestion() {
  reiniciar.value = true
  currentFlashcardIndex.value++
  if (currentFlashcardIndex.value >= flashcards.value.length) {
    currentFlashcardIndex.value = 0
  }
}
watch(currentFlashcardIndex, (newIndex: number) => {
  currentFlashcard = computed(() => {
  return flashcards.value![newIndex]
})
arreglo = []
function randomizar(){
    let numero = Math.floor(Math.random() * flashcards.value.length) 
    return numero
  }
for (let i = 0; i < 3; i++) {
    // Genera un número aleatorio del 0 al 9
    let index = currentFlashcardIndex.value
    let numero = randomizar()
    arreglo[i] = numero
    while(arreglo[i] == index){
      console.log("mismo numero ")
      arreglo[i] = randomizar()
    }
    for(let x=0; x<3; x++){
      if(x!=i){
      while(arreglo[i] == arreglo[x]){
        arreglo[x] = randomizar()
          while(arreglo[x] == index){
          console.log("mismo numero ")
          arreglo[x] = randomizar()
    }
      }
      }
    } 
    // Usa el método push para agregar el número al final del arreglo
  }
  arreglo.push(currentFlashcardIndex.value)

  mezclar(arreglo)
  // Muestra el arreglo en la consola
  console.log(arreglo)
})
</script>

<template>
  <div class="h-full flex flex-col items-start justify-start">
    <HeaderTop class="h-[13%]" title="Quizzes" />
    <div class="flex flex-row h-1/12 w-full">
      <RouterLink to="quizzes">
        <svg
          class="flex justify-center mt-1 items-center"
          width="33"
          height="19"
          viewBox="0 0 33 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31 9.5H2M2 9.5L9.25 2M2 9.5L9.25 17"
            stroke="#003050"
            stroke-width="2.85714"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
      <div
        class="w-full justify-start items-center ml-2 font-sans-Poppins text-stone-950 text-lg h-[10%] font-medium mb-8"
      >
        Salir del Quiz
      </div>
    </div>
    <div class="w-full h-[10%] flex flex-row">
      <div class="w-11/12 justify-start font-sans-Poppins text-stone-950 text-3xl font-semibold" v-if="set_quiz">
        Examen de set de {{ quiz_actual.title }}
      </div>
      <div class="justify-end font-sans-Poppins text text-stone-950 font-semibold text-3xl">
        Fácil
      </div>
    </div>
    <div class="relative w-full h-[9%] flex justify-center items-center">
      <div
        class="relative w-full h-[90%] flex items-center flex-row bg-primary-barracolor rounded-3xl"
      >
        <div class="absolute h-full flex flex-row bg-primary-botonañadir rounded-3xl" :style="{
          width: (currentFlashcardIndex / flashcards.length) * 100 + '%'
        }"></div>
        <div
          class="absolute w-1/12 bg-primary-botonañadir h-[140%] rounded-xl shadow-2xl :" :style="{
          marginLeft: currentFlashcardIndex == 0 ? 0 : ((currentFlashcardIndex / flashcards.length) * 100) -5 + '%'
          }"></div>
      </div>
    </div>
    <div
      class="mt-[1.5%] w-full h-[30%] flex bg-primary-botonañadir rounded-2xl shadow-lg flex-col"
    >
      <div class="justify-end flex mr-8 mt-8">
        <svg
          width="40"
          height="40"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.875 5.25378C16.875 4.20941 15.6131 3.68722 14.8744 4.42503L10.4737 8.82659C10.2995 9.00066 10.0926 9.13868 9.86503 9.23279C9.63741 9.32689 9.39349 9.37522 9.14719 9.37503H5.625C4.63044 9.37503 3.67661 9.77012 2.97335 10.4734C2.27009 11.1766 1.875 12.1305 1.875 13.125V16.875C1.875 17.8696 2.27009 18.8234 2.97335 19.5267C3.67661 20.2299 4.63044 20.625 5.625 20.625H9.14719C9.39349 20.6248 9.63741 20.6732 9.86503 20.7673C10.0926 20.8614 10.2995 20.9994 10.4737 21.1735L14.8744 25.575C15.6131 26.3128 16.875 25.7907 16.875 24.7463V5.25378ZM11.7994 10.1522L15 6.95159V23.0494L11.7994 19.8488C11.4511 19.5004 11.0377 19.2241 10.5826 19.0356C10.1275 18.847 9.63976 18.75 9.14719 18.75H5.625C5.12772 18.75 4.6508 18.5525 4.29917 18.2009C3.94754 17.8492 3.75 17.3723 3.75 16.875V13.125C3.75 12.6277 3.94754 12.1508 4.29917 11.7992C4.6508 11.4476 5.12772 11.25 5.625 11.25H9.14719C9.6397 11.2502 10.1274 11.1533 10.5825 10.9649C11.0375 10.7766 11.451 10.5004 11.7994 10.1522ZM21.3975 8.84441C21.3283 8.74159 21.2395 8.65352 21.1361 8.58526C21.0326 8.51701 20.9167 8.46993 20.795 8.44675C20.6733 8.42358 20.5482 8.42476 20.4269 8.45023C20.3056 8.47571 20.1906 8.52497 20.0885 8.59517C19.9864 8.66537 19.8992 8.75511 19.832 8.85921C19.7648 8.96331 19.7189 9.0797 19.697 9.20165C19.675 9.3236 19.6775 9.44869 19.7042 9.56969C19.7309 9.69069 19.7813 9.8052 19.8525 9.90659C21.0572 11.6597 21.6216 13.3528 21.6216 15C21.6216 16.6482 21.0572 18.3422 19.8525 20.0944C19.7813 20.1958 19.7309 20.3103 19.7042 20.4313C19.6775 20.5523 19.675 20.6774 19.697 20.7993C19.7189 20.9213 19.7648 21.0377 19.832 21.1418C19.8992 21.2459 19.9864 21.3356 20.0885 21.4058C20.1906 21.476 20.3056 21.5253 20.4269 21.5508C20.5482 21.5762 20.6733 21.5774 20.795 21.5542C20.9167 21.5311 21.0326 21.484 21.1361 21.4157C21.2395 21.3475 21.3283 21.2594 21.3975 21.1566C22.7709 19.1597 23.4956 17.1028 23.4956 15C23.4956 12.8982 22.7709 10.8422 21.3975 8.84441ZM24.0844 4.94628C23.9042 4.77472 23.6633 4.68174 23.4146 4.68781C23.1659 4.69387 22.9298 4.79848 22.7583 4.97862C22.5867 5.15876 22.4937 5.39968 22.4998 5.64837C22.5059 5.89706 22.6105 6.13316 22.7906 6.30472C25.0284 8.43566 26.1919 11.6841 26.1919 15C26.1919 18.3169 25.0284 21.5653 22.7906 23.6963C22.7014 23.7812 22.6298 23.8829 22.5799 23.9955C22.53 24.1081 22.5028 24.2295 22.4998 24.3526C22.4968 24.4758 22.5181 24.5983 22.5624 24.7132C22.6068 24.8281 22.6733 24.9332 22.7583 25.0224C22.8432 25.1116 22.9449 25.1832 23.0575 25.2331C23.1701 25.283 23.2915 25.3102 23.4146 25.3132C23.5378 25.3162 23.6603 25.2949 23.7752 25.2506C23.8901 25.2062 23.9952 25.1397 24.0844 25.0547C26.7684 22.4982 28.0659 18.7153 28.0659 15C28.0659 11.2857 26.7684 7.50284 24.0844 4.94628Z"
            fill="white"
          />
        </svg>
      </div>
      <div
        class="justify-center mt-10 h-[80%] items-center text-center text-2xl text-primary-bloques font-semibold font-sans-Poppins"
        v-if="currentFlashcard"
      >
        {{ currentFlashcard.front }}
      </div>
      <div
        class="justify-end items-end flex mr-8 mb-8 text-2xl text-primary-bloques font-semibold font-sans-Poppins"
      >
        {{ currentFlashcardIndex + 1}}/{{ flashcards.length }}
      </div>
    </div>
    <div class="flex flex-row h-[30%] w-full">
      <PosibleRespuesta :index="arreglo[0]" :flashcards="flashcards" :respuesta ="currentFlashcardIndex" :descubrir="descubrir" :reiniciar="reiniciar" @respuestaIncorrecta="handleRespuestaIncorrecta" @respuestaCorrecta="handleRespuestaCorrecta" @actualizar = "actualizarDescurbir" @reiniciar = "reiniciarRespuestas"/>
      <PosibleRespuesta :index="arreglo[1]" :flashcards="flashcards" :respuesta ="currentFlashcardIndex" :descubrir="descubrir" :reiniciar="reiniciar" @respuestaIncorrecta="handleRespuestaIncorrecta" @respuestaCorrecta="handleRespuestaCorrecta" @actualizar = "actualizarDescurbir" @reiniciar = "reiniciarRespuestas"/>
      <PosibleRespuesta :index="arreglo[2]" :flashcards="flashcards" :respuesta ="currentFlashcardIndex" :descubrir="descubrir" :reiniciar="reiniciar" @respuestaIncorrecta="handleRespuestaIncorrecta" @respuestaCorrecta="handleRespuestaCorrecta" @actualizar = "actualizarDescurbir" @reiniciar = "reiniciarRespuestas"/>
      <PosibleRespuesta :index="arreglo[3]" :flashcards="flashcards" :respuesta ="currentFlashcardIndex" :descubrir="descubrir" :reiniciar="reiniciar" @respuestaIncorrecta="handleRespuestaIncorrecta" @respuestaCorrecta="handleRespuestaCorrecta" @actualizar = "actualizarDescurbir" @reiniciar = "reiniciarRespuestas"/>
    </div>
  </div>
</template>

<style scoped></style>
