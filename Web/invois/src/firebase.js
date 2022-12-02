import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuxXXMRPqoKMXYnIHlbmAvEPAIKrVntkY",
  authDomain: "invois-9e281.firebaseapp.com",
  projectId: "invois-9e281",
  storageBucket: "invois-9e281.appspot.com",
  messagingSenderId: "856692744807",
  appId: "1:856692744807:web:2b5d23c484c4b4f53f6ac2",
  measurementId: "G-4TB5XYSKYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);