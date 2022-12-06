import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDuxXXMRPqoKMXYnIHlbmAvEPAIKrVntkY",
    authDomain: "invois-9e281.firebaseapp.com",
    databaseURL: "https://invois-9e281-default-rtdb.firebaseio.com",
    projectId: "invois-9e281",
    storageBucket: "invois-9e281.appspot.com",
    messagingSenderId: "856692744807",
    appId: "1:856692744807:web:2b5d23c484c4b4f53f6ac2",
    measurementId: "G-4TB5XYSKYF"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);


