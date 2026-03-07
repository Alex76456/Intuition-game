import { getUserName } from '@redux/selectors/commonSelectors'
import { setNickConfirmed, setUserName } from '@redux/slices/commonSlice'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '@hooks/useTranslation'
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
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)

	if (props.mode === 'display') {
		return (
			<div className={classes.userName}>
				<h2 className={classes.userNameSubtitle}>{t('Ваш ник:')}</h2>
				<div className={classes.displayRow}>
					<span className={classes.nickValue}>{userName}</span>
					<button
						type='button'
						className={classes.changeButton}
						onClick={() => dispatch(setNickConfirmed(false))}
					>
						{t('Изменить ник')}
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
					{t('Ваш ник (можно изменить):')}
				</h2>
			)}
			<input
				className={classes.input}
				value={userName}
				onChange={(e) => dispatch(setUserName(e.target.value))}
				placeholder={hideSubtitle ? t('Придумайте никнейм') : undefined}
			/>
		</div>
	)
}
