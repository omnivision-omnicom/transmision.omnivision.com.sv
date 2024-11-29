// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDsYjB5X9UxXlnexn3ubP4Pj7UoJlIJduM",
  authDomain: "omnivision-a7f23.firebaseapp.com",
  databaseURL: "https://omnivision-a7f23-default-rtdb.firebaseio.com",
  projectId: "omnivision-a7f23",
  storageBucket: "omnivision-a7f23.firebasestorage.app",
  messagingSenderId: "949757026062",
  appId: "1:949757026062:web:9b5d4b414c79275e8ac15f",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
