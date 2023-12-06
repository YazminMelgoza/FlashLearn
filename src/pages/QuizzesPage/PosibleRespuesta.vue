<template>
  <div
    id="respuesta"
    class="m-3 w-[24%] flex flex-col justify-center items-center align-start h-[90%] bg-primary-barracolor rounded-2xl"
    @click="handleClick"
    :style="{
      backgroundColor: active ? '#96E6D7' : correcto ? '#0FAF62' : '#F23361',
      color: active ? 'black' : 'white',
    }"
  >
    <div class="flex justify-center items-center text-center font-semibold text-xl text-primary-900" v-if="currentFlashcardValue">
      {{ currentFlashcardValue }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Flashcard } from '@/entities/Set';
import { defineProps, computed } from 'vue';

export default defineComponent({
  props: {
    flashcards: {
      type: Array as () => Flashcard[],
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    respuesta: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const active = ref(true);
    const correcto = ref(false);

    const currentFlashcardValue = computed(() => {
      const flashcardactual = props.flashcards[props.index];
      // Check if flashcard is defined before accessing 'back'
      return flashcardactual ? flashcardactual.back.trim() : '';
    });

    function handleClick() {
      active.value = !active.value;
      if(props.index == props.respuesta){
        correcto.value = !correcto.value;
      }
      if (correcto.value) {
        console.log('Correcto!');
      }
    }

    return {
      active,
      correcto,
      handleClick,
      currentFlashcardValue,
    };
  },
});
</script>

<style scoped></style>
