<template>
  <div class="w-[-webkit-fill-available] flex flex-col">
    <div class="flex ml-auto mr-auto w-11/12 h-full rounded-2xl bg-primary-bloques flex-col">
      <div class="w-11/12 h-1/6 flex flex-row items-center justify-center">
        <div
          class="font-bold w-11/12 flex h-1/6 text-3xl font-sans-Poppins justify-normal items-center text-start mt-5"
        >
          Mi progreso
        </div>
      </div>
      <div class="w-full h-5/6 flex flex-col">
        <div class="h-3/5 flex flex-col items-center">
          <div
            class="h-1/6 w-11/12 flex items-center text-primary-100 font-semibold font-sans-Poppins text-lg"
          >
            Flashcards aprendidas este mes
          </div>
          <div class="h-5/6">
            <Line :data="chartData" :options="chartConfigOptions" />
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HistoryRepository } from '@/repositories/HistoryRepository'
import { onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const historyRepo = new HistoryRepository()
const thisWeekTracker = ref({
  labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  data: [false, false, false, false, false, false, false]
})
const chartData = ref({
  labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  datasets: [
    {
      label: 'Flashcards aprendidas',
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: '#4bc0c0'
    }
  ]
})

const chartConfigOptions = ref({
  type: 'line',
  data: chartData.value,
  options: {
    responsive: true
  }
})

onMounted(async () => {
  try {
    thisWeekTracker.value = await historyRepo.getThisWeekTracker()

    const ChartHistory = await historyRepo.getChartData()
    chartData.value.labels = ChartHistory.labels
    chartData.value.datasets[0].data = ChartHistory.data
    console.log('chart history')
    console.log(ChartHistory)
  } catch (e) {
    console.log(e)
    alert('Error al cargar el progreso')
  }
})
</script>

<style scoped></style>
