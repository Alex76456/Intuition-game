import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		headerRow: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 12,
			marginTop: 10,
		},
		statusBadge: {
			padding: '6px 12px',
			borderRadius: theme.radius.full,
			fontSize: 13,
			fontWeight: 600,
			textTransform: 'uppercase',
			letterSpacing: '0.08em',
			background: 'rgba(15, 23, 42, 0.85)',
			color: theme.colors.textAccentSoft,
			border: `1px solid rgba(148, 163, 184, 0.5)`,
		},
		statusBadgeRunning: {
			extend: 'statusBadge',
			background: 'rgba(22, 163, 74, 0.18)',
			borderColor: 'rgba(34, 197, 94, 0.8)',
			color: '#bbf7d0',
		},
		statusBadgeFinished: {
			extend: 'statusBadge',
			background: 'rgba(147, 51, 234, 0.16)',
			borderColor: 'rgba(192, 132, 252, 0.9)',
			color: '#f5d0fe',
		},
		statusBadgeIdle: {
			extend: 'statusBadge',
			background: 'rgba(15, 23, 42, 0.7)',
			borderColor: 'rgba(148, 163, 184, 0.5)',
			color: theme.colors.textAccentSoft,
		},
		title: {
			margin: 0,
			fontSize: 18,
			fontWeight: 600,
			color: theme.colors.textAccentSoft,
		},
		description: {
			margin: 0,
			fontSize: 13,
			color: theme.colors.textSecondary,
			whiteSpace: 'pre-line',
		},
	}),
	{ name: 'GameStatusHeader' }
)
