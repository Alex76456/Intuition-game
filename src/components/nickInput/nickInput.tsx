import { getUserName } from '@redux/selectors/commonSelectors'
import { setNickConfirmed, setUserName } from '@redux/slices/commonSlice'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './nickInputStyles'

type NickInputProps = {
	/** Режим ввода — для модалки смены ника */
	mode?: 'edit'
	/** Скрыть подзаголовок (только в mode edit) */
	hideSubtitle?: boolean
}

type NickDisplayProps = {
	mode: 'display'
}

export const NickInput: FC<NickInputProps | NickDisplayProps> = (props) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	if (props.mode === 'display') {
		return (
			<div className={classes.userName}>
				<h2 className={classes.userNameSubtitle}>Ваш ник:</h2>
				<div className={classes.displayRow}>
					<span className={classes.nickValue}>{userName}</span>
					<button
						type='button'
						className={classes.changeButton}
						onClick={() => dispatch(setNickConfirmed(false))}
					>
						Изменить ник
					</button>
				</div>
			</div>
		)
	}

	const { hideSubtitle } = props
	return (
		<div className={classes.userName}>
			{!hideSubtitle && (
				<h2 className={classes.userNameSubtitle}>
					{'Ваш ник (можно изменить):'}
				</h2>
			)}
			<input
				className={classes.input}
				value={userName}
				onChange={(e) => dispatch(setUserName(e.target.value))}
				placeholder={hideSubtitle ? 'Придумайте никнейм' : undefined}
			/>
		</div>
	)
}
