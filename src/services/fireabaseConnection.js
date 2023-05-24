import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDT7PZZChQsGpcdowFJdklwcqdAVwN1xv8",
    authDomain: "tickets-bfd07.firebaseapp.com",
    projectId: "tickets-bfd07",
    storageBucket: "tickets-bfd07.appspot.com",
    messagingSenderId: "928198190589",
    appId: "1:928198190589:web:905a47b53d355c42862594",
    measurementId: "G-NPM9CR8JX3"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  export {
    auth,
    db,
    storage
  }