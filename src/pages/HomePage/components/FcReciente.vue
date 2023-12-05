<template>
  <div class="w-full flex flex-col justify-center align-items">
    <div class="text-3xl text-sans-Poppins font-semibold items-start justify-center">
      {{ groupTitle }}
    </div>
    <div
      class="flex-row rounded-xl my-4 flex justify-center bg-slate-100 p-4 flex-wrap h-auto w-full"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  groupTitle: String
})
</script>
