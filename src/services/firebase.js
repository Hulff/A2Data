import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, orderBy, limit, query } from "firebase/firestore";

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
export function createStartOfDayDate(day, month, year) {
    const date = new Date(Date.UTC(year, month - 1, day));
    if (!isNaN(date)) {
        date.setMinutes(date.getMinutes());
        return date;
    }
    return null;
}
export function createEndOfDayDate(day, month, year) {
    const date = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
    if (!isNaN(date)) {
        date.setMinutes(date.getMinutes());
        return date;
    }
    return null;
}
// acessar possibilidade de anos,meses e dias

//primeiro anos

export async function getYearsOption(serial) {

    const q = query(collection(db, "sensors", "data", serial));

    const yearOpt = new Set();

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data().data;

        if (data) {
            const ano = data.toDate().getFullYear();
            yearOpt.add(ano);
        }
    });

    const yearsAvail = Array.from(yearOpt);

    return yearsAvail;
}
export async function getOptions(serial) {
    const q = query(collection(db, "sensors", "data", serial));
    // Objeto para armazenar os anos, meses e dias
    const anos = {};

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            // Obtenha os campos relevantes do documento
            const data = doc.data().serverTime.toDate(); // Data do documento
            const ano = data.getFullYear();
            const mes = data.getMonth() + 1; // Meses indexados de 0 (janeiro) a 11 (dezembro)
            const dia = data.getDate();

            // Crie a estrutura de anos, meses e dias conforme necessário
            if (!anos[ano]) {
                anos[ano] = {};
            }
            if (!anos[ano][mes]) {
                anos[ano][mes] = {};
            }
            if (!anos[ano][mes][dia]) {
                anos[ano][mes][dia] = [];
            }

            // Adicione os dados relevantes para o dia
            // anos[ano][mes][dia].push({
            //     altitude: doc.data().altitude,
            //     bateria: doc.data().bateria,
            //     co2: doc.data().co2,
            //     pressao: doc.data().pressao,
            //     temp: doc.data().temp,
            //     umidade: doc.data().umidade,
            //     voc: doc.data().voc,
            // });
        });

        // Agora, 'anos' contém a estrutura desejada com os dados organizados por ano, mês, dia e campos.
        console.log(anos);
        return anos
    } catch (error) {
        console.error("Erro ao acessar o Firebase: " + error);
    }
}