import React, { FC } from 'react'
import { LastResult } from '@allTypes/gameStatusTypes'
import { useStyles } from './gameStatusResultStyles'

type Props = {
	lastResult: LastResult | null
}

export const GameStatusResult: FC<Props> = ({ lastResult }) => {
	const classes = useStyles()

	if (!lastResult) {
		return null
	}

	return (
		<div className={classes.resultBlock}>
			<div className={classes.resultTitle}>Последний результат раунда</div>
			<div className={classes.resultRow}>
				<div>
					<div className={classes.resultNumber}>
						Загаданное число: {lastResult.winningNumber}
					</div>
				</div>
				<div>
					<div className={classes.resultWinner}>
						Победитель: {lastResult.winnerName}
					</div>
					<div className={classes.resultSub}>
						Его число: {lastResult.winnerNumber}
					</div>
				</div>
			</div>
		</div>
	)
}
