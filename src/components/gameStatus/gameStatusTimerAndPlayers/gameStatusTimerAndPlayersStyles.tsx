import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		bodyRow: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 16,
			flexWrap: 'wrap',
		},
		timerPill: {
			minWidth: 120,
			padding: '8px 14px',
			borderRadius: theme.radius.full,
			background: theme.colors.inputBackground,
			border: `1px solid ${theme.colors.borderStrong}`,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			rowGap: 2,
		},
		timerLabel: {
			fontSize: 11,
			textTransform: 'uppercase',
			letterSpacing: '0.12em',
			color: theme.colors.textSecondary,
		},
		timerValue: {
			fontSize: 22,
			fontVariantNumeric: 'tabular-nums',
			fontWeight: 700,
			color: theme.colors.timerValue,
		},
		timerDanger: {
			color: theme.colors.timerDanger,
		},
		timerInactive: {
			opacity: 0.6,
		},
		playersRow: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: 4,
		},
		playersTitle: {
			fontSize: 12,
			color: theme.colors.textSecondary,
		},
		playersBadges: {
			display: 'flex',
			gap: 8,
			flexWrap: 'wrap',
		},
		playerBadge: {
			padding: '4px 10px',
			borderRadius: theme.radius.full,
			fontSize: 12,
			background: theme.colors.playerBadgeBg,
			color: theme.colors.textAccentSoft,
			border: `1px solid ${theme.colors.playerBadgeBorder}`,
		},
		playerBadgeHighlight: {
			extend: 'playerBadge',
			background: theme.colors.playerBadgeHighlightBg,
			borderColor: theme.colors.playerBadgeHighlightBorder,
		},
	}),
	{ name: 'GameStatusTimerAndPlayers' }
)
