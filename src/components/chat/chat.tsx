import { gameConfig, socketEvents } from '@constants/commonConstants'
import {
	getAllMessages,
	getLastRoundResult,
	getUserName,
	getUserSentInCurrentRound,
} from '@redux/selectors/commonSelectors'
import { setUserSentInCurrentRound } from '@redux/slices/commonSlice'
import React, { FC, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './chatStyles'

const INPUT_ID = 'chat-number-input'
const MAX_DIF_TO_SCROLL_TO_BOTTOM = 55
const MAX_NUMBER = gameConfig.MAX_RANDOM_NUMBER

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

type IChatProps = {
	socketRef: RefObject<Socket>
}

export const Chat: FC<IChatProps> = ({ socketRef }) => {
	const classes = useStyles()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)
	const allMessages = useSelector(getAllMessages)
	const userSentInCurrentRound = useSelector(getUserSentInCurrentRound)
	const lastResult = useSelector(getLastRoundResult)
	const prevLastResultRef = useRef<typeof lastResult>(null)

	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		if (lastResult && lastResult.winnerName === userName && prevLastResultRef.current !== lastResult) {
			playWinSound()
		}
		prevLastResultRef.current = lastResult
	}, [lastResult, userName])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === '') {
			setMessage('')
			return
		}
		const numeric = Number(value)
		if (Number.isNaN(numeric) || numeric < 0 || numeric > MAX_NUMBER) return
		setMessage(value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const numeric = Number(message)
		if (!message || Number.isNaN(numeric) || numeric < 0 || numeric > MAX_NUMBER) return
		socketRef.current?.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message: numeric,
		})
		dispatch(setUserSentInCurrentRound(true))
		setMessage('')
	}

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

			<form className={classes.form} onSubmit={handleSubmit}>
				<div className={classes.formRow}>
					<label htmlFor={INPUT_ID} className={classes.visuallyHidden}>
						{t('введите своё число')}
					</label>
					<input
						id={INPUT_ID}
						className={classes.inputMessage}
						disabled={!userName || userSentInCurrentRound}
						name="message"
						placeholder={t('0–100')}
						value={message}
						onChange={handleChange}
						autoComplete="off"
						min={0}
						max={MAX_NUMBER}
						size={3}
						aria-describedby={userSentInCurrentRound ? 'chat-already-sent' : 'chat-hint'}
					/>
					<button
						className={classes.submitButton}
						type="submit"
						disabled={!userName || !message || userSentInCurrentRound}
					>
						{t('Send')}
					</button>
				</div>
				{userSentInCurrentRound ? (
					<p id="chat-already-sent" className={classes.alreadySentHint}>
						{t('Вы уже отправили число в этом раунде')}
					</p>
				) : (
					<p id="chat-hint" className={classes.inputHint}>
						{t('Число от 0 до 100')}
					</p>
				)}
			</form>
		</div>
	)
}
