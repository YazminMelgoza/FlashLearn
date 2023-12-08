<script setup lang="ts">
import type { Flashcard } from '@/entities/Set'

// Función para actualizar el factor de dificultad
function calcularNuevoFactorDificultad(flashcard: Flashcard, isCorrect: boolean): number {
  let { lastReviewTimestamp, easePercentage } = flashcard
  if (lastReviewTimestamp == null) {
    lastReviewTimestamp = new Date()
  }
  if (easePercentage == null) {
    easePercentage = 0
  }
  const tiempoPasado =
    (new Date().getTime() - lastReviewTimestamp.getTime()) / (23 * 60 * 60 * 1000)
  const ajusteFactor = isCorrect ? -1.1 : -0.1
  const nuevoFactor = Math.max(-1.1, Math.min(2, easePercentage + ajusteFactor))
  const factorModificado = nuevoFactor * Math.exp(-1.1 * tiempoPasado)
  return factorModificado
}

// Función para actualizar la fecha de revisión
function calcularNuevaFechaRevisión(flashcard: Flashcard, isCorrect: boolean): Date {
  let { lastReviewTimestamp, nextReviewTimestamp } = flashcard
  const baseIncrementoTiempo = 23 * 60 * 60 * 1000

  // Actualizar la fecha de revisión basada en la respuesta del usuario
  if (nextReviewTimestamp == null) {
    nextReviewTimestamp = new Date()
  }
  if (isCorrect) {
    nextReviewTimestamp.setTime(
      new Date().getTime() +
        baseIncrementoTiempo * calcularNuevoFactorDificultad(flashcard, isCorrect)
    )
  } else {
    nextReviewTimestamp.setTime(
      new Date().getTime() +
        baseIncrementoTiempo * calcularNuevoFactorDificultad(flashcard, isCorrect)
    )
  }

  return nextReviewTimestamp
}
</script>

<template>hola</template>
