import {} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js";
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


var place_map = new Map();

async function update_place_map() {
    await db.collection("users").get().then((querySnapshot) => {
        var qmp = {}
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            qmp[doc.id] = doc.data();

            var arr = new Array(3);
            var date = doc.data()["date"]
            arr[0] = doc.data()["place"];
            arr[1] = doc.data()["time"];
            arr[2] = doc.data()["link"];

            if (!place_map.has(date))
                place_map[date] = new Array();

            place_map[date].push(arr);
        })
    });

    console.log(place_map);
}

async function display_trip() {

    place_map.clear();
    await update_place_map();

    var keys = [...place_map.keys()];
    keys.sort();

    keys.forEach((date) => {
        var tag1 = '<b><u>${date}</b></u>';
        document.getElementById("content").innerHTML = tag1;
    })
}

display_trip();