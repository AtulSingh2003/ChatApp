import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWaAODNM2pEy3xZx-bYq_pIW1G86UA82s",
  authDomain: "chatapp-atulsingh.firebaseapp.com",
  projectId: "chatapp-atulsingh",
  storageBucket: "chatapp-atulsingh.appspot.com",
  messagingSenderId: "5432306163",
  appId: "1:5432306163:web:dbd027acff06bcc0ee0a86"
};


export const app = initializeApp(firebaseConfig);