import { gameConfig, socketEvents } from '@constants/commonConstants'
import { serverState } from '../socket'
import { Server } from 'socket.io'

export const onConnectionLogic = (io: Server) =>
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
