//@ts-check
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  })
}

// init services
const db = firebase.firestore()
const auth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, timestamp }
