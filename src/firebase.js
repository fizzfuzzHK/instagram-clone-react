import firebase from 'firebase'

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyClXCnL6MbtoPl2HopMMkhMUpA2uTe09dU",
        authDomain: "instagram-clone-app-654f5.firebaseapp.com",
        databaseURL: "https://instagram-clone-app-654f5.firebaseio.com",
        projectId: "instagram-clone-app-654f5",
        storageBucket: "instagram-clone-app-654f5.appspot.com",
        messagingSenderId: "897651832842",
        appId: "1:897651832842:web:f32838721807fef0f107f3"
      }
)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export  {db,auth,storage}