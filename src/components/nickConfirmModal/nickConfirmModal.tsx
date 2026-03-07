import { setNickConfirmed, setUserName } from '@redux/slices/commonSlice'
import { LOCAL_STORAGE_USER_NAME_KEY } from '@constants/commonConstants'
import { getUserName } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NickInput } from 'src/components/nickInput/nickInput'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './nickConfirmModalStyles'

const VALIDATION_KEYS = [
	'Ник не может быть пустым',
	'Минимальная длина ника — 3 символа',
	'Максимальная длина ника — 20 символов',
	'Используйте только буквы, цифры, пробел, _ и -',
] as const

const getUserNameValidationError = (rawUserName: string): (typeof VALIDATION_KEYS)[number] | null => {
	const trimmed = rawUserName.trim()

	if (!trimmed) return VALIDATION_KEYS[0]
	if (trimmed.length < 3) return VALIDATION_KEYS[1]
	if (trimmed.length > 20) return VALIDATION_KEYS[2]

	const allowedCharsRegex = /^[a-zA-Zа-яА-Я0-9 _-]+$/
	if (!allowedCharsRegex.test(trimmed)) return VALIDATION_KEYS[3]

	return null
}

export const NickConfirmModal: FC = () => {
	const classes = useStyles()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	const validationErrorKey = getUserNameValidationError(userName)
	const validationError = validationErrorKey ? t(validationErrorKey) : null
	const hasTyped = userName.length > 0
	const canConfirm = !validationErrorKey

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
				<h2 className={classes.title}>{t('Введите свой ник, чтобы начать играть')}</h2>
				<NickInput hideSubtitle />
				<button
					type='button'
					className={classes.button}
					disabled={!canConfirm}
					onClick={handleConfirm}
				>
					{t('Начать игру')}
				</button>
				{hasTyped && validationError && (
					<p className={classes.error}>{validationError}</p>
				)}
			</div>
		</div>
	)
}
