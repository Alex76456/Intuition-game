import {
	gameConfig,
	LOCAL_STORAGE_USER_NAME_KEY,
	SOCKET_URL,
	socketEvents,
} from '@constants/commonConstants'
import React, { FC, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import { useDispatch, useSelector } from 'react-redux'
import {
	addMessage,
	clearUserSentInCurrentRound,
	setLastRoundResult,
	setNickConfirmed,
	setServerTimeLeft,
	setStatistic,
	setSyncState,
	setUserName,
} from '@redux/slices/commonSlice'
import type { SyncStatePayload } from '@redux/slices/commonSlice'
import { getNickConfirmed } from '@redux/selectors/commonSelectors'
import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { Rules } from 'src/components/rules/rules'
import { LeaderBoard } from 'src/components/leaderBoard/leaderBoard'
import { NickConfirmModal } from 'src/components/nickConfirmModal/nickConfirmModal'
import { NickInput } from 'src/components/nickInput/nickInput'
import { Chat } from 'src/components/chat/chat'
import { GameStatus } from 'src/components/gameStatus/gameStatus'
import { ConnectionStatus } from 'src/components/connectionStatus/ConnectionStatus'
import { useStyles } from '@styles/indexStyles'

const Home: FC = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const nickConfirmed = useSelector(getNickConfirmed)
	const socket = useRef<Socket | null>(null)
	const [isConnected, setIsConnected] = useState(true)

	const socketInitializer = async () => {
		await fetch(SOCKET_URL)
		socket.current = io()
		socket.current.on('connect', () => setIsConnected(true))
		socket.current.on('disconnect', () => setIsConnected(false))

		socket.current.on(socketEvents.SYNC_STATE, (payload: SyncStatePayload) => {
			dispatch(setSyncState(payload))
		})
		socket.current.on(socketEvents.RECEIVE_MESSAGE, (data: MessageType) => {
			dispatch(addMessage(data))
			const text = String(data.message)
			if (
				data.userName === gameConfig.SERVER_NAME &&
				(text === gameConfig.GREETING_MESSAGE || text === gameConfig.WINNING_NUMBER_CREATED_MESSAGE)
			) {
				dispatch(clearUserSentInCurrentRound())
			}
		})
		socket.current.on(socketEvents.TIME_LEFT, (seconds: number) => {
			dispatch(setServerTimeLeft(seconds))
		})
		socket.current.on(socketEvents.ROUND_RESULT, (payload: { winningNumber: number; winnerName: string; winnerNumber: number }) => {
			dispatch(setLastRoundResult(payload))
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

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		try {
			const storedUserName = window.localStorage.getItem(
				LOCAL_STORAGE_USER_NAME_KEY
			)

			if (storedUserName) {
				dispatch(setUserName(storedUserName))
				dispatch(setNickConfirmed(true))
			}
		} catch {
			// ignore localStorage errors
		}
	}, [dispatch])

	return (
		<div className={classes.main}>
			{!nickConfirmed && <NickConfirmModal />}
			<ConnectionStatus
				isConnected={isConnected}
				onReconnect={() => socket.current?.connect()}
			/>

			<Rules />

			<div className={classes.mainWrapper}>
				<div className={classes.mainInner}>
					<div className={classes.name}>
						<h1 className={classes.nameTitle}>Great Intuition the Game</h1>
					</div>

					<NickInput mode="display" />
					<GameStatus socketRef={socket} />
					<Chat />
				</div>
			</div>

			<LeaderBoard />
		</div>
	)
}

export default Home
