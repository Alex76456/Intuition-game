import { socketEvents } from '@constants/commonConstants'
import { getAllMessages, getUserName } from '@redux/selectors/commonSelectors'
import React, { FC, RefObject, useState } from 'react'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'

type IChatProps = {
	socketRef: RefObject<Socket>
}

export const Chat: FC<IChatProps> = ({ socketRef }) => {
	const userName = useSelector(getUserName)
	const allMessages = useSelector(getAllMessages)

	const [message, setMessage] = useState<string>('')

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('emitted')
		socketRef.current.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message,
		})
		setMessage('')
	}

	return (
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
	)
}
