import { gameConfig, socketEvents } from 'src/constants/commonConstants'
import { serverState } from '../socket'
import { Server } from 'socket.io'

export const onConnectionLogic = (io: Server /* , cb */) =>
	io.on('connection', async (socket) => {
		/* \ */
		// приветствуем нового юзера
		io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
			userName: gameConfig.SERVER_NAME,
			message: gameConfig.GREETING_MESSAGE,
		})

		io.to(socket.id).emit(socketEvents.STATISTIC_MESSAGE, serverState.statistic)

		// обработка новых сообщений от всех юзеров
		socket.on(socketEvents.SEND_MESSAGE, (message) => {
			serverState.messages = [...serverState.messages, message]
			io.emit(socketEvents.RECEIVE_MESSAGE, message)

			io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
				userName: gameConfig.INFO_MESSAGE_NAME,
				message: gameConfig.GET_REMAINING_SECONDS({
					nextResultDate: serverState.nextResultDate,
				}),
			})
		})
	})
