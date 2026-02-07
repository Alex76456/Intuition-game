import { SOCKET_URL, socketEvents } from '@constants/commonConstants'
import React, { FC, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

import { useDispatch } from 'react-redux'
import { addMessage, setStatistic } from '@redux/slices/commonSlice'
import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { Rules } from 'src/components/rules/rules'
import { LeaderBoard } from 'src/components/leaderBoard/leaderBoard'
import { NickInput } from 'src/components/nickInput/nickInput'
import { Chat } from 'src/components/chat/chat'
import { useStyles } from './indexStyles'

const Home: FC = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const socket = useRef<Socket | null>(null)

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

	useEffect(() => {
		socketInitializer()

		return () => {
			socket.current?.disconnect()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={classes.main}>
			<Rules />

			<div className={classes.mainWrapper}>
				<div className={classes.mainInner}>
					<div className={classes.name}>
						<h1 className={classes.nameTitle}>Great Intuition the Game</h1>
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
