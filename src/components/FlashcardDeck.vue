<script setup lang="ts">
import type { Flashcard } from '@/entities/Set'
import { ref, computed } from 'vue'
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'
const props = defineProps<{
  flashcards: Flashcard[]
}>()

const visibleSide = ref<'front' | 'back'>('front')
const currentFlashcardIndex = ref(0)
function toggleSide() {
  if (visibleSide.value == 'front') {
    visibleSide.value = 'back'
  } else {
    visibleSide.value = 'front'
  }
}

function nextFlashcard() {
  currentFlashcardIndex.value++
  if (currentFlashcardIndex.value >= props.flashcards.length) {
    currentFlashcardIndex.value = 0
  }
  visibleSide.value = 'front'
}

function previousFlashcard() {
  currentFlashcardIndex.value--
  if (currentFlashcardIndex.value < 0) {
    currentFlashcardIndex.value = props.flashcards.length - 1
  }
  visibleSide.value = 'front'
}

const currentFlashcard = computed(() => {
  return props.flashcards[currentFlashcardIndex.value]
})
</script>

<template>
  <div class="relative aspect-video container max-w-3xl mx-auto">
    <!--    Flashcard container-->
    <div
      v-if="currentFlashcard"
      class="rounded-3xl absolute transform-[rotateX(30deg)] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[58%] w-10/12 h-5/6"
      @click="toggleSide()"
    >
      <!--      frente-->
      <transition
        name="flip-side"
        enter-active-class="enter-active-class-flip"
        enter-from-class="enter-from-class-flip"
        leave-active-class="leave-active-class-flip"
        leave-from-class="leave-from-class-flip"
      >
        <div
          class="w-full h-full shadow-xl p-6 rounded-3xl absolute bg-accent-600 text-white text-3xl text-center flex items-center"
          v-if="visibleSide == 'front'"
        >
          {{ currentFlashcard.front }}
        </div>
      </transition>
      <!--      atras-->
      <transition
        name="flip-side"
        enter-active-class="enter-active-class-flip"
        enter-from-class="enter-from-class-flip"
        leave-active-class="leave-active-class-flip"
        leave-from-class="leave-from-class-flip"
      >
        <div
          v-if="visibleSide == 'back'"
          class="w-full h-full p-6 rounded-3xl shadow-xl absolute bg-accent-400 text-white text-3xl text-center flex items-center justify-center"
        >
          <!--        Strip texts additional spaces at the beginning and end-->
          {{ currentFlashcard.back.trim() }}
        </div>
      </transition>
    </div>
    <!-- svg de navegacion -->
    <div class="flex items-center justify-between w-full absolute top-1/3">
      <button @click="previousFlashcard()">
        <ArrowLeftCircleIcon class="w-16 h-16 text-accent-800" />
      </button>
      <button @click="nextFlashcard()">
        <ArrowRightCircleIcon class="w-16 h-16 text-accent-800" />
      </button>
    </div>
    <!--    Progress bar -->
    <div class="absolute bottom-0 left-1/2 w-10/12 -translate-x-1/2 rounded-2xl h-5 bg-gray-200">
      <div
        class="h-full bg-accent-600 absolute transition-all duration-100 ease-in-out rounded-t-3xl rounded-b-3xl"
        :style="{
          left: (currentFlashcardIndex / props.flashcards.length) * 100 + '%',
          width: 100 / props.flashcards.length + '%'
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.enter-active-class-flip,
.leave-active-class-flip,
.enter-from-class-flip,
.leave-from-class-flip {
  transition: transform 0.3s;
}

.enter-active-class-flip {
  transform: rotateY(0deg);
  transition-delay: 0.3s;
}

.enter-from-class-flip {
  transform: rotateY(90deg);
  transition-delay: 0.3s;
}

.leave-active-class-flip {
  transform: rotateY(90deg);
}

.leave-from-class-flip {
  transform: rotateY(0deg);
}
</style>
