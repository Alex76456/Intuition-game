import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		resultBlock: {
			marginTop: 10,
			paddingTop: 10,
			borderTop: `1px dashed ${theme.colors.resultDivider}`,
			display: 'flex',
			flexDirection: 'column',
			gap: 6,
		},
		resultTitle: {
			fontSize: 12,
			textTransform: 'uppercase',
			letterSpacing: '0.12em',
			color: theme.colors.textSecondary,
		},
		resultRow: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 12,
			flexWrap: 'wrap',
		},
		resultNumber: {
			padding: '6px 12px',
			borderRadius: theme.radius.full,
			background: theme.colors.resultSecondBg,
			border: `1px solid ${theme.colors.resultSecondBorder}`,
			color: theme.colors.resultSecondText,
			fontSize: 14,
			fontWeight: 600,
		},
		resultWinner: {
			padding: '6px 12px',
			borderRadius: theme.radius.full,
			background: theme.colors.resultSecondBg,
			border: `1px solid ${theme.colors.resultFirstBorder}`,
			color: theme.colors.resultFirstText,
			fontSize: 14,
			fontWeight: 600,
		},
		resultSub: {
			fontSize: 12,
			color: theme.colors.textSecondary,
		},
	}),
	{ name: 'GameStatusResult' }
)
