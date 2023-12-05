<script setup lang="ts">
interface Flashcard {
  lastReview: Date
  difficulty: number
  isCorrect: boolean
}

// Función para actualizar el factor de dificultad
function actualizarFactorDificultad(flashcard: Flashcard): number {
  const { lastReview, difficulty, isCorrect } = flashcard
  const tiempoPasado = (new Date().getTime() - lastReview.getTime()) / (24 * 60 * 60 * 1000)
  const ajusteFactor = isCorrect ? 0.1 : -0.1
  const nuevoFactor = Math.max(0.1, Math.min(2, difficulty + ajusteFactor))
  const factorModificado = nuevoFactor * Math.exp(-0.1 * tiempoPasado)
  return factorModificado
}

// Función para actualizar la fecha de revisión
function actualizarFechaRevisión(flashcard: Flashcard): Date {
  const { lastReview, difficulty, isCorrect } = flashcard
  const baseIncrementoTiempo = 24 * 60 * 60 * 1000

  // Actualizar la fecha de revisión basada en la respuesta del usuario
  if (isCorrect) {
    lastReview.setTime(
      new Date().getTime() + baseIncrementoTiempo * actualizarFactorDificultad(flashcard)
    )
  } else {
    lastReview.setTime(
      new Date().getTime() + baseIncrementoTiempo * actualizarFactorDificultad(flashcard)
    )
  }

  return lastReview
}

// Caso 1: Respuesta Correcta
const flashcard1: Flashcard = {
  lastReview: new Date(), // Puedes inicializar con la fecha existente
  difficulty: 1.0,
  isCorrect: true
}

//
console.log('Fecha de Revisión (Caso 1):', flashcard1.lastReview)
console.log('Factor de Dificultad (Caso 1):', flashcard1.difficulty)
console.log('Respuesta Correcta (Caso 1):', flashcard1.isCorrect)
console.log('Factor de Dificultad (Caso 1):', actualizarFactorDificultad(flashcard1))
console.log('Nueva Fecha de Revisión (Caso 1):', actualizarFechaRevisión(flashcard1))

// Caso 2: Respuesta Incorrecta
const flashcard2: Flashcard = {
  lastReview: new Date(),
  difficulty: 1.0,
  isCorrect: false
}

console.log('Fecha de Revisión (Caso 2):', flashcard2.lastReview)
console.log('Factor de Dificultad (Caso 2):', flashcard2.difficulty)
console.log('Respuesta Correcta (Caso 2):', flashcard2.isCorrect)
console.log('Factor de Dificultad (Caso 2):', actualizarFactorDificultad(flashcard2))
console.log('Nueva Fecha de Revisión (Caso 2):', actualizarFechaRevisión(flashcard2))

// Caso 3: Respuesta Correcta con diferente fecha de lastReview y duración
const lastReviewDate3 = new Date()
lastReviewDate3.setDate(lastReviewDate3.getDate() - 5) // Fecha de revisión hace 5 días
const flashcard3: Flashcard = {
  lastReview: lastReviewDate3,
  difficulty: 1.0,
  isCorrect: true
}

console.log('Factor de Dificultad (Caso 3):', flashcard3.difficulty)
console.log('Respuesta Correcta (Caso 3):', flashcard3.isCorrect)
console.log('Fecha de Revisión (Caso 3):', flashcard3.lastReview)
console.log('Factor de Dificultad (Caso 3):', actualizarFactorDificultad(flashcard3))
console.log('Nueva Fecha de Revisión (Caso 3):', actualizarFechaRevisión(flashcard3))

// Caso 4: Respuesta Incorrecta con diferente fecha de lastReview y duración
const lastReviewDate4 = new Date()
lastReviewDate4.setDate(lastReviewDate4.getDate() - 10) // Fecha de revisión hace 10 días
const flashcard4: Flashcard = {
  lastReview: lastReviewDate4,
  difficulty: 1.0,
  isCorrect: false
}

console.log('Factor de Dificultad (Caso 4):', flashcard4.difficulty)
console.log('Respuesta Correcta (Caso 4):', flashcard4.isCorrect)
console.log('Fecha de Revisión (Caso 4):', flashcard4.lastReview)
console.log('Factor de Dificultad (Caso 4):', actualizarFactorDificultad(flashcard4))
console.log('Nueva Fecha de Revisión (Caso 4):', actualizarFechaRevisión(flashcard4))
</script>

<template>
  {{ flashcard1 }}
  {{ flashcard2 }}
  {{ flashcard3 }}
  {{ flashcard4 }}
</template>

<style scoped></style>
