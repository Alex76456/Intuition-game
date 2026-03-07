import React, { FC } from 'react'
import clsx from 'clsx'
import { PhaseInfo } from '@allTypes/gameStatusTypes'
import { useStyles } from './gameStatusHeaderStyles'

type Props = {
	phaseInfo: PhaseInfo
}

export const GameStatusHeader: FC<Props> = ({ phaseInfo }) => {
	const classes = useStyles()

	const statusBadgeClass = clsx({
		[classes.statusBadgeRunning]: phaseInfo.variant === 'running',
		[classes.statusBadgeFinished]: phaseInfo.variant === 'finished',
		[classes.statusBadgeIdle]:
			phaseInfo.variant === 'idle' || phaseInfo.variant === 'noPlayers',
	})

	const statusText =
		phaseInfo.variant === 'running'
			? 'Раунд идёт'
			: phaseInfo.variant === 'finished'
			? 'Раунд завершён'
			: phaseInfo.variant === 'noPlayers'
			? 'Нет игроков'
			: 'Ожидание'

	return (
		<div className={classes.headerRow}>
			<div>
				<h2 className={classes.title}>{phaseInfo.title}</h2>
				<p className={classes.description}>{phaseInfo.description}</p>
			</div>
			<div className={statusBadgeClass}>{statusText}</div>
		</div>
	)
}
