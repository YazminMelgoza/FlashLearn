<template>
    <div id="respuesta" class="m-3 w-[24%] flex flex-col justify-center items-center align-start h-[90%] bg-primary-barracolor rounded-2xl" @click="handleClick" :style="{
        backgroundColor: active ? '#96E6D7' : correcto ? '#0FAF62' : 'F23361',
        color: active ? 'black' : 'white',
      }"
        >
      <div class="flex justify-center items-center text-center font-semibold text-xl text-primary-900">
        Respuesta
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
    data() {
        return {
        active: false,
        correcto: false
        };
    },
    methods: {
        handleClick(this: any) {
        this.active = !this.active;
        this.correcto =!this.correcto;
        if(this.correcto){
            console.log("Correcto!")
        }
        },

    },
    });
    </script>
  
  <style scoped></style>