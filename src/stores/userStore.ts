import { ref } from 'vue'
import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')
  const points = ref(0)
  const id = ref('')
  const uid = ref('')
  const level = ref(1)
  const isLoaded = ref(false)
  const lastActivity = ref(null)
  const streakDuration = ref(0)

  // Función para obtener el estado desde localStorage
  function getLocalStorageUser() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      name.value = parsedUser.name || ''
      email.value = parsedUser.email || ''
      points.value = parsedUser.points || 0
      id.value = parsedUser.id || ''
      uid.value = parsedUser.uid || ''
      level.value = parsedUser.level || 1
      isLoaded.value = parsedUser.isLoaded || false
      lastActivity.value = parsedUser.lastActivity || null
      streakDuration.value = parsedUser.streakDuration || 0
    }
  }

  // Función para guardar el estado en localStorage
  function setLocalStorageUser() {
    const userState = {
      name: name.value,
      email: email.value,
      points: points.value,
      id: id.value,
      uid: uid.value,
      level: level.value,
      isLoaded: isLoaded.value,
      lastActivity: lastActivity.value,
      streakDuration: streakDuration.value
    }
    localStorage.setItem('user', JSON.stringify(userState))
  }

  // Función para borrar el estado en localStorage
  function clearLocalStorageUser() {
    localStorage.removeItem('user')
  }

  // Función para limpiar el estado en la tienda
  function clearUser() {
    name.value = ''
    email.value = ''
    points.value = 0
    id.value = ''
    uid.value = ''
    level.value = 1
    isLoaded.value = false
    lastActivity.value = null
    streakDuration.value = 0
    clearLocalStorageUser() // Asegurarse de limpiar también el almacenamiento local
  }

  // Cargar el estado desde localStorage al iniciar
  getLocalStorageUser()

  // Escuchar cambios en la autenticación
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      clearUser()
    }
  })

  return {
    name,
    email,
    points,
    id,
    uid,
    level,
    isLoaded,
    lastActivity,
    streakDuration,
    setLocalStorageUser,
    clearUser
  }
})
