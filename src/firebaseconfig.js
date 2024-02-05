// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArUTtGTYSd0nB2iMGq5Ly4zHHUEWdId08",
  authDomain: "edufar-apps.firebaseapp.com",
  projectId: "edufar-apps",
  storageBucket: "edufar-apps.appspot.com",
  messagingSenderId: "996550985074",
  appId: "1:996550985074:web:017c8e2328457e97bb09eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
