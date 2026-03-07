import { RULES } from '@constants/commonConstants'
import React, { FC } from 'react'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './rulesStyles'

export const Rules: FC = () => {
	const classes = useStyles()
	const { t } = useTranslation()

	return (
		<div className={classes.rules}>
			<h2 className={classes.title}>{t('Правила')}</h2>
			<ul className={classes.rulesList}>
				{RULES.map((rule, index) => (
					<li key={index} className={classes.listItem}>
						{t(rule)}
					</li>
				))}
			</ul>
		</div>
	)
}
