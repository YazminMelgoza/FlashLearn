<script setup lang="ts">
import { ref } from 'vue'
import HeaderTop from '@/components/HeaderTop.vue'

const title = ref('')
const description = ref('')
const emptyFlashcard = ref({
  front: '',
  back: '',
  imageUrl: '',
})
const flashcards = ref([emptyFlashcard])
const isPublic = ref(true)
</script>

<template>
  <div class="">
    <HeaderTop title="Creación de Flashcards"/>
    <!--    Top bar-->
    <div class="flex justify-between">
      <h1 class="text-3xl mb-4 font-bold text-primary-100">Creación de Set</h1>
    </div>
    <label for="">Título</label>
    <input v-model="title" class="w-[45%] mb-4" type="text"/>
    <label for="">Descripción</label>
    <textarea
      v-model="description"
      class="w-[45%] mb-4"
      rows="3"
    ></textarea>

    <!--    on off button to make public the set in tailwind rounded switch appearance -->
    <div class="flex items-center justify-start mb-4">
      <span class="mr-2">¿Hacer público?</span>
      <label class="switch">
        <input v-model="isPublic" type="checkbox"/>
        <span class="slider round"></span>
      </label>
    </div>

<!--    &lt;!&ndash;    Creacion de flashcards&ndash;&gt;-->
<!--    <div v-for="flashcard in flashcards" >-->
<!--      <textarea name="" id="" cols="30" rows="10"></textarea>-->
<!--      <textarea name="" id="" cols="30" rows="10"></textarea>-->
<!--    </div>-->

  </div>
</template>

<style scoped>
label {
  @apply text-xl font-bold text-primary-100 block;
}

input[type='text'], textarea {
  @apply rounded-lg bg-primary-200
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @apply bg-primary-200 rounded-full;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  @apply bg-primary-100 rounded-full;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
  @apply bg-white;
}



</style>