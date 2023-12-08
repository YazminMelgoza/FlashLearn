import { db } from '../services/firebase'
import { collection, getDocs, addDoc, where, query, updateDoc } from 'firebase/firestore'
import { useUserStore } from '../stores/userStore'

type History = {
  id?: string
  date: string
  correctFlashcardsCount: number
}
export class HistoryRepository {
  // get the user id at initialization
  public userId: string
  constructor() {
    const userStore = useUserStore()
    this.userId = userStore.id
  }

  // add correct flashcard to the history
  public async addCorrectFlashcard(numberOfFlashcards: number): Promise<void> {
    const userStore = useUserStore()
    const historyRef = collection(db, 'users', this.userId, 'history')
    // check if there is a history document for today
    const querySnapshot = await getDocs(
      query(
        collection(db, 'users', this.userId, 'history'),
        where('date', '==', new Date().toISOString().split('T')[0])
      )
    )
    // if there is a history document for today
    if (querySnapshot.docs.length > 0) {
      // get the history document
      const historyDoc = querySnapshot.docs[0]
      // update the correct flashcards count
      await updateDoc(historyDoc.ref, {
        correctFlashcardsCount: historyDoc.data().correctFlashcardsCount + numberOfFlashcards
      })
      return
    }

    // if there is no history document for today
    // create a new history document
    else {
      console.log('no history document for today, creating one')
      const historyData: History = {
        date: new Date().toISOString().split('T')[0],
        correctFlashcardsCount: numberOfFlashcards
      }
      await addDoc(historyRef, historyData)
    }
  }

  public async getThisWeekTracker(): Promise<any> {
    // returns a list with the last 7 days and true or false if the user has studied that day
    const last7Days = this.getLast7Days()
    // get the history documents for the last 7 days
    const querySnapshot = await getDocs(
      query(
        collection(db, 'users', this.userId, 'history'),
        where('date', '>', last7Days[6].toISOString().split('T')[0])
      )
    )
    console.log('querySnapshot.docs')
    console.log(querySnapshot.docs)
    // create the labels and data for the chart
    const labels: string[] = []
    const data: boolean[] = []
    // loop throush the 7 days
    last7Days.forEach((day) => {
      // get the date in the format YYYY-MM-DD
      const date = day.toISOString().split('T')[0]
      // add the date to the labels
      labels.push(day.toLocaleDateString('es-MX', { weekday: 'short' }))
      // if there is a history document for that date
      if (querySnapshot.docs.find((doc) => doc.data().date === date)) {
        // add true to the data
        data.push(true)
      } else {
        // add false to the data
        data.push(false)
      }
    })
    return {
      labels: labels,
      data: data
    }
  }

  public getLast7Days(): Date[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const last7Days: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setHours(0, 0, 0, 0)
      date.setDate(date.getDate() - i)
      last7Days.push(date)
    }
    return last7Days
  }

  public async getChartData(): Promise<any> {
    // query the history documents  where the date is on  last 30 days
    // field path
    //const querySnapshot = await getDocs(collection(db, 'users', this.userId, 'history'))
    // where usage in firebase 9
    let oneMonthAgoDate = new Date()
    oneMonthAgoDate.setDate(oneMonthAgoDate.getDate() - 30)
    const querySnapshot = await getDocs(
      query(
        collection(db, 'users', this.userId, 'history'),
        where('date', '>', oneMonthAgoDate.toISOString().split('T')[0])
      )
    )
    // create the labels and data for the chart
    const labels: string[] = []
    const data: number[] = []
    // loop throush the 30 days
    const last30Days = this.getLast30Days()
    last30Days.forEach((day) => {
      // get the date in the format YYYY-MM-DD
      const date = day.toISOString().split('T')[0]
      // get the history document for that date
      const history = querySnapshot.docs.find((doc) => doc.data().date === date)
      // add the date to the labels
      labels.push(date)
      // if there is a history document for that date
      if (history) {
        // add the correct flashcards count to the data
        data.push(history.data().correctFlashcardsCount)
      } else {
        // add 0 to the data
        data.push(0)
      }
    })

    // return the labels and data reversed

    return {
      labels: labels.reverse(),
      data: data.reverse()
    }
  }

  public getLast30Days(): Date[] {
    // truncate the time
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const last30Days: Date[] = []
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setHours(0, 0, 0, 0)
      date.setDate(date.getDate() - i)
      last30Days.push(date)
    }
    return last30Days
  }
  // get history from the user
}
