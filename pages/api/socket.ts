import { gameConfig } from '@constants/commonConstants'
import { ServerStateType } from '@allTypes/commonTypes'

import { Server } from 'socket.io'
import { onConnectionLogic } from './logics/onConnsectionLogic'
import { botsLogic } from './logics/botsLogic'
import { roundsLogic } from './logics/roundsLogic'

export const serverState: ServerStateType = {
	messages: [],
	nextResultDate: Date.now() + gameConfig.GAME_DURATION,
	statistic: {},
}

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from 'db/firebase'

const addTest = async () => {
	// Запись победителя в БД
	try {
		const roomRef = doc(db, 'test', '333')

		const roomData = await getDoc(roomRef)

		console.log(roomData)
		if (!roomData.exists()) {
			const roomRef = doc(db, 'test', '333')

			await setDoc(roomRef, { room: 333 })
		} else {
			await updateDoc(roomRef, { room: 444 })
		}
	} catch (error) {
		console.log('Ошибка при загрузке данных в Firestore:', error)
		return
	}
}

/* const getTest = async () => {
	const querySnapshot = await getDocs(collection(db, 'test'))
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${doc.data()}`)
	})
} */

export default function SocketHandler(req, res) {
	if (res.socket.server.io) {
		console.log('Already set up')
		res.end()
		return
	}

	console.error('START')

	/* getTest() */

	const io = new Server(res.socket.server)
	res.socket.server.io = io

	onConnectionLogic(io /* , getTest */)

	botsLogic(io)

	roundsLogic(io, addTest)

	console.log('Setting up socket')
	res.end()
}
