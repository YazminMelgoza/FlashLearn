export type History = {
  id?: string,
  userId: string,
  learnedFlashcards: HistoryRow[]
}

export type HistoryRow = {
  id?: string,
  date: Date,
  quantity: number,
}