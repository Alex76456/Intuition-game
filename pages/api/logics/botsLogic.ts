import { gameConfig, socketEvents } from '@constants/commonConstants'
import { serverState } from '../socket'
import { getRandomBotMessage, getRandomIntInRange } from '@utils/commonUtils'
import { Server } from 'socket.io'

// отправка сообщений ботами
export const botsLogic = (io: Server) => {
	const nextBotMessageDuration =
		getRandomIntInRange(gameConfig.FREQUENCY_BOT_MESSAGES) * 1000
	const newBotMessage = getRandomBotMessage()

	setTimeout(() => {
		serverState.messages = [...serverState.messages, newBotMessage]
		io.emit(socketEvents.RECEIVE_MESSAGE, newBotMessage)

		botsLogic(io)
	}, nextBotMessageDuration)
}
