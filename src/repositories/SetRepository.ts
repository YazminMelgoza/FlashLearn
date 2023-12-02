import type Set from '@/entities/Set'
import { db } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import {useUserStore} from "@/stores/userStore";

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
  }
