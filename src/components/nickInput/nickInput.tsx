import { getUserName } from '@redux/selectors/commonSelectors'
import { setUserName } from '@redux/slices/commonSlice'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const NickInput: FC = () => {
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	return (
		<div className='userName'>
			<h2 className='userNameSubtitle'>{'Ваш ник (можно ввести свой):'}</h2>
			<input
				className='input'
				value={userName}
				onChange={(e) => dispatch(setUserName(e.target.value))}
			/>
		</div>
	)
}
