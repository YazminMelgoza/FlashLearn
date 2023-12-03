import { db } from '@/services/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useUserStore } from '@/stores/userStore'
import type { Flashcard, Set } from '@/entities/Set'

export class SetRepository {
  // get the user id at initialization
  public userId: string
  constructor() {
    const userStore = useUserStore()
    this.userId = userStore.id
  }

  // get all sets from the user
  public async getAllSets(): Promise<Set[]> {
    const querySnapshot = await getDocs(collection(db, 'sets'))
    const sets: Set[] = []
    querySnapshot.forEach((doc) => {
      const setData = doc.data()
      if (setData.userId === this.userId) {
        const set: Set = {
          id: doc.id,
          title: setData.title,
          course: setData.course,
          description: setData.description,
          userId: setData.userId,
          isPublic: setData.isPublic,
          lastReviewTimestamp: setData.lastReviewTimestamp,
          imageUrl: setData.imageUrl
        }
        sets.push(set)
      }
    })
    return sets
  }
  // get most recent set from the user
  public async getMostRecentSet(): Promise<Set> {
    const querySnapshot = await getDocs(collection(db, 'sets'))
    let mostRecentSet: Set = {
      id: '',
      title: '',
      course: '',
      description: '',
      userId: '',
      isPublic: false,
      lastReviewTimestamp: null,
      imageUrl: ''
    }
    querySnapshot.forEach((doc) => {
      const setData = doc.data()
      if (setData.userId === this.userId) {
        const set: Set = {
          id: doc.id,
          title: setData.title,
          course: setData.course,
          description: setData.description,
          userId: setData.userId,
          isPublic: setData.isPublic,
          lastReviewTimestamp: setData.lastReviewTimestamp,
          imageUrl: setData.imageUrl
        }
        if (
          mostRecentSet.lastReviewTimestamp === null ||
          (set.lastReviewTimestamp !== null &&
            set.lastReviewTimestamp > mostRecentSet.lastReviewTimestamp)
        ) {
          mostRecentSet = set
        }
      }
    })
    return mostRecentSet
  }

  // create set
  public async createSet(set: Set, flashcards: Flashcard[]): Promise<void> {
    console.log('creating set to firestore')
    const docref = await addDoc(collection(db, 'sets'), {
      title: set.title,
      course: set.course,
      description: set.description,
      userId: this.userId,
      isPublic: set.isPublic,
      lastReviewTimestamp: null,
      imageUrl: set.imageUrl
    } as Set)

    console.log('Document written with ID: ', docref.id)

    // add flashcards to a subcollection
    for (const flashcard of flashcards) {
      await addDoc(collection(db, `sets/${docref.id}/flashcards`), {
        front: flashcard.front,
        back: flashcard.back,
        lastReviewTimestamp: null,
        nextReviewTimestamp: null,
        easePercentage: null
      })
    }
  }
}
