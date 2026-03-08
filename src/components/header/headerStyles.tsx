import { createUseStyles } from 'react-jss'
import type { AppTheme } from '@styles/theme'

export const useHeaderStyles = createUseStyles(
	(theme: AppTheme) => ({
		header: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			zIndex: 100,
			paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '12px 20px',
			gap: 16,
			background: theme.colors.surfacePrimary,
			borderBottom: `1px solid ${theme.colors.borderSoft}`,
			boxShadow: theme.shadow.window,
		},
		left: {
			display: 'flex',
			alignItems: 'center',
			gap: 12,
		},
		toggle: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: 40,
			height: 40,
			borderRadius: theme.radius.full,
			border: `1px solid ${theme.colors.borderSoft}`,
			background: theme.colors.inputBackground,
			color: theme.colors.textPrimary,
			cursor: 'pointer',
			fontSize: 20,
			transition: 'background 0.2s ease, border-color 0.2s ease',
			'&:hover': {
				background: theme.colors.mainBackgroundHighlight,
				borderColor: theme.colors.borderStrong,
			},
		},
		langGroup: {
			display: 'flex',
			borderRadius: theme.radius.full,
			border: `1px solid ${theme.colors.borderSoft}`,
			overflow: 'hidden',
			background: theme.colors.inputBackground,
		},
		langBtn: {
			padding: '8px 12px',
			border: 'none',
			background: 'transparent',
			color: theme.colors.textSecondary,
			cursor: 'pointer',
			fontSize: 13,
			fontWeight: 600,
			transition: 'background 0.2s ease, color 0.2s ease',
			'&:hover': {
				background: theme.colors.mainBackgroundHighlight,
				color: theme.colors.textPrimary,
			},
		},
		langBtnActive: {
			background: theme.colors.mainBackgroundHighlight,
			color: theme.colors.textPrimary,
		},
	}),
	{ name: 'Header' }
)
