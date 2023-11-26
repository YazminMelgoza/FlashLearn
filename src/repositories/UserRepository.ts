import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "@/services/firebase";
import {useUserStore} from "@/stores/userStore";
import {collection, getDocs} from "firebase/firestore";

export class UserRepository {
  public async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    }
  }

  public async loadUser(): Promise<void> {
    const userStore = useUserStore()
    userStore.isLoaded = false
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      if (userData.uid === user.uid) {
        // Cargar usuario al estado actual
        userStore.name = userData.username
        userStore.email = userData.email
        userStore.points = userData.points
        userStore.isLoaded = true
      }
    })
  }
}