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
			background: theme.colors.inputBackground,
			color: theme.colors.textAccentSoft,
			border: `1px solid ${theme.colors.borderSoft}`,
		},
		statusBadgeRunning: {
			extend: 'statusBadge',
			background: theme.colors.statusRunningBg,
			borderColor: theme.colors.statusRunningBorder,
			color: theme.colors.statusRunningText,
		},
		statusBadgeFinished: {
			extend: 'statusBadge',
			background: theme.colors.statusFinishedBg,
			borderColor: theme.colors.statusFinishedBorder,
			color: theme.colors.statusFinishedText,
		},
		statusBadgeIdle: {
			extend: 'statusBadge',
			background: theme.colors.statusIdleBg,
			borderColor: theme.colors.borderSoft,
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
