<script setup lang="ts">
import { nextTick, ref } from 'vue'
import HeaderTop from '@/components/HeaderTop.vue'
import type { Flashcard, Set } from '@/entities/Set'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/services/firebase'
import { useUserStore } from '@/stores/userStore'
import { SetRepository } from '@/repositories/SetRepository'

const title = ref('')
const description = ref('')
const imageUrl = ref('src/assets/defaultSetImage.png')
const emptyFlashcard = ref<Flashcard>({
  front: '',
  back: '',
  lastReviewTimestamp: null,
  nextReviewTimestamp: null,
  easePercentage: null
})
const course = ref('')
const flashcards = ref<Flashcard[]>([])
const isPublic = ref(true)
const selectedFile = ref<File | null>(null)

const fileInput = ref<HTMLInputElement | null>(null)
function addEmptyFlashcard() {
  const newFlashcard = JSON.parse(JSON.stringify(emptyFlashcard.value))
  flashcards.value.push(newFlashcard)
}

async function scrollToBottom() {
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}

addEmptyFlashcard()

async function createSet() {
  if (!validateForm()) {
    return
  }
  const set: Set = {
    title: title.value,
    description: description.value,
    course: course.value,
    isPublic: isPublic.value,
    imageUrl: imageUrl.value,
    lastReviewTimestamp: null
  }
  const setRepository = new SetRepository()
  try {
    await setRepository.createSet(set, flashcards.value)
  } catch (error) {
    console.error(error)
    alert('Error creating set. Please try again.')
    return
  }
}

function openFilePicker() {
  fileInput.value?.click()
}

function validateForm() {
  if (!title.value) {
    alert('Please enter a title.')
    return false
  }
  if (!description.value) {
    alert('Please enter a description.')
    return false
  }
  if (!course.value) {
    alert('Please enter a course.')
    return false
  }
  if (!flashcards.value.length) {
    alert('Please enter at least one flashcard.')
    return false
  }
  // validate each flashcard
  for (const flashcard of flashcards.value) {
    if (!flashcard.front) {
      alert('Please enter a front for each flashcard.')
      return false
    }
    if (!flashcard.back) {
      alert('Please enter a back for each flashcard.')
      return false
    }
  }
  return true
}
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
  uploadImage()
}

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert('Please select a file.')
    return
  }
  try {
    const userStore = useUserStore()
    const fileRef = storageRef(storage, 'images/' + userStore.id + '/' + selectedFile.value.name)
    const uploadSnapshot = await uploadBytes(fileRef, selectedFile.value)
    imageUrl.value = await getDownloadURL(uploadSnapshot.ref)
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Error uploading file. Please try again.')
  }
}
</script>

<template>
  <div class="">
    <!--    Top bar-->
    <HeaderTop title="Crear un Nuevo Set " />
    <!--    Floating default image on left, which on click can be uploaded a new image -->
    <div
      @click="openFilePicker"
      class="w-[40%] max-w-[20rem] shadow-xl bg-center aspect-[0.85] rounded-3xl cursor-pointer mb-4 float-right"
      :style="{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }"
    >
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        accept="image/*"
        @change="handleFileChange"
      />
    </div>
    <label for="">Título</label>
    <input v-model="title" placeholder="Título del set" class="w-[45%] mb-4" type="text" />
    <label for="">Asignatura</label>
    <input v-model="course" class="w-[45%] mb-4" placeholder="Asignatura del set" type="text" />
    <label for="">Descripción</label>
    <textarea
      v-model="description"
      class="w-[45%] mb-4 bg-primary-200 p-3"
      placeholder="Añade una descripción al set"
      rows="3"
    ></textarea>

    <!--    on off button to make public the set in tailwind rounded switch appearance -->
    <div class="flex items-center justify-start mb-4">
      <span class="mr-2">¿Hacer público?</span>
      <label class="switch">
        <input v-model="isPublic" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>

    <!--    &lt;!&ndash;    Creacion de flashcards&ndash;&gt;-->
    <div
      :key="index"
      class="w-full bg-slate-100 rounded-2xl mb-8 flex items-center justify-between p-10"
      v-for="(flashcard, index) in flashcards"
    >
      <span class="font-bold text-primary-100">
        {{ index + 1 }}
      </span>
      <div class="w-2/5">
        <textarea
          name=""
          rows="3"
          v-model="flashcard.front"
          class="flex flex-col w-full p-2 rounded-none bg-transparent border-b-4 border-b-primary-100"
        >
        </textarea>
        <span>Término</span>
      </div>
      <div class="flex flex-col w-2/5">
        <textarea
          name=""
          id=""
          class="w-full border-b-4 p-2 bg-transparent border-b-primary-100"
          rows="3"
          v-model="flashcard.back"
          @keydown.enter="addEmptyFlashcard"
        >
        </textarea>
        <span>Definición</span>
      </div>

      <button @click="() => flashcards.splice(index, 1)" class="p-3 text-white rounded-lg">
        <!--        icon of X-->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-primary-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- buttons spaced between to add a new flashcard or create the set -->
    <div class="flex justify-between w-full mb-10">
      <button
        @click="
          () => {
            addEmptyFlashcard()
            scrollToBottom()
          }
        "
        class="bg-primary-100 p-3 text-white rounded-lg"
      >
        Añadir otra tarjeta
      </button>
      <button @click="createSet" class="bg-primary-100 p-3 text-white rounded-lg">Crear set</button>
      <!--      button to delete the flashcard       -->
    </div>
  </div>
</template>

<style scoped>
label {
  @apply text-xl font-bold text-primary-100 block;
}

input[type='text'] {
  @apply rounded-lg bg-primary-200 p-3;
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
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  @apply bg-primary-100 rounded-full;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
  @apply bg-white;
}

span {
  @apply text-primary-100 font-medium;
}
</style>
