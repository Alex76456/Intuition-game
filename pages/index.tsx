import { RULES, SOCKET_URL, socketEvents } from '@constants/commonConstants'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

import { useDispatch, useSelector } from 'react-redux'
import {
	getAllMessages,
	getStatistic,
	getUserName,
} from '@redux/selectors/commonSelectors'
import {
	addMessage,
	setStatistic,
	setUserName,
} from '@redux/slices/commonSlice'
import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'

import { collection, getDocs } from 'firebase/firestore'
import { db } from 'db/firebase'

const getTest = async () => {
	const querySnapshot = await getDocs(collection(db, 'test'))
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${doc.data()}`)
	})
}

const Home = () => {
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)
	const allMessages = useSelector(getAllMessages)
	const statistic = useSelector(getStatistic)

	const socket = useRef(null)
	const [message, setMessage] = useState<string>('')

	const accuracyLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].averageAccuracy - a[1].averageAccuracy
	)
	const winsLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].wins - a[1].wins
	)
	const gamesPlayedLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].gamesPlayed - a[1].gamesPlayed
	)
	const numbersSuggestedLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].numbersSuggested - a[1].numbersSuggested
	)

	useEffect(() => {
		socketInitializer()

		getTest()
		return () => {
			socket.current.disconnect()
		}
	}, [])

	async function socketInitializer() {
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

	function handleSubmit(e) {
		e.preventDefault()
		console.log('emitted')
		socket.current.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message,
		})
		setMessage('')
	}

	return (
		<div className='main'>
			<div className='rules'>
				<h2>Правила</h2>
				<ul className='rulesList'>
					{RULES.map((rule, index) => (
						<li key={index} className='listItem'>
							{rule}
						</li>
					))}
				</ul>
			</div>

			<div className='mainWrapper'>
				<div className='mainInner'>
					<div className='name'>
						<h1 className='nameTitle'>Great Intuition the Game</h1>
					</div>

					<div className='userName'>
						<h2 className='userNameSubtitle'>
							{'Ваш ник (можно ввести свой):'}
						</h2>
						<input
							className='input'
							value={userName}
							onChange={(e) => dispatch(setUserName(e.target.value))}
						/>
					</div>

					<div className='window'>
						<ul className='windowChat'>
							{allMessages.map(({ userName, message }, index) => (
								<li key={index} className='message'>
									{userName}: {message}
								</li>
							))}
						</ul>

						<form className='form' onSubmit={handleSubmit}>
							<input
								className='inputMessage'
								disabled={!userName}
								name='message'
								placeholder='введите своё число'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								autoComplete={'off'}
								type='number'
								size={3}
							/>
							<button
								className='submitButton'
								type='submit'
								disabled={!userName || !message}
							>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className='leaderboard'>
				<h2>Таблица лидеров по точности</h2>
				<ul className='leaderboardList'>
					{accuracyLeaders.map((user, index) => (
						<li key={user[0]}>{`${index + 1}. ${user[0]} (Ср. точность: ${
							user[1].averageAccuracy
						}%)`}</li>
					))}
				</ul>
				<h2>Таблица лидеров по количеству побед</h2>
				<ul>
					{winsLeaders.map((user, index) => (
						<li key={user[0]}>{`${index + 1}. ${user[0]} (Побед: ${
							user[1].wins
						})`}</li>
					))}{' '}
				</ul>

				<h2>Таблица лидеров по участию в играх</h2>
				<ul>
					{gamesPlayedLeaders.map((user, index) => (
						<li key={user[0]}>{`${index + 1}. ${user[0]} (Сыграно: ${
							user[1].gamesPlayed
						})`}</li>
					))}
				</ul>

				<h2>Таблица лидеров по количеству предложений</h2>
				<ul>
					{numbersSuggestedLeaders.map((user, index) => (
						<li key={user[0]}>{`${index + 1}. ${user[0]} (Предложено: ${
							user[1].numbersSuggested
						})`}</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Home
