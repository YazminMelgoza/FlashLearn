<script setup lang="ts">
    import IndivQuiz from './IndivQuiz.vue'
    import TermQuiz from './TermQuiz.vue'
    import HeaderTop from "@/components/HeaderTop.vue";
</script>

<template>
  <div class="flex flex-col items-start justify-start">
    <HeaderTop title="Quizzes"/>
  <titulo class ="w-full justify-start font-sans-Poppins text-stone-950 text-2xl h-[10%] font-bold" > En progreso </titulo>
  <div class="w-1/2 h-[50%] flex flex-col justify-start items-start align-start">
  <IndivQuiz/>
  <IndivQuiz/>
  </div>
  <titulo class ="flex w-full justify-start text-stone-950 text-4xl ml-[10%] pt-12 font-bold" > Terminados </titulo>
  <terminados class = "ml-[10%] flex w-full h-1/5 flex-row ">
    <TermQuiz/>
    <TermQuiz/>
    <TermQuiz/>
  </terminados>
  </div>
</template>

<style scoped>

</style>