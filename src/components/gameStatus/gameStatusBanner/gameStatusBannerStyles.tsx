import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		banner: {
			position: 'absolute',
			top: 8,
			left: '50%',
			transform: 'translateX(-50%)',
			padding: '6px 14px',
			borderRadius: theme.radius.full,
			fontSize: 13,
			display: 'flex',
			alignItems: 'center',
			gap: 8,
			boxShadow: theme.shadow.name,
			border: `1px solid ${theme.colors.borderStrong}`,
			animation: '$bannerIn 0.22s ease-out',
			backdropFilter: 'blur(6px)',
			zIndex: 1,
		},
		bannerRoundStart: {
			extend: 'banner',
			background: theme.colors.bannerStartBg,
			color: theme.colors.bannerStartText,
		},
		bannerResult: {
			extend: 'banner',
			background: theme.colors.bannerResultBg,
			color: theme.colors.bannerResultText,
		},
		bannerInfo: {
			extend: 'banner',
			background: theme.colors.bannerInfoBg,
			color: theme.colors.textAccentSoft,
		},
		bannerIcon: {
			fontSize: 14,
		},
		bannerText: {
			fontSize: 13,
			fontWeight: 600,
			whiteSpace: 'nowrap',
		},
		'@keyframes bannerIn': {
			from: {
				opacity: 0,
				transform: 'translateX(-50%) translateY(-6px)',
			},
			to: {
				opacity: 1,
				transform: 'translateX(-50%) translateY(0)',
			},
		},
	}),
	{ name: 'GameStatusBanner' }
)
