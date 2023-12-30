import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyB4IibA5gzBZyINVBG1Q195vBbQtVUZzGA',
	authDomain: 'mindgame-cb465.firebaseapp.com',
	databaseURL:
		'https://mindgame-cb465-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'mindgame-cb465',
	storageBucket: 'mindgame-cb465.appspot.com',
	messagingSenderId: '621989859960',
	appId: '1:621989859960:web:a63f30311bfbac30e5938d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
