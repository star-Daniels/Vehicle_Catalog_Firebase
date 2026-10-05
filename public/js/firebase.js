
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAn2Be4vgmQ-H9AHRxW9gjWIQb6EBH9kZU",
    authDomain: "vilauto-2a6ec.firebaseapp.com",
    projectId: "vilauto-2a6ec",
    storageBucket: "vilauto-2a6ec.firebasestorage.app",
    messagingSenderId: "648601495738",
    appId: "1:648601495738:web:959fcca7eaba0d462aba83"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db };