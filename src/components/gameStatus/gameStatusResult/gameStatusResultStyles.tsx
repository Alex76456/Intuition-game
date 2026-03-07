import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		resultBlock: {
			marginTop: 10,
			paddingTop: 10,
			borderTop: '1px dashed rgba(148, 163, 184, 0.6)',
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
			background: 'rgba(15, 23, 42, 0.9)',
			border: `1px solid rgba(252, 211, 77, 0.9)`,
			color: '#fef3c7',
			fontSize: 14,
			fontWeight: 600,
		},
		resultWinner: {
			padding: '6px 12px',
			borderRadius: theme.radius.full,
			background: 'rgba(15, 23, 42, 0.9)',
			border: `1px solid rgba(190, 242, 100, 0.9)`,
			color: '#ecfccb',
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
