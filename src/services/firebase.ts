// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtpSC3LbPtjEnixMYshc5tujLS-8eX6Gw',
  authDomain: 'flashlearningfime.firebaseapp.com',
  projectId: 'flashlearningfime',
  storageBucket: 'flashlearningfime.appspot.com',
  messagingSenderId: '819907276004',
  appId: '1:819907276004:web:30832dd72da0c3d278d0f1'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const storage = getStorage(app)
