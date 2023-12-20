import { gameConfig, socketEvents } from '@constants/commonConstants'
import { ServerStateType } from 'allTypes/commonTypes'
import {
	getRandomBotMessage,
	getRandomIntInRange,
	getUpdatedStatistic,
	getWinningMessage,
} from '@utils/commonUtils'
import { Server } from 'socket.io'

const serverState: ServerStateType = {
	messages: [],
	nextResultDate: Date.now() + gameConfig.GAME_DURATION,
	statistic: {},
}

export default function SocketHandler(req, res) {
	if (res.socket.server.io) {
		console.log('Already set up')
		res.end()
		return
	}

	const io = new Server(res.socket.server)
	res.socket.server.io = io

	io.on('connection', (socket) => {
		// приветствуем нового юзера
		io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
			username: gameConfig.SERVER_NAME,
			message: gameConfig.GREETING_MESSAGE,
		})

		io.to(socket.id).emit(socketEvents.STATISTIC_MESSAGE, serverState.statistic)

		// обработка новых сообщений от всех юзеров
		socket.on(socketEvents.SEND_MESSAGE, (message) => {
			serverState.messages = [...serverState.messages, message]
			io.emit(socketEvents.RECEIVE_MESSAGE, message)

			io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
				username: gameConfig.INFO_MESSAGE_NAME,
				message: gameConfig.GET_REMAINING_SECONDS({
					nextResultDate: serverState.nextResultDate,
				}),
			})
		})
	})

	// отправка сообщений ботами
	const emitBotMessage = () => {
		const nextBotMessageDuration =
			getRandomIntInRange(gameConfig.FREQUENCY_BOT_MESSAGES) * 1000
		const newBotMessage = getRandomBotMessage()

		setTimeout(() => {
			serverState.messages = [...serverState.messages, newBotMessage]
			io.emit(socketEvents.RECEIVE_MESSAGE, newBotMessage)

			emitBotMessage()
		}, nextBotMessageDuration)
	}
	emitBotMessage()

	// логика цикла игры
	setInterval(() => {
		// сообщение "число загадо!"
		setTimeout(() => {
			io.emit(socketEvents.RECEIVE_MESSAGE, {
				username: gameConfig.SERVER_NAME,
				message: gameConfig.WINNING_NUMBER_CREATED_MESSAGE,
			})
		}, 1 * 1000)

		if (!serverState.messages.length) {
			io.emit(socketEvents.RECEIVE_MESSAGE, {
				username: gameConfig.SERVER_NAME,
				message: gameConfig.NO_PLAYERS_MESSAGE,
			})
			return
		}

		const winningNumber = getRandomIntInRange({
			min: gameConfig.MIN_RANDOM_NUMBER,
			max: gameConfig.MAX_RANDOM_NUMBER,
		})
		const winningMessage = getWinningMessage({
			winningNumber,
			messages: serverState.messages,
		})

		io.emit(socketEvents.RECEIVE_MESSAGE, {
			username: gameConfig.SERVER_NAME,
			message: gameConfig.GET_RESULT_MESSAGE({ winningNumber, winningMessage }),
		})

		serverState.statistic = getUpdatedStatistic({
			winningNumber,
			startStatistic: serverState.statistic,
			messages: serverState.messages,
			winningMessage,
		})

		io.emit(socketEvents.STATISTIC_MESSAGE, serverState.statistic)
		serverState.messages = []
		serverState.nextResultDate = Date.now() + gameConfig.GAME_DURATION
	}, gameConfig.GAME_DURATION)

	console.log('Setting up socket')
	res.end()
}
