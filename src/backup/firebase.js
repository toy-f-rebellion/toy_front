import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQmxR1UgW7UCPHonoHc7FBsWUNOqTMtqk",
  authDomain: "epilogue-of-the-day.firebaseapp.com",
  projectId: "epilogue-of-the-day",
  storageBucket: "epilogue-of-the-day.appspot.com",
  messagingSenderId: "58758128350",
  appId: "1:58758128350:web:2919ef582d5e3e2d5d184f",
  measurementId: "G-KHS5QXV8M5"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };