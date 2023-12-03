import type Set from '@/entities/Set'
import { db } from '@/services/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import {useUserStore} from "@/stores/userStore";
import type { Set } from '@/entities/Set'

export class SetRepository {
// get the user id at initialization
  public userId: string
  constructor() {
    const userStore = useUserStore()
    this.userId = userStore.id
  }

  public async getSets(): Promise<Set[]> {
    const querySnapshot = await getDocs(collection(db, 'sets'))
    const sets: Set[] = []
    querySnapshot.forEach((doc) => {
      const setData = doc.data()
      if (setData.userId === this.userId) {
        sets.push({
          id: doc.id,
          title: setData.title,
          course: setData.course,
          description: setData.description,
          userId: setData.userId,
          isPublic: setData.isPublic,
          imageUrl: setData.imageUrl,
          flashcards: setData.flashcards
        })
      }
    })
    return sets
  }


  // create set
  public async createSet(set: Set): Promise<void> {
    console.log('creating set to firestore')
    await addDoc(collection(db, 'sets'), {
      title: set.title,
      course: set.course,
      description: set.description,
      userId: this.userId,
      isPublic: set.isPublic,
      imageUrl: set.imageUrl,
      flashcards: set.flashcards
    })
    }
  }


