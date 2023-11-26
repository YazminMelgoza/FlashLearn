export type Quiz = {
  id?: string,
  userId: string,
  title: string,
  description: string,
  difficulty: number,
  numberOfQuestions: number,
  status: 'In progress' | 'Finished',
  setId: string,
  createdAt: Date,
  flashcardsIds: string[]
}