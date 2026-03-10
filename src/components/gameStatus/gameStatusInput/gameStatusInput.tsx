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
import { getUserCoins } from '@redux/selectors/commonSelectors'

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
	const userCoins = useSelector(getUserCoins)

	const [message, setMessage] = useState<string>('')
	const [bet, setBet] = useState<string>('10')

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
		const betNumeric = Number(bet)

		if (
			!message ||
			Number.isNaN(numeric) ||
			numeric < 0 ||
			numeric > MAX_NUMBER ||
			Number.isNaN(betNumeric) ||
			betNumeric <= 0 ||
			betNumeric > userCoins
		)
			return
		socketRef.current?.emit(socketEvents.SEND_MESSAGE, {
			userName,
			message: numeric,
			bet: betNumeric,
		})
		dispatch(setUserSentInCurrentRound(true))
		setMessage('')
	}

	const BET_INPUT_ID = 'game-status-bet-input'

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className={classes.formRow}>
				<div className={classes.fieldGroup}>
					<label htmlFor={INPUT_ID} className={classes.fieldLabel}>
						{t('Ваше число')}
					</label>
					<input
						id={INPUT_ID}
						className={classes.inputMessage}
						disabled={!userName || userSentInCurrentRound || userCoins <= 0}
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
				</div>
				<div className={classes.fieldGroup}>
					<label htmlFor={BET_INPUT_ID} className={classes.fieldLabel}>
						{t('Ставка (монеты)')}
					</label>
					<input
						id={BET_INPUT_ID}
						className={classes.betInput}
						type="number"
						min={1}
						max={userCoins}
						value={bet}
						onChange={(e) => setBet(e.target.value)}
						disabled={!userName || userSentInCurrentRound || userCoins <= 0}
						aria-label={t('Ваша ставка монет')}
					/>
				</div>
				<div className={classes.submitWrap}>
					<button
						className={classes.submitButton}
					type="submit"
					disabled={
						!userName ||
						!message ||
						userSentInCurrentRound ||
						userCoins <= 0 ||
						Number(bet) <= 0 ||
						Number(bet) > userCoins
					}
				>
						{t('Send')}
					</button>
				</div>
			</div>
			{userSentInCurrentRound ? (
				<p id="game-status-already-sent" className={classes.alreadySentHint}>
					{t('Вы уже отправили число в этом раунде')}
				</p>
			) : (
				<p id="game-status-hint" className={classes.inputHint}>
					{userCoins > 0
						? t('Число от 0 до 100, ставка в монетах обязательна')
						: t('У вас нет монет — дождитесь ежедневного пополнения')}
				</p>
			)}
		</form>
	)
}

