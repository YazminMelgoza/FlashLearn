<template>
  <div class="flex w-min">
    <div
      class="flex w-full p-8 rounded-2xl bg-primary-bloques flex-col justify-center items-center"
    >
      <div
        class="font-bold w-11/12 flex h-1/6 text-3xl font-sans-Poppins justify-normal items-center text-start"
      >
        Set reciente
      </div>

      <FcDentro
        class="w-full flex flex-col text-accent-800 justify-center items-center"
        :set="set"
      />
      <div class="w-full flex gap-6 items-center px-6">
        <svg
          class="inline"
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.83333 11.511C2.30556 12.0388 1.70167 12.1571 1.02167 11.866C0.341667 11.5749 0.00111111 11.0538 0 10.3027V1.71933C0 0.96933 0.340555 0.448219 1.02167 0.155997C1.70278 -0.136225 2.30667 -0.0178928 2.83333 0.510996L7.16667 4.84433C7.33333 5.011 7.45833 5.19155 7.54167 5.386C7.625 5.58044 7.66667 5.78877 7.66667 6.011C7.66667 6.23322 7.625 6.44155 7.54167 6.636C7.45833 6.83044 7.33333 7.011 7.16667 7.17766L2.83333 11.511Z"
            fill="#010026"
          />
        </svg>
        <div
          class="font-semibold text-xl font-sans-Poppins justify-normal items-start text-start flex-col"
        >
          {{ set.course }}
        </div>
      </div>
      <div
        class="mt-3 font-semibold w-9/12 font-sans-Poppins justify-normal items-start text-start flex h-full flex-col text-sm"
      >
        {{ set.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SetRepository } from '@/repositories/SetRepository'
import FcDentro from './FcDentro.vue'
const fetchSetStatus = ref<'loading' | 'success' | 'error' | 'empty'>('loading')

const set = ref({
  title: 'Cargando....',
  description: '',
  imageUrl: '/src/assets/defaultSetImage.png',
  course: ''
})
const setRepository = new SetRepository()

onMounted(async () => {
  try {
    set.value = await setRepository.getMostRecentSet()
    fetchSetStatus.value = 'success'
    if (set.value.id == '') {
      fetchSetStatus.value = 'empty'
    }
  } catch (error) {
    alert('error al cargar el set reciente')
    fetchSetStatus.value = 'error'
    console.error(error)
  }
})
</script>
<style scoped></style>
