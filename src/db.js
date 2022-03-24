import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// import moment from "moment";

// // // TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_RPT3d_rRHkw7iPPSqBhbACUnIEyQJCY",
  authDomain: "onyckinges6.firebaseapp.com",
  databaseURL: "https://onyckinges6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "onyckinges6",
  storageBucket: "onyckinges6.appspot.com",
  messagingSenderId: "569674598373",
  appId: "1:569674598373:web:88cced11aa3a8b7c64110c",
};

const app = initializeApp(firebaseConfig);

// // // Get a reference to the database service
const database = getDatabase(app);

export const dbRef = ref(getDatabase());
export default database;


