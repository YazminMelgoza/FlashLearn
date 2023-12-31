import { db } from '@/services/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useUserStore } from '@/stores/userStore'
import type { Flashcard, Set } from '@/entities/Set'

export class SetRepository {
  // get the user id at initialization
  public userId: string
  constructor() {
    const userStore = useUserStore()
    this.userId = userStore.uid
  }

  // get all flashcards from an specific set
  public async getSetFlashcards(setId: string): Promise<Flashcard[]> {
    const querySnapshot = await getDocs(collection(db, `sets/${setId}/flashcards`))
    const flashcards: Flashcard[] = []
    querySnapshot.forEach((doc) => {
      const flashcardData = doc.data()
      const nextReview = flashcardData.nextReviewTimestamp
        ? flashcardData.nextReviewTimestamp.toDate()
        : null
      const lastReview = flashcardData.lastReviewTimestamp
        ? flashcardData.lastReviewTimestamp.toDate()
        : null
      const flashcard: Flashcard = {
        id: doc.id,
        front: flashcardData.front,
        back: flashcardData.back,
        lastReviewTimestamp: lastReview,
        nextReviewTimestamp: nextReview,
        easePercentage: flashcardData.easePercentage
      }
      flashcards.push(flashcard)
    })
    return flashcards
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

  // get an specific set
  public async getSet(setId: string): Promise<Set> {
    const doc = await getDocs(collection(db, 'sets'))
    let set: Set = {
      id: '',
      title: '',
      course: '',
      description: '',
      userId: '',
      isPublic: false,
      lastReviewTimestamp: null,
      imageUrl: ''
    }
    doc.forEach((doc) => {
      const setData = doc.data()
      if (setData.userId === this.userId && doc.id === setId) {
        set = {
          id: doc.id,
          title: setData.title,
          course: setData.course,
          description: setData.description,
          userId: setData.userId,
          isPublic: setData.isPublic,
          lastReviewTimestamp: setData.lastReviewTimestamp,
          imageUrl: setData.imageUrl
        }
      }
    })
    return set
  }
  // get most recent set from the user
  public async getMostRecentSet(): Promise<Set> {
    const querySnapshot = await getDocs(collection(db, 'sets'))
    let mostRecentSet: Set = {
      id: '',
      title: 'No tienes sets',
      course: 'Crea un set',
      description: 'para que aparezca aquí',
      userId: '',
      isPublic: false,
      lastReviewTimestamp: null,
      imageUrl: '/src/assets/defaultSetImage.png'
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
  public async createSet(set: Set, flashcards: Flashcard[]): Promise<string> {
    console.log('creating set to firestore')
    const now = new Date()
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
        nextReviewTimestamp: now,
        easePercentage: 1
      })
    }
    return docref.id
  }
}
