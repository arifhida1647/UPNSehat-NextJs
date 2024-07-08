
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY55K4D6ggvqSSD3h4jwB7VOU7zbSyd64",
  authDomain: "arif-9e465.firebaseapp.com",
  databaseURL: "https://arif-9e465-default-rtdb.firebaseio.com",
  projectId: "arif-9e465",
  storageBucket: "arif-9e465.appspot.com",
  messagingSenderId: "700412186025",
  appId: "1:700412186025:web:a6a6c98813b3ac702948b8",
  measurementId: "G-KDLQTCNSSR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
