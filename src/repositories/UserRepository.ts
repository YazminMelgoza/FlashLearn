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

  // add streak to the user, if the document is not found, it will be created
  public async addStreak(): Promise<void> {
    // calc new streak from store
    const newStreak = userStore.streakDuration + 1
    // update on db
    const userRef = doc(db, 'users', userStore.id)
    await updateDoc(userRef, {
      lastActivity: new Date(),
      streak: newStreak
    })
    // update on store
    userStore.streakDuration = newStreak
  }
  //

  public async loadUser(user: any): Promise<void> {
    const userStore = useUserStore()
    console.log(user.uid)
    userStore.isLoaded = false
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      // Cargar usuario al estado actual
      if (userData.uid === user.uid) {
        let streakDuration = userData.streak
        // if the streak is from two days ago, reset it
        if (userData.streak > 0 && userData.lastActivity !== null) {
          const today = new Date()
          const lastActivity = userData.lastActivity.toDate()
          const diffTime = Math.abs(today.getTime() - lastActivity.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          if (diffDays > 2) {
            streakDuration = 0
            // reset streak on db using firebase 9
            updateDoc(doc.ref, {
              streak: 0
            })
          }
        }
        userStore.name = userData.username
        userStore.email = userData.email
        userStore.points = userData.points
        userStore.isLoaded = true
        userStore.level = userData.level
        userStore.id = doc.id
        userStore.uid = userData.uid
        userStore.streakDuration = streakDuration
        userStore.lastActivity = userData.lastActivity
      }
    })
  }
}
