import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "@/services/firebase";
import {useUserStore} from "@/stores/userStore";
import {collection, getDocs} from "firebase/firestore";

export class UserRepository {
  public async login(email: string, password: string): Promise<void> {
      await signInWithEmailAndPassword(auth, email, password)
  }

  public async loadUser(user:any): Promise<void> {
    const userStore = useUserStore()
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
        userStore.id = user.uid
        userStore.streakDuration = userData.streak
        userStore.lastActivity = userData.lastActivity
      }
    })
  }
}