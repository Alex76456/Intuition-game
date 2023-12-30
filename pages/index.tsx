import { SOCKET_URL, socketEvents } from '@constants/commonConstants'
import React, { FC, useEffect, useRef } from 'react'
import io from 'socket.io-client'

import { useDispatch } from 'react-redux'
import { addMessage, setStatistic } from '@redux/slices/commonSlice'
import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { Rules } from 'src/components/rules/rules'
import { LeaderBoard } from 'src/components/leaderBoard/leaderBoard'
import { NickInput } from 'src/components/nickInput/nickInput'
import { Chat } from 'src/components/chat/chat'
import { Socket } from 'socket.io-client'

import { collection, getDocs } from 'firebase/firestore'

import { db } from 'db/firebase'

const getTest = async () => {
	const querySnapshot = await getDocs(collection(db, 'test'))
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${doc.data()}`)
	})
}

const Home: FC = () => {
	const dispatch = useDispatch()
	const socket = useRef<Socket>(null)

	useEffect(() => {
		socketInitializer()

		getTest()
		return () => {
			socket.current.disconnect()
		}
	}, [])

	const socketInitializer = async () => {
		await fetch(SOCKET_URL)
		socket.current = io()
		socket.current.on(socketEvents.RECEIVE_MESSAGE, (data: MessageType) => {
			dispatch(addMessage(data))
		})

		socket.current.on(
			socketEvents.STATISTIC_MESSAGE,
			(data: CommonStatisticType) => {
				dispatch(setStatistic(data))
			}
		)
	}

	return (
		<div className='main'>
			<Rules />

			<div className='mainWrapper'>
				<div className='mainInner'>
					<div className='name'>
						<h1 className='nameTitle'>Great Intuition the Game</h1>
					</div>

					<NickInput />
					<Chat socketRef={socket} />
				</div>
			</div>

			<LeaderBoard />
		</div>
	)
}

export default Home
