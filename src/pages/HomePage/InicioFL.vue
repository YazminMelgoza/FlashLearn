<template>
    <div>
        <div class ="flex flex-col h-full mt-10">
            <HeaderTop/>
            <div class = "flex flex-row h-full mb-5">
              <SetReciente />
              <MiProgreso />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeaderTop from './HeaderTop.vue';
    import SetReciente from './SetReciente.vue';
    import MiProgreso from './MiProgreso.vue';
</script>

<style scoped>

</style>