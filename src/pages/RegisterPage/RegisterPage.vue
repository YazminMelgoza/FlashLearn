<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { auth } from '@/services/firebase'
import router from '@/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const afterRegisterClick = ref(false)
const errorMessage = ref('')

function hasEmptyValues() {
  return email.value === '' || password.value === ''
}

async function register() {
  afterRegisterClick.value = true
  if (hasEmptyValues()) {
    return
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    alert(`Bienvenido ${user.email}`)
    router.push('/inicio')
  } catch (error) {
    errorMessage.value = error.message
    // delete Firebase: Error from errorMessage
    errorMessage.value = errorMessage.value.replace('Firebase: Error', '')
  }
}

</script>

<template>
  <div class="text-center mx-auto">
    <div class="header">
      <img class="logo mx-auto" src="../../assets/LOGOTIPOV2.jpg" alt="Logotipo de Mi Sitio Web">
      <h1 class="font-bold text-3xl text-accent-900">Flashlearn</h1>
    </div>
    <div class="form">

      <label for="email">Correo Electrónico:</label>
      <input
          required
          :class="email=='' && afterRegisterClick ? 'border-2 bg-red-100 border-red-600' : ''"
          v-model="email"
          type="text"
          id="email" name="email">
      <label for="password">Password:</label>
      <input required
             :class="password=='' && afterRegisterClick ? 'border-2 bg-red-100 border-red-600' : ''"
             v-model="password" type="password" id="password" name="password">
      <div class="h-10 flex items-center justify-center">
        <p class="text-red-600 text-sm" v-if="errorMessage">Hubo un error: {{ errorMessage }}</p>
      </div>
      <button
          @click="register"
          class="w-full mb-2"
          type="submit">Registrarse con Correo Electronico</button>
      <button class="block bg-white w-full rounded-lg py-3">Registrarse con Google</button>
    </div>
    <p>Ya tienes una cuenta?
      <RouterLink to="/login">Inicia sesión aquí</RouterLink>
    </p>
  </div>
</template>

<style scoped>

h2 {
  color: #000;
  padding: 20px 0;
}
div.form {
  background-color: #dac0fe;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px #060049
}
label {
  display: block;
  margin-top: 10px;
}
input {
  margin: 5px 0;
  border-radius: 5px;
  @apply w-full p-2 my-1 border;
}

button[type="submit"]  {
  background-color: #10026c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.header {
  text-align: center;
  padding: 20px; /* Espaciado interior del encabezado */
}

.logo {
  width: 150px; /* Tamaño del logotipo */
}

h2 {
  margin: 10px 0; /* Ajuste del margen superior e inferior del título */
}
</style>