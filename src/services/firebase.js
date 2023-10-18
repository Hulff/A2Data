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
    try {
        const querySnapshot = await getDocs(collection(db, "sensors", "data", serial));
        const data = querySnapshot.docs.map((doc) => doc.data());

        if (data.length > 0) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
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