import React, { FC, useMemo } from 'react'
import clsx from 'clsx'
import { useStyles } from './gameStatusTimerAndPlayersStyles'

type Props = {
	timeLeft: number | null
	players: string[]
	bots: string[]
}

export const GameStatusTimerAndPlayers: FC<Props> = ({
	timeLeft,
	players,
	bots,
}) => {
	const classes = useStyles()

	const { timerActive, timerValueClass } = useMemo(() => {
		const active = timeLeft !== null && timeLeft >= 0

		const valueClass = clsx(classes.timerValue, {
			[classes.timerInactive]: !active,
			[classes.timerDanger]:
				active && timeLeft !== null && timeLeft <= 10,
		})

		return {
			timerActive: active,
			timerValueClass: valueClass,
		}
	}, [timeLeft, classes])

	return (
		<div className={classes.bodyRow}>
			<div className={classes.timerPill}>
				<span className={classes.timerLabel}>До объявления победителя</span>
				<span className={timerValueClass}>
					{timerActive && timeLeft !== null ? `${timeLeft} сек` : '—'}
				</span>
			</div>

			<div className={classes.playersRow}>
				<span className={classes.playersTitle}>Участники текущего раунда</span>
				<div className={classes.playersBadges}>
					<span className={classes.playerBadgeHighlight}>
						Игроков: {players.length}
					</span>
					<span className={classes.playerBadge}>Ботов: {bots.length}</span>
					{players.map((player) => (
						<span key={player} className={classes.playerBadge}>
							{player}
						</span>
					))}
					{bots.map((bot) => (
						<span key={bot} className={classes.playerBadge}>
							{bot}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
