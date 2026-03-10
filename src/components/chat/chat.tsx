import { gameConfig } from '@constants/commonConstants'
import {
	getAllMessages,
	getLastRoundResult,
	getUserName,
} from '@redux/selectors/commonSelectors'
import React, { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './chatStyles'

const MAX_DIF_TO_SCROLL_TO_BOTTOM = 55

function playWinSound() {
	try {
		const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
		const osc = ctx.createOscillator()
		const gain = ctx.createGain()
		osc.connect(gain)
		gain.connect(ctx.destination)
		osc.frequency.value = 523
		osc.type = 'sine'
		gain.gain.setValueAtTime(0.15, ctx.currentTime)
		gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
		osc.start(ctx.currentTime)
		osc.stop(ctx.currentTime + 0.3)
	} catch {
		// ignore
	}
}

export const Chat: FC = () => {
	const classes = useStyles()
	const { t } = useTranslation()
	const userName = useSelector(getUserName)
	const allMessages = useSelector(getAllMessages)
	const lastResult = useSelector(getLastRoundResult)
	const prevLastResultRef = useRef<typeof lastResult>(null)

	useEffect(() => {
		if (lastResult && lastResult.winnerName === userName && prevLastResultRef.current !== lastResult) {
			playWinSound()
		}
		prevLastResultRef.current = lastResult
	}, [lastResult, userName])

	useEffect(() => {
		const messagesList = document.getElementById('messagesList')

		if (!messagesList) {
			return
		}

		const lastMessageElement =
			messagesList.lastElementChild as HTMLElement | null

		if (!lastMessageElement) {
			return
		}

		const lastMessage = allMessages[allMessages.length - 1]
		const isUserLastMessage = lastMessage.userName === userName

		const isScrolledToBottom =
			messagesList.scrollHeight -
				messagesList.scrollTop -
				messagesList.clientHeight <
			MAX_DIF_TO_SCROLL_TO_BOTTOM

		if (isScrolledToBottom || isUserLastMessage) {
			lastMessageElement.scrollIntoView({ behavior: 'smooth' })
		}
	}, [allMessages, userName])

	return (
		<div className={classes.window}>
			<ul id={'messagesList'} className={classes.windowChat}>
				{allMessages.map(({ userName: authorName, message }, index) => {
					const isOwnMessage = authorName === userName
					const isBotMessage = authorName.toLowerCase().includes('bot')
					const isServerMessage =
						authorName === gameConfig.SERVER_NAME || authorName === gameConfig.INFO_MESSAGE_NAME

					const stateClass = isOwnMessage
						? classes.messageOwnState
						: isBotMessage
						? classes.messageBotState
						: isServerMessage
						? classes.messageServerState
						: classes.message

					return (
						<li key={index} className={stateClass}>
							<span className={classes.messageUser}>{authorName}:</span>{' '}
							<span className={classes.messageText}>{message}</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
