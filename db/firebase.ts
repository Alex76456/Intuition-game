// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBE2UPcopDlkic4Nq9zmxCLPAIQcB8UCgg',
	authDomain: 'intuitiongame-6d241.firebaseapp.com',
	projectId: 'intuitiongame-6d241',
	storageBucket: 'intuitiongame-6d241.appspot.com',
	messagingSenderId: '10671863423',
	appId: '1:10671863423:web:c02d2eb8c68096ebd4714a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
