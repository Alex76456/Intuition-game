import React, { FC } from 'react'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './connectionStatusStyles'

type Props = {
	isConnected: boolean
	onReconnect: () => void
}

export const ConnectionStatus: FC<Props> = ({ isConnected, onReconnect }) => {
	const classes = useStyles()
	const { t } = useTranslation()

	if (isConnected) {
		return null
	}

	return (
		<div className={classes.overlay} role="status" aria-live="polite">
			<div className={classes.card}>
				<p className={classes.text}>{t('Нет связи')}</p>
				<button
					type="button"
					className={classes.button}
					onClick={onReconnect}
				>
					{t('Переподключиться')}
				</button>
			</div>
		</div>
	)
}
