export type Flashcard = {
  id?: string
  front: string
  back: string
  lastReviewTimestamp: Date | null
  nextReviewTimestamp: Date | null
  easePercentage: number | null
}

export type Set = {
  id?: string
  title: string
  course: string
  description: string
  userId: string
  isPublic: boolean
  imageUrl: string
  lastReviewTimestamp: Date | null
  flashcards: Flashcard[]
}
