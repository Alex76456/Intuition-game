import { gameConfig, socketEvents } from 'src/constants/commonConstants'
import { serverState } from '../socket'
import { getRemainingSecondsNumber } from 'src/utils/commonUtils'
import { Server } from 'socket.io'

function buildSyncMessages() {
	const timeMessage = {
		userName: gameConfig.INFO_MESSAGE_NAME,
		message: gameConfig.GET_REMAINING_SECONDS({
			nextResultDate: serverState.nextResultDate,
		}),
	}
	return [
		{ userName: gameConfig.SERVER_NAME, message: gameConfig.GREETING_MESSAGE },
		timeMessage,
		...serverState.messages,
	]
}

export const onConnectionLogic = (io: Server) =>
	io.on('connection', async (socket) => {
		const timeLeftSeconds = getRemainingSecondsNumber(serverState.nextResultDate)
		io.to(socket.id).emit(socketEvents.SYNC_STATE, {
			messages: buildSyncMessages(),
			statistic: serverState.statistic,
			lastRoundResult: serverState.lastRoundResult ?? null,
			timeLeftSeconds,
		})

		socket.on(socketEvents.SEND_MESSAGE, (message) => {
			serverState.messages = [...serverState.messages, message]
			io.emit(socketEvents.RECEIVE_MESSAGE, message)

			const timeLeftSeconds = getRemainingSecondsNumber(serverState.nextResultDate)
			io.to(socket.id).emit(socketEvents.RECEIVE_MESSAGE, {
				userName: gameConfig.INFO_MESSAGE_NAME,
				message: gameConfig.GET_REMAINING_SECONDS({
					nextResultDate: serverState.nextResultDate,
				}),
			})
			io.to(socket.id).emit(socketEvents.TIME_LEFT, timeLeftSeconds)
		})
	})
