import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBnYoz57zjw0lUJYqL_RBKMrAoS4dqQuo",
  authDomain: "netflixclone-d3dc7.firebaseapp.com",
  projectId: "netflixclone-d3dc7",
  storageBucket: "netflixclone-d3dc7.firebasestorage.app",
  messagingSenderId: "643997260894",
  appId: "1:643997260894:web:6e194b29d197a1ecd468cf",
  measurementId: "G-14F2JJ3H2T",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
