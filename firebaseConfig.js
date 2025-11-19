import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmzfndGL4zB5H5ga8L89YnHL68qrWxsfE",
  authDomain: "schema-app-4936b.firebaseapp.com",
  projectId: "schema-app-4936b",
  storageBucket: "schema-app-4936b.firebasestorage.app",
  messagingSenderId: "429923968218",
  appId: "1:429923968218:web:e1dd801ef1cbd92a9671e3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
