<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { auth } from '@/services/firebase'
import router from '@/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {UserRepository} from "@/repositories/UserRepository";

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const afterLoginClick = ref(false)

function hasEmptyValues() {
  return email.value === '' || password.value === ''
}
async function login() {
  afterLoginClick.value = true
  if (hasEmptyValues()) return;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    // Buscar usuario en Firestore
    const userRepo = new UserRepository()
    await userRepo.loadUser(user)
    await router.push('/inicio')
  } catch (error) {
    if (error.message) {
      errorMessage.value = error.message
    }

  }
}
</script>

<template>
  <div class="login-container text-center">
    <div class="header">
      <img class="logo mx-auto" src="../../assets/LOGOTIPOV2.jpg" alt="Logotipo de Mi Sitio Web" />
      <h1 class="font-bold text-3xl text-accent-900">Flashlearn</h1>
    </div>
    <form @submit.prevent id="login-form">
      <input
        v-model="email"
        type="text"
        id="email"
        :class="email == '' && afterLoginClick ? 'border-2 bg-red-100 border-red-600' : ''"
        placeholder="Correo electronico"
      />
      <input
        v-model="password"
        :class="password == '' && afterLoginClick ? 'border-2 bg-red-100 border-red-600' : ''"
        type="password"
        id="password"
        placeholder="Contraseña"
      />
      <p class="h-10 text-sm text-red-600">{{ errorMessage }}</p>
      <input @click="login" type="submit" value="Iniciar sesión" />
    </form>
    <p class="mt-4">¿No tienes una cuenta?</p>
    <RouterLink to="/register">Registrate aqui</RouterLink>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
.login-container {
  width: 300px;
  margin: 0 auto;
  padding-top: 100px;
}
.login-container form {
  display: flex;
  flex-direction: column;
}
.login-container input[type='text'],
.login-container input[type='password'] {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #dac0fe;
  @apply border;
}
input[type='submit'] {
  background-color: #10026c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  padding: 20px; /* Espaciado interior del encabezado */
}

.logo {
  width: 150px; /* Tamaño del logotipo */
  height: auto;
}

h2 {
  margin: 10px 0; /* Ajuste del margen superior e inferior del título */
}
body {
  background-color: #ffffff;
}
</style>
