import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/services/firebase'
import { useUserStore } from '@/stores/userStore'
import { collection, getDocs, updateDoc, getDoc, doc } from 'firebase/firestore'

const userStore = useUserStore()

// using firebase 9 Important
export class UserRepository {
  public async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
  }

  // add points to the user
  public async addPoints(points: number): Promise<void> {
    // calc new points  from store
    const newPoints = userStore.points + points
    // update on db
    const userRef = doc(db, 'users', userStore.id)
    await updateDoc(userRef, {
      points: newPoints
    })
    // update on store
    userStore.points = newPoints
  }

  // add streak to the user
  public async addStreak(): Promise<void> {
    const userStore = useUserStore()
    const userRef = doc(db, 'users', userStore.id)
    await updateDoc(userRef, {
      streak: userStore.streakDuration + 1
    })
  }

  public async resetStreak(): Promise<void> {
    const userStore = useUserStore()
    const userRef = doc(db, 'users', userStore.id)
    await updateDoc(userRef, {
      streak: 0
    })
  }

  public async loadUser(user: any): Promise<void> {
    const userStore = useUserStore()
    console.log(user.uid)
    userStore.isLoaded = false
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      // Cargar usuario al estado actual
      if (userData.uid === user.uid) {
        userStore.name = userData.username
        userStore.email = userData.email
        userStore.points = userData.points
        userStore.isLoaded = true
        userStore.level = userData.level
        userStore.id = doc.id
        userStore.uid = userData.uid
        userStore.streakDuration = userData.streak
        userStore.lastActivity = userData.lastActivity
      }
    })
  }
}
