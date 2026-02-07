import { RULES } from '@constants/commonConstants'
import React, { FC } from 'react'
import { useStyles } from './rulesStyles'

export const Rules: FC = () => {
	const classes = useStyles()

	return (
		<div className={classes.rules}>
			<h2 className={classes.title}>Правила</h2>
			<ul className={classes.rulesList}>
				{RULES.map((rule, index) => (
					<li key={index} className={classes.listItem}>
						{rule}
					</li>
				))}
			</ul>
		</div>
	)
}
