import { gameConfig } from '@constants/commonConstants'
import { ServerStateType } from '@allTypes/commonTypes'

import { Server } from 'socket.io'
import { onConnectionLogic } from './logics/onConnsectionLogic'
import { botsLogic } from './logics/botsLogic'
import { roundsLogic } from './logics/roundsLogic'

export const serverState: ServerStateType = {
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

	onConnectionLogic(io)

	botsLogic(io)

	roundsLogic(io)

	console.log('Setting up socket')
	res.end()
}
