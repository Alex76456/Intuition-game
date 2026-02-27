import { setNickConfirmed, setUserName } from '@redux/slices/commonSlice'
import { LOCAL_STORAGE_USER_NAME_KEY } from '@constants/commonConstants'
import { getUserName } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NickInput } from 'src/components/nickInput/nickInput'
import { useStyles } from './nickConfirmModalStyles'

const getUserNameValidationError = (rawUserName: string): string | null => {
	const trimmed = rawUserName.trim()

	if (!trimmed) {
		return 'Ник не может быть пустым'
	}

	if (trimmed.length < 3) {
		return 'Минимальная длина ника — 3 символа'
	}

	if (trimmed.length > 20) {
		return 'Максимальная длина ника — 20 символов'
	}

	const allowedCharsRegex = /^[a-zA-Zа-яА-Я0-9 _-]+$/

	if (!allowedCharsRegex.test(trimmed)) {
		return 'Используйте только буквы, цифры, пробел, _ и -'
	}

	return null
}

export const NickConfirmModal: FC = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	const validationError = getUserNameValidationError(userName)
	const hasTyped = userName.length > 0
	const canConfirm = !validationError

	const handleConfirm = () => {
		if (canConfirm) {
			const trimmedUserName = userName.trim()

			dispatch(setUserName(trimmedUserName))
			dispatch(setNickConfirmed(true))

			if (typeof window !== 'undefined') {
				try {
					window.localStorage.setItem(
						LOCAL_STORAGE_USER_NAME_KEY,
						trimmedUserName
					)
				} catch {
					// ignore localStorage errors
				}
			}
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
				{hasTyped && validationError && (
					<p className={classes.error}>{validationError}</p>
				)}
			</div>
		</div>
	)
}
