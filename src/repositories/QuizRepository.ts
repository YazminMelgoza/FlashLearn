import type { Flashcard } from '@/entities/Set'
import { db } from '@/services/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'

// Función para actualizar el factor de dificultad
function calcularNuevoFactorDificultad(flashcard: Flashcard, isCorrect: boolean): number {
  // si la flashcard es correcta, que el factor de dificultad aumente en 1.1 veces
  if (flashcard.easePercentage == null) {
    return 1
  }
  if (isCorrect) {
    return flashcard.easePercentage * 1.1
  } else {
    // si la flashcard es incorrecta
    // que el factor de dificultad sea el mismo, pero multiplicado por 0.8
    return flashcard.easePercentage * 0.9
  }
}

// Función para actualizar la fecha de revisión
function calcularNuevaFechaRevisión(flashcard: Flashcard, isCorrect: boolean): Date {
  // inicializamos como el dia de hoy
  let nextReviewTimestamp = new Date()
  // si la flashcard es correcta, que la proxima fecha sea en 1 dia, multiplicado por el factor de dificultad actual
  if (isCorrect) {
    let easePercentage = flashcard.easePercentage !== null ? flashcard.easePercentage : 1
    nextReviewTimestamp = new Date(
      nextReviewTimestamp.getTime() + 1 * easePercentage * 24 * 60 * 60 * 1000
    )
  } else {
    // si la flashcard es incorrecta
    // que la fecha de review sea la misma que la de hoy
    nextReviewTimestamp = new Date()
  }
  return nextReviewTimestamp
}

export class QuizRepository {
  // ...
  async updateFlashcard(flashcard: Flashcard, isCorrect: boolean, setId: string): Promise<void> {
    const nextReviewTimestamp = calcularNuevaFechaRevisión(flashcard, isCorrect)
    console.log('nueva fecha de revision', nextReviewTimestamp.toISOString())
    const easePercentage = calcularNuevoFactorDificultad(flashcard, isCorrect)
    console.log('nuevo factor de dificultad', easePercentage)
    const flashcardRef = doc(collection(db, 'sets', setId, 'flashcards'), flashcard.id)
    // update the document with the new data
    await updateDoc(flashcardRef, {
      lastReviewTimestamp: new Date(),
      nextReviewTimestamp,
      easePercentage
    })
  }
}
