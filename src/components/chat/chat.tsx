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

	const handleSubmit = (e) => {
		e.preventDefault()
		socketRef.current.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message,
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
	)
}
