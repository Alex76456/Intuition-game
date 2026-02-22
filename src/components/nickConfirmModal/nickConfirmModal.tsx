import { setNickConfirmed, setUserName } from '@redux/slices/commonSlice'
import { getUserName } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NickInput } from 'src/components/nickInput/nickInput'
import { useStyles } from './nickConfirmModalStyles'

export const NickConfirmModal: FC = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	const canConfirm = userName.trim().length > 0

	const handleConfirm = () => {
		if (canConfirm) {
			dispatch(setUserName(userName.trim()))
			dispatch(setNickConfirmed(true))
		}
	}

	return (
		<div className={classes.overlay}>
			<div className={classes.card}>
				<h2 className={classes.title}>Введите свой ник, чтобы начать играть</h2>
				<NickInput hideSubtitle />
				<button
					type='button'
					className={classes.button}
					disabled={!canConfirm}
					onClick={handleConfirm}
				>
					Начать игру
				</button>
			</div>
		</div>
	)
}
