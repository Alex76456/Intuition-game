import React, { FC } from 'react'
import clsx from 'clsx'
import { BannerState } from '@allTypes/gameStatusTypes'
import { useStyles } from './gameStatusBannerStyles'

type Props = {
	banner: BannerState
}

export const GameStatusBanner: FC<Props> = ({ banner }) => {
	const classes = useStyles()

	if (!banner) {
		return null
	}

	const bannerClass = clsx({
		[classes.bannerRoundStart]: banner.variant === 'roundStart',
		[classes.bannerResult]: banner.variant === 'roundResult',
		[classes.bannerInfo]:
			banner.variant === 'greeting' || banner.variant === 'noPlayers',
	})

	const icon =
		banner.variant === 'roundStart'
			? '⚡'
			: banner.variant === 'roundResult'
			? '🏆'
			: banner.variant === 'noPlayers'
			? '…'
			: '★'

	return (
		<div className={bannerClass} role="status" aria-live="polite" aria-atomic>
			<span className={classes.bannerIcon}>{icon}</span>
			<span className={classes.bannerText}>{banner.text}</span>
		</div>
	)
}
