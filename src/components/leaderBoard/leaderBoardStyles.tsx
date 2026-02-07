import { createUseStyles } from 'react-jss'
import type { AppTheme } from '@styles/theme'

export const useStyles = createUseStyles((theme: AppTheme) => ({
	leaderboard: {
		textAlign: 'left',
		width: 360,
		maxWidth: '100%',
		maxHeight: 'calc(100vh - 40px)',
		background: theme.colors.rulesBackground,
		borderRadius: 20,
		padding: '24px 22px 20px',
		border: `1px solid ${theme.colors.borderSoft}`,
		boxShadow: theme.shadow.leaderboard,
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
		marginTop: 10,
		fontSize: 18,
		textTransform: 'uppercase',
		letterSpacing: '0.08em',
		color: theme.colors.textAccentSoft,
	},
	list: {
		margin: '8px 0 0 0',
		padding: 0,
		listStyleType: 'none',
		display: 'flex',
		flexDirection: 'column',
		gap: 6,
		fontSize: 14,
		color: theme.colors.leaderboardText,
	},
}))
