import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";

// Add a new document in collection "cities"

const firebaseConfig = {
    apiKey: "AIzaSyAkV7_nu0LT2Ya8GQzsSYP5mITLGKEuCTo",
    authDomain: "a2dataapi.firebaseapp.com",
    projectId: "a2dataapi",
    storageBucket: "a2dataapi.appspot.com",
    messagingSenderId: "17389564071",
    appId: "1:17389564071:web:f227c75e8bbfe1be5beb82",
    measurementId: "G-YRM4GW93B5",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getData(serial) {
    const querySnapshot = await getDocs(collection(db, "sensors", "data", serial));
    let data = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        data = [...data, doc.data()]
    });
    console.log(data);


}
export async function dbListener(serial) {
    const unsubscribe = onSnapshot(collection(db, "sensors", "data", serial), (snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
            data = [...data, doc.data()]
        });
        console.log(data);
    });
    // unsubscribe();
}