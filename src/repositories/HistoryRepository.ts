import { db } from '../services/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useUserStore } from '../stores/userStore'

type History = {
  id?: string
  date: Date
  correct: number
  incorrect: number
}
export class HistoryRepository {
  // get the user id at initialization
  public userId: string
  constructor() {
    const userStore = useUserStore()
    this.userId = userStore.id
  }

  // add history to the user
  public async addHistory(history: History): Promise<void> {
      await addDoc(collection(db, 'users', this.userId, 'history'), history)
  }

  public checkDateAlreadyExists(date: Date): boolean {
    const querySnapshot = await getDocs(collection(db, 'users', this.userId, 'history'))
    querySnapshot.forEach((doc) => {
      const historyData = doc.data()
      // check only the date, not the time
      if (historyData.date.toDate().toDateString() === date.toDateString()) {
        return true
      }
    })
    return false
  }

  // get history from the user
  public async get30DaysHistory(): Promise<History[]> {
    // get the ref of the subcollection in the user document
    const querySnapshot = await getDocs(collection(db, 'users', this.userId, 'history'))
    const history: History[] = []
    querySnapshot.forEach((doc) => {
      const historyData = doc.data()
      const history: History = {
        id: doc.id,
        date: historyData.date,
        correct: historyData.correct,
        incorrect: historyData.incorrect,
        total: historyData.total,
        percentage: historyData.percentage
      }
      history.push(history)
    }
  }
}
