import { socketEvents } from '@constants/commonConstants'
import { getAllMessages, getUserName } from '@redux/selectors/commonSelectors'
import React, { FC, RefObject, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'

type IChatProps = {
	socketRef: RefObject<Socket>
}

const MAX_DIF_TO_SCROLL_TO_BOTTOM = 55

export const Chat: FC<IChatProps> = ({ socketRef }) => {
	const userName = useSelector(getUserName)
	const allMessages = useSelector(getAllMessages)

	const [message, setMessage] = useState<string>('')

	const handleChange = (e) => {
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

	const handleSubmit = (e) => {
		e.preventDefault()

		const numeric = Number(message)

		if (!message || Number.isNaN(numeric) || numeric < 0) {
			return
		}

		socketRef.current.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message: numeric,
		})
		setMessage('')
	}

	useEffect(() => {
		const messagesList = document.getElementById('messagesList')
		const lastMessageElement = messagesList.lastElementChild

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
	}, [allMessages])

	return (
		<div className='window'>
			<ul id={'messagesList'} className='windowChat'>
				{allMessages.map(({ userName: authorName, message }, index) => {
					const isOwnMessage = authorName === userName
					const isBotMessage = authorName.toLowerCase().includes('bot')

					const messageClasses = ['message']

					if (isOwnMessage) {
						messageClasses.push('message--own')
					}

					if (isBotMessage) {
						messageClasses.push('message--bot')
					}

					return (
						<li key={index} className={messageClasses.join(' ')}>
							<span className='messageUser'>{authorName}:</span>{' '}
							<span className='messageText'>{message}</span>
						</li>
					)
				})}
			</ul>

			<form className='form' onSubmit={handleSubmit}>
				<input
					className='inputMessage'
					disabled={!userName}
					name='message'
					placeholder='введите своё число'
					value={message}
					onChange={handleChange}
					autoComplete={'off'}
					min={0}
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
	)
}
