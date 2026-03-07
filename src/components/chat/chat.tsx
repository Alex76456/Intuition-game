import { socketEvents } from '@constants/commonConstants'
import { getAllMessages, getUserName } from '@redux/selectors/commonSelectors'
import React, { FC, RefObject, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './chatStyles'

type IChatProps = {
	socketRef: RefObject<Socket>
}

const MAX_DIF_TO_SCROLL_TO_BOTTOM = 55

export const Chat: FC<IChatProps> = ({ socketRef }) => {
	const classes = useStyles()
	const { t } = useTranslation()
	const userName = useSelector(getUserName)
	const allMessages = useSelector(getAllMessages)

	const [message, setMessage] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (value === '') {
			setMessage('')
			return
		}

		const numeric = Number(value)

		if (Number.isNaN(numeric) || numeric < 0) {
			return
		}

		setMessage(value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const numeric = Number(message)

		if (!message || Number.isNaN(numeric) || numeric < 0) {
			return
		}

		socketRef.current?.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message: numeric,
		})
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

					const baseClass = classes.message
					const stateClass = isOwnMessage
						? classes.messageOwnState
						: isBotMessage
						? classes.messageBotState
						: baseClass

					return (
						<li key={index} className={stateClass}>
							<span className={classes.messageUser}>{authorName}:</span>{' '}
							<span className={classes.messageText}>{message}</span>
						</li>
					)
				})}
			</ul>

			<form className={classes.form} onSubmit={handleSubmit}>
				<input
					className={classes.inputMessage}
					disabled={!userName}
					name='message'
					placeholder={t('введите своё число')}
					value={message}
					onChange={handleChange}
					autoComplete={'off'}
					min={0}
					size={3}
				/>
				<button
					className={classes.submitButton}
					type='submit'
					disabled={!userName || !message}
				>
					{t('Send')}
				</button>
			</form>
		</div>
	)
}
