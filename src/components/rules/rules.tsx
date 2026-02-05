import { RULES } from '@constants/commonConstants'
import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import type { AppTheme } from '@styles/theme'

const useStyles = createUseStyles((theme: AppTheme) => ({
	rules: {
		textAlign: 'left',
		width: 360,
		maxWidth: '100%',
		maxHeight: 'calc(100vh - 40px)',
		background: theme.colors.rulesBackground,
		borderRadius: 20,
		padding: '24px 22px 20px',
		border: `1px solid ${theme.colors.borderSoft}`,
		boxShadow: theme.shadow.rules,
		display: 'flex',
		flexDirection: 'column',
		gap: 14,
		overflowY: 'auto',
		scrollbarWidth: 'thin',
		scrollbarColor: `${theme.colors.scrollbarThumb} transparent`,
		'&::-webkit-scrollbar': {
			width: 6,
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: theme.colors.scrollbarThumb,
			borderRadius: theme.radius.full,
		},
		'@media (max-width: 1200px)': {
			width: '100%',
			order: 0,
		},
	},
	title: {
		fontSize: 18,
		textTransform: 'uppercase',
		letterSpacing: '0.12em',
		color: theme.colors.textAccentSoft,
	},
	rulesList: {
		listStyleType: 'none',
		margin: 0,
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	listItem: {
		padding: '10px 12px',
		borderRadius: 12,
		background: theme.colors.rulesItemBackground,
		color: theme.colors.textAccentSoft,
		fontSize: 14,
		lineHeight: 1.5,
	},
}))

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
