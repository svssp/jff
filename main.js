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
var keys = new Set();

async function update_place_map() {
    await db.collection("users").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

            var arr = new Array(3);
            var date = doc.data()["date"]
            arr[0] = doc.data()["place"];
            arr[1] = doc.data()["time"];
            arr[2] = doc.data()["link"];

            if (!(keys.has(date)))
                place_map[date] = new Array(), console.log(date);

            console.log(date, arr);
            place_map[date].push(arr);
            keys.add(date);
        })
    });

    console.log(place_map);
}

async function display_trip() {

    place_map.clear();
    await update_place_map();

    console.log(place_map["28-Nov-2023"])

    var arr = [...keys];
    arr.sort();

    console.log(arr)

    var tag = "";
    arr.forEach((date) => {
        var tag1 = '<b><u>' + date.split("-").reverse().join("-") + '</u></b>';
        place_map[date].sort(function(a, b) {
            if (a[1] < b[1])
                return -1;
            else
                return 1;

        });
        place_map[date].forEach(date_arr => {
            var place = date_arr[0];
            var time = date_arr[1];
            var link = date_arr[2];
            console.log(place_map[date])

            var tag2 = '<div class = "container inside-container"><p> Place Name : ' + place + '</p><p> Expected start time: ' + time + '</p><a href=' + link + '>' + link + '</a></div><br>';
            tag1 += tag2;

        });
        tag += tag1;

    })

    document.getElementById("content").innerHTML = tag;
}

display_trip();

async function addPlace() {

    var date = document.getElementById("date").value;
    var place = document.getElementById("place").value;
    var time = document.getElementById("time").value;
    var link = document.getElementById("link").value;
    if (link == "")
        link = "#";
    await db.collection("users").add({
        date: date,
        time: time,
        place: place,
        link: link
    }).then((e) => {
        window.alert("Place added");
        display_trip();
    }).catch(err => {
        window.alert(err);
    })
}

document.getElementById("submit").onclick = async() => {
    document.getElementById("content").innerHTML = "";
    await addPlace();
};