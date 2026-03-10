import React, { FC, RefObject } from 'react'
import { Socket } from 'socket.io-client'
import { useStyles } from './gameStatusStyles'
import { GameStatusBanner } from './gameStatusBanner/gameStatusBanner'
import { GameStatusHeader } from './gameStatusHeader/gameStatusHeader'
import { GameStatusTimerAndPlayers } from './gameStatusTimerAndPlayers/gameStatusTimerAndPlayers'
import { GameStatusResult } from './gameStatusResult/gameStatusResult'
import { useGameStatus } from 'src/hooks/useGameStatus'
import { GameStatusInput } from './gameStatusInput/gameStatusInput'

type Props = {
	socketRef: RefObject<Socket>
}

export const GameStatus: FC<Props> = ({ socketRef }) => {
	const classes = useStyles()
	const { banner, phaseInfo, timeLeft, players, bots, lastResult } =
		useGameStatus()

	return (
		<div className={classes.card}>
			<GameStatusBanner banner={banner} />
			<GameStatusHeader phaseInfo={phaseInfo} />
			<GameStatusTimerAndPlayers
				timeLeft={timeLeft}
				players={players}
				bots={bots}
			/>
			<GameStatusResult lastResult={lastResult} />
			<GameStatusInput socketRef={socketRef} />
		</div>
	)
}
