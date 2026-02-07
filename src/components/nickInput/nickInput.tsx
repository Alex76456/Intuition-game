import { getUserName } from '@redux/selectors/commonSelectors'
import { setUserName } from '@redux/slices/commonSlice'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './nickInputStyles'

export const NickInput: FC = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	return (
		<div className={classes.userName}>
			<h2 className={classes.userNameSubtitle}>
				{'Ваш ник (можно ввести свой):'}
			</h2>
			<input
				className={classes.input}
				value={userName}
				onChange={(e) => dispatch(setUserName(e.target.value))}
			/>
		</div>
	)
}
