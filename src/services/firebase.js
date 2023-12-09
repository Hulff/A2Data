import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, where, orderBy, limit, query } from "firebase/firestore";

// Add a new document in collection "cities"

const firebaseConfig = {
    apiKey: "AIzaSyAkV7_nu0LT2Ya8GQzsSYP5mITLGKEuCTo",
    authDomain: "a2dataapi.firebaseapp.com",
    databaseURL: "https://a2dataapi-default-rtdb.firebaseio.com",
    projectId: "a2dataapi",
    storageBucket: "a2dataapi.appspot.com",
    messagingSenderId: "17389564071",
    appId: "1:17389564071:web:f227c75e8bbfe1be5beb82",
    measurementId: "G-YRM4GW93B5"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export async function getData(serial) {
    try {
        const q = query(collection(db, "sensors", "data", serial), orderBy("serverTime", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data)
        if (data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
// acessar possibilidade de anos,meses e dias

//primeiro anos

export async function getOptions(serial) {
    const q = query(collection(db, "sensors", "info", serial));
    // Objeto para armazenar os anos, meses e dias

    try {
        const q = query(
            collection(db, "sensors", "info", serial),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data[0].years)
        return data[0].years
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export async function getHistData(serial, startDate, endDate, m, y) {
    try {
        console.log(serial)
        // Definir o primeiro dia e o último dia do mês para o ano e mês especificados
        const firstDay = new Date(Date.UTC(y, m - 1, startDate, 0, 0, 0, 0));
        const lastDay = new Date(Date.UTC(y, m - 1, endDate, 23, 59, 59, 999));

        // Criar uma consulta para obter dados para o serial e dentro do intervalo de datas,
        // ordenando-os pelo campo serverTime
        const q = query(
            collection(db, "sensors", "data", serial),
            where("serverTime", ">=", firstDay),
            where("serverTime", "<=", lastDay),
            orderBy("serverTime", "desc") // ou "desc" para ordenação descendente, dependendo das suas necessidades
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        if (data.length > 0) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching data by year and month:", error);
        return null;
    }
}
