import { SOCKET_URL, socketEvents } from '@constants/commonConstants'
import React, { FC, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'
import { createUseStyles } from 'react-jss'

import { useDispatch } from 'react-redux'
import { addMessage, setStatistic } from '@redux/slices/commonSlice'
import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { Rules } from 'src/components/rules/rules'
import { LeaderBoard } from 'src/components/leaderBoard/leaderBoard'
import { NickInput } from 'src/components/nickInput/nickInput'
import { Chat } from 'src/components/chat/chat'
import type { AppTheme } from '@styles/theme'

const useStyles = createUseStyles((theme: AppTheme) => ({
	main: {
		position: 'relative',
		height: '100vh',
		maxWidth: '100vw',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		background: `radial-gradient(circle at top left, ${theme.colors.mainBackgroundHighlight} 0, ${theme.colors.backgroundBody} 60%)`,
		color: theme.colors.textPrimary,
		padding: '20px 24px',
		gap: 20,
		'@media (max-width: 1200px)': {
			flexDirection: 'column',
			alignItems: 'stretch',
			gap: 16,
			padding: '16px 16px 24px',
		},
	},
	mainWrapper: {
		margin: '0 auto',
		padding: '32px 40px',
		background: `linear-gradient(145deg, ${theme.colors.surfacePrimary}, ${theme.colors.backgroundBody})`,
		borderRadius: 24,
		boxShadow: theme.shadow.mainWrapper,
		border: `1px solid rgba(148, 163, 184, 0.25)`,
		maxHeight: 'calc(100vh - 40px)',
		overflow: 'hidden',
		'@media (max-width: 1200px)': {
			order: 1,
			width: '100%',
		},
	},
	mainInner: {
		display: 'flex',
		alignItems: 'stretch',
		flexDirection: 'column',
		rowGap: 24,
		minWidth: 520,
		minHeight: 520,
		height: '100%',
		overflow: 'hidden',
		'@media (max-width: 768px)': {
			minWidth: 0,
			minHeight: 0,
		},
	},
	name: {
		textAlign: 'center',
		padding: '18px 20px',
		width: '100%',
		background: `radial-gradient(circle at top left, ${theme.colors.surfaceAccentBlue}, ${theme.colors.backgroundBody})`,
		borderRadius: theme.radius.lg,
		border: `1px solid ${theme.colors.nameBorder}`,
		boxShadow: theme.shadow.name,
	},
	nameTitle: {
		margin: 0,
		fontSize: 32,
		textTransform: 'uppercase',
		letterSpacing: '0.12em',
		color: theme.colors.textAccentSoft,
		'@media (max-width: 768px)': {
			fontSize: 24,
		},
	},
}))

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
