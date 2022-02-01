import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlq4CdSVEBM8itkmb_dYqIsYEeEknR36U",
  authDomain: "photography-site-kiki-nathan.firebaseapp.com",
  databaseURL: "https://photography-site-kiki-nathan.firebaseio.com",
  projectId: "photography-site-kiki-nathan",
  storageBucket: "photography-site-kiki-nathan.appspot.com",
  messagingSenderId: "644256627327",
  appId: "1:644256627327:web:5052616ed3d686f7bf9d4a",
  measurementId: "G-WKP2ZYRF7C"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
