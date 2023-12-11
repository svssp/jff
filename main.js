import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js";
import {} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js";

const firebaseConfig = {
    apiKey: "AIzaSyA9x-k52z0XbpC7ff79PI5zHG4SwEhdTjw",
    authDomain: "trip-8e616.firebaseapp.com",
    projectId: "trip-8e616",
    storageBucket: "trip-8e616.appspot.com",
    messagingSenderId: "857247768978",
    appId: "1:857247768978:web:560b6c4e8c13f80a5f614b",
    measurementId: "G-NYRMLXHW6Z"
};




const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
var place_map = new Map();