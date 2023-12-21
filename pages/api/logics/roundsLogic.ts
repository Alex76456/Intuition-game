import { gameConfig, socketEvents } from '@constants/commonConstants'
import { serverState } from '../socket'
import {
	getRandomIntInRange,
	getUpdatedStatistic,
	getWinningMessage,
} from '@utils/commonUtils'
import { Server } from 'socket.io'

export const roundsLogic = (io: Server) =>
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
