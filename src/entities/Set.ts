export type Flashcard ={
  id?: string,
  front: string,
  back: string,
  imageUrl: string,
  lastAttemptAt: Date,
  nextAttemptAt: Date,
  easinessFactor: number
}

export type Set = {
  id?: string,
  title: string,
  description: string,
  userId: string,
  isPublic: boolean,
  flashcards: Flashcard[]
}

