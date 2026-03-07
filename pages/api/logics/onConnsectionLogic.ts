import { gameConfig, socketEvents } from 'src/constants/commonConstants'
import { serverState } from '../socket'
import { Server } from 'socket.io'

export const onConnectionLogic = (io: Server) =>
	io.on('connection', async (socket) => {
		// приветствуем нового юзера
		io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
			userName: gameConfig.SERVER_NAME,
			message: gameConfig.GREETING_MESSAGE,
		})

		io.to(socket.id).emit(socketEvents.STATISTIC_MESSAGE, serverState.statistic)

		// отправляем актуальное время до конца текущего раунда новому игроку
		io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
			userName: gameConfig.INFO_MESSAGE_NAME,
			message: gameConfig.GET_REMAINING_SECONDS({
				nextResultDate: serverState.nextResultDate,
			}),
		})

		// отправляем новому игроку все уже сделанные ходы текущего раунда,
		// чтобы он видел участников (игроков и ботов) и история раунда была полной
		if (serverState.messages.length) {
			serverState.messages.forEach((roundMessage) => {
				io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, roundMessage)
			})
		}

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
