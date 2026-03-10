import React, { FC } from 'react'
import { LastResult } from '@allTypes/gameStatusTypes'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './gameStatusResultStyles'

type Props = {
	lastResult: LastResult | null
}

export const GameStatusResult: FC<Props> = ({ lastResult }) => {
	const classes = useStyles()
	const { t } = useTranslation()

	if (!lastResult) {
		return null
	}

	return (
		<div className={classes.resultBlock}>
			<div className={classes.resultTitle}>{t('Последний результат раунда')}</div>
			<div className={classes.resultRow}>
				<div>
					<div className={classes.resultNumber}>
						{t('Загаданное число:')} {lastResult.winningNumber}
					</div>
				</div>
				<div>
					<div className={classes.resultWinner}>
						{t('Победитель:')} {lastResult.winnerName}
					</div>
					<div className={classes.resultSub}>
						{t('Его число:')} {lastResult.winnerNumber}
					</div>
					{lastResult.winAmount !== undefined && lastResult.winAmount > 0 && (
						<div className={classes.resultSub}>
							{t('Сумма выигрыша:')} {lastResult.winAmount} {t('монеты')}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
