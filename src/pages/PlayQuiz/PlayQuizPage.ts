import type { Flashcard } from '@/entities/Set'
import {ref} from 'vue'


export default class FlashcardRepository {
    // Método para calcular el factor de dificultad
    public async calcularNuevoFactorDificultad(flashcard: Flashcard, isCorrect: boolean): Promise<number> {
        let { lastReviewTimestamp, easePercentage } = flashcard
        if (lastReviewTimestamp == null) {
            lastReviewTimestamp = new Date()
        }
        if (easePercentage == null) {
            easePercentage = 1
        }
        const tiempoPasado =
            (new Date().getTime() - lastReviewTimestamp.getTime()) / (24 * 60 * 60 * 1000)
        const ajusteFactor = isCorrect ? 0.1 : -0.1
        const nuevoFactor = Math.max(0.1, Math.min(2, easePercentage + ajusteFactor))
        const factorModificado = nuevoFactor * Math.exp(-0.1 * tiempoPasado)
        return factorModificado
      // código del método
    }
  
    // Método para calcular la fecha de revisión
    public async calcularNuevaFechaRevisión(
      flashcard: Flashcard,
      isCorrect: boolean
    ): Promise<Date> {
        let { lastReviewTimestamp, nextReviewTimestamp } = flashcard
        const baseIncrementoTiempo = 24 * 60 * 60 * 1000
      
        // Actualizar la fecha de revisión basada en la respuesta del usuario
        if (nextReviewTimestamp == null) {
          nextReviewTimestamp = new Date()
        }
        if (isCorrect) {
          nextReviewTimestamp.setTime(
            new Date().getTime() +
              baseIncrementoTiempo * await this.calcularNuevoFactorDificultad(flashcard, isCorrect)
          )
        } else {
          nextReviewTimestamp.setTime(
            new Date().getTime() +
              baseIncrementoTiempo * await this.calcularNuevoFactorDificultad(flashcard, isCorrect)
          )
        }
      
        return nextReviewTimestamp
    }
  }