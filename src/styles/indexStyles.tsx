import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		main: {
			position: 'relative',
			flex: 1,
			minHeight: 0,
			maxWidth: '100vw',
			overflowY: 'auto',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			background: `radial-gradient(circle at top left, ${theme.colors.mainBackgroundHighlight} 0, ${theme.colors.backgroundBody} 60%)`,
			color: theme.colors.textPrimary,
			// Отступ сверху >= высоте фиксированного хедера (padding 12*2 + кнопка 40 ≈ 64px), + safe-area
			padding: 'calc(68px + env(safe-area-inset-top, 0px)) 24px 20px',
			gap: 20,
			'@media (max-width: 1200px)': {
				flexDirection: 'column',
				alignItems: 'stretch',
				gap: 16,
				padding: 'calc(68px + env(safe-area-inset-top, 0px)) 16px 24px',
			},
		},
		mainWrapper: {
			margin: '0 auto',
			padding: '32px 40px',
			background: `linear-gradient(145deg, ${theme.colors.surfacePrimary}, ${theme.colors.backgroundBody})`,
			borderRadius: 24,
			boxShadow: theme.shadow.mainWrapper,
			border: `1px solid ${theme.colors.borderSoft}`,
			flex: 1,
			minHeight: 0,
			maxHeight: 'calc(100vh - 88px)',
			overflowY: 'auto',
			overflowX: 'hidden',
			scrollbarWidth: 'thin',
			scrollbarColor: `${theme.colors.scrollbarThumb} transparent`,
			maxWidth: '900px',
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
				order: 1,
				width: '100%',
			},
		},
		mainInner: {
			display: 'flex',
			alignItems: 'stretch',
			flexDirection: 'column',
			rowGap: 24,
			minWidth: 520,
			minHeight: 520,
			overflow: 'hidden',
			'@media (max-width: 768px)': {
				minWidth: 0,
				minHeight: 0,
			},
		},
		name: {
			textAlign: 'center',
			padding: '18px 20px',
			width: '100%',
			background: `radial-gradient(circle at top left, ${theme.colors.surfaceAccentBlue}, ${theme.colors.backgroundBody})`,
			borderRadius: theme.radius.lg,
			border: `1px solid ${theme.colors.nameBorder}`,
			boxShadow: theme.shadow.name,
		},
		nameTitle: {
			margin: 0,
			fontSize: 32,
			textTransform: 'uppercase',
			letterSpacing: '0.12em',
			color: theme.colors.textAccentSoft,
			'@media (max-width: 768px)': {
				fontSize: 24,
			},
		},
	}),
	{ name: 'Index' }
)
