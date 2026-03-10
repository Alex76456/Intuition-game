import { gameConfig, socketEvents } from '@constants/commonConstants'
import {
	getUserName,
	getUserSentInCurrentRound,
} from '@redux/selectors/commonSelectors'
import { setUserSentInCurrentRound } from '@redux/slices/commonSlice'
import { useTranslation } from '@hooks/useTranslation'
import React, { FC, RefObject, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { useStyles } from './gameStatusInputStyles'

const INPUT_ID = 'game-status-number-input'
const MAX_NUMBER = gameConfig.MAX_RANDOM_NUMBER

type Props = {
	socketRef: RefObject<Socket>
}

export const GameStatusInput: FC<Props> = ({ socketRef }) => {
	const classes = useStyles()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const userName = useSelector(getUserName)
	const userSentInCurrentRound = useSelector(getUserSentInCurrentRound)

	const [message, setMessage] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === '') {
			setMessage('')
			return
		}
		const numeric = Number(value)
		if (Number.isNaN(numeric) || numeric < 0 || numeric > MAX_NUMBER) return
		setMessage(value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const numeric = Number(message)
		if (!message || Number.isNaN(numeric) || numeric < 0 || numeric > MAX_NUMBER) return
		socketRef.current?.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message: numeric,
		})
		dispatch(setUserSentInCurrentRound(true))
		setMessage('')
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className={classes.formRow}>
				<label htmlFor={INPUT_ID} className={classes.visuallyHidden}>
					{t('введите своё число')}
				</label>
				<input
					id={INPUT_ID}
					className={classes.inputMessage}
					disabled={!userName || userSentInCurrentRound}
					name="message"
					placeholder={t('0–100')}
					value={message}
					onChange={handleChange}
					autoComplete="off"
					min={0}
					max={MAX_NUMBER}
					size={3}
					aria-describedby={
						userSentInCurrentRound ? 'game-status-already-sent' : 'game-status-hint'
					}
				/>
				<button
					className={classes.submitButton}
					type="submit"
					disabled={!userName || !message || userSentInCurrentRound}
				>
					{t('Send')}
				</button>
			</div>
			{userSentInCurrentRound ? (
				<p id="game-status-already-sent" className={classes.alreadySentHint}>
					{t('Вы уже отправили число в этом раунде')}
				</p>
			) : (
				<p id="game-status-hint" className={classes.inputHint}>
					{t('Число от 0 до 100')}
				</p>
			)}
		</form>
	)
}

