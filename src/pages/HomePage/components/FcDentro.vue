<template>
  <div class="w-min mb-6">
    <div class="w-64 aspect-[0.85] h-full cursor-pointer relative scale-75 group">
      <RouterLink :to="set.id ? '/flashcards/' + set.id : '/creacionfc'">
        <div class="card rotate-12 group-hover:-rotate-12"></div>
        <div class="card -rotate-12 group-hover:rotate-12"></div>
        <div
          class="card bg-cover bg-center"
          :style="{ backgroundImage: 'url(' + set.imageUrl + ')' }"
        ></div>
      </RouterLink>
    </div>
    <p
      class="font-medium text-xl w-full line-clamp-1 text-center overflow-hidden overflow-ellipsis"
    >
      {{ set.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps(['set'])
</script>

<style scoped>
div.card {
  @apply rounded-3xl w-full h-full absolute transition-transform duration-500 ease-in-out;
}

div.card:nth-child(1) {
  @apply z-10 bg-primary-400;
}

div.card:nth-child(2) {
  @apply z-20 bg-primary-500;
}

div.card:nth-child(3) {
  @apply z-30 bg-white border-4 border-primary-500;
}
</style>
