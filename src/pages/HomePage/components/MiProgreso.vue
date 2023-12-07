<template>
  <div class="w-3/5 flex flex-col">
    <miprogreso class="flex ml-auto mr-auto w-11/12 h-full rounded-2xl bg-primary-bloques flex-col">
      <headermiprogreso class="w-11/12 h-1/6 flex flex-row items-center justify-center">
        <titulodemiprogreso
          class="font-bold w-11/12 flex h-1/6 text-3xl font-sans-Poppins justify-normal items-center text-start mt-5"
        >
          Mi progreso
        </titulodemiprogreso>
        <iconodemiprogreso>
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.6667 6L2.875 20.8333C2.54167 21.1667 2.14556 21.3333 1.68667 21.3333C1.22778 21.3333 0.832222 21.1667 0.5 20.8333C0.166666 20.5 0 20.1039 0 19.645C0 19.1861 0.166666 18.7906 0.5 18.4583L15.3333 3.66667H2.66667C2.19444 3.66667 1.79833 3.50667 1.47833 3.18667C1.15833 2.86667 0.998889 2.47111 1 2C1 1.52778 1.16 1.13167 1.48 0.811668C1.8 0.491668 2.19556 0.332223 2.66667 0.333334H19.3333C19.8056 0.333334 20.2017 0.493334 20.5217 0.813334C20.8417 1.13333 21.0011 1.52889 21 2V18.6667C21 19.1389 20.84 19.535 20.52 19.855C20.2 20.175 19.8044 20.3344 19.3333 20.3333C18.8611 20.3333 18.465 20.1733 18.145 19.8533C17.825 19.5333 17.6656 19.1378 17.6667 18.6667V6Z"
              fill="#003050"
            />
          </svg>
        </iconodemiprogreso>
      </headermiprogreso>
      <cuerpomiprogreso class="w-full h-5/6 flex flex-col">
        <grafica class="h-3/5 flex flex-col items-center">
          <textodegrafica
            class="h-1/6 w-11/12 flex items-center text-primary-100 font-semibold font-sans-Poppins text-lg"
          >
            Flashcards aprendidas este mes
          </textodegrafica>
          <contenidografica class="h-5/6"> </contenidografica>
        </grafica>
        <div class="h-2/5 w-11/12 flex ml-auto mr-auto justify-center flex-col items-center">
          <div
            class="h-1/6 flex text-lg items-start text-start justify-start mr-auto text-primary-100 font-semibold"
          >
            Mi actividad
          </div>
          <div class="flex flex-row-reverse w-auto">
            <!--            a circle for each day in weektracker-->
            <div
              :key="index"
              v-for="(label, index) in thisWeekTracker.labels"
              class="w-20 h-20 border-primary-500 border-4 rounded-full flex items-center justify-center text-xl font-semibold"
              :class="{
                'text-white bg-primary-500': thisWeekTracker.data[index],
                'text-primary-500 bg-white': !thisWeekTracker.data[index]
              }"
            >
              {{ label }}
            </div>
          </div>
        </div>
      </cuerpomiprogreso>
    </miprogreso>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HistoryRepository } from '@/repositories/HistoryRepository'
import { onMounted } from 'vue'

const historyRepo = new HistoryRepository()
const thisWeekTracker = ref({
  labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  data: [false, false, false, false, false, false, false]
})

onMounted(async () => {
  try {
    thisWeekTracker.value = await historyRepo.getThisWeekTracker()
  } catch (e) {
    console.log(e)
    alert('Error al cargar el progreso')
  }
})
</script>

<style scoped></style>
