import { BOT_NAMES, gameConfig } from '@constants/commonConstants'
import { getAllMessages } from '@redux/selectors/commonSelectors'
import { MessageType } from '@allTypes/commonTypes'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useStyles } from './gameStatusStyles'

type PhaseVariant = 'idle' | 'running' | 'finished' | 'noPlayers'

type PhaseInfo = {
	title: string
	description: string
	variant: PhaseVariant
}

type BannerVariant = 'greeting' | 'roundStart' | 'roundResult' | 'noPlayers'

type BannerState = {
	variant: BannerVariant
	text: string
} | null

const isServerMessage = (message: MessageType) =>
	message.userName === gameConfig.SERVER_NAME

const isInfoMessage = (message: MessageType) =>
	message.userName === gameConfig.INFO_MESSAGE_NAME

export const GameStatus: FC = () => {
	const classes = useStyles()
	const allMessages = useSelector(getAllMessages)

	const [timeLeft, setTimeLeft] = useState<number | null>(null)
	const [banner, setBanner] = useState<BannerState>(null)
	const bannerTimeoutRef = useRef<number | null>(null)

	const lastServerMessage = useMemo(
		() =>
			[...allMessages].reverse().find((m) => isServerMessage(m)) ??
			undefined,
		[allMessages]
	)

	const lastInfoMessage = useMemo(
		() =>
			[...allMessages].reverse().find((m) => isInfoMessage(m)) ??
			undefined,
		[allMessages]
	)

	useEffect(() => {
		if (!lastServerMessage) {
			return
		}

		const text = String(lastServerMessage.message)

		let nextBanner: BannerState = null

		if (text === gameConfig.GREETING_MESSAGE) {
			nextBanner = {
				variant: 'greeting',
				text: 'Добро пожаловать! Число уже загадано.',
			}
		} else if (text === gameConfig.WINNING_NUMBER_CREATED_MESSAGE) {
			nextBanner = {
				variant: 'roundStart',
				text: 'Новое число загадано — раунд начался!',
			}
		} else if (text === gameConfig.NO_PLAYERS_MESSAGE) {
			nextBanner = {
				variant: 'noPlayers',
				text: 'В прошлом раунде не было попыток.',
			}
		} else if (text.includes('Загаданное число:')) {
			nextBanner = {
				variant: 'roundResult',
				text: 'Результаты раунда объявлены.',
			}
		}

		if (!nextBanner) {
			return
		}

		setBanner(nextBanner)

		if (bannerTimeoutRef.current !== null) {
			window.clearTimeout(bannerTimeoutRef.current)
		}

		bannerTimeoutRef.current = window.setTimeout(() => {
			setBanner(null)
		}, 3500)

		return () => {
			if (bannerTimeoutRef.current !== null) {
				window.clearTimeout(bannerTimeoutRef.current)
				bannerTimeoutRef.current = null
			}
		}
	}, [lastServerMessage])

	useEffect(() => {
		if (!lastInfoMessage || typeof lastInfoMessage.message !== 'string') {
			setTimeLeft(null)
			return
		}

		const match = /(-?\d+)\s*сек/.exec(lastInfoMessage.message)

		if (!match) {
			setTimeLeft(null)
			return
		}

		const rawSeconds = Number(match[1])

		if (Number.isNaN(rawSeconds)) {
			setTimeLeft(null)
			return
		}

		const seconds = Math.max(0, rawSeconds)

		setTimeLeft(seconds)
	}, [lastInfoMessage])

	useEffect(() => {
		if (timeLeft === null || timeLeft <= 0) {
			return
		}

		const id = window.setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === null || prev <= 0) {
					return prev
				}

				return prev - 1
			})
		}, 1000)

		return () => window.clearInterval(id)
	}, [timeLeft])

	const { players, bots } = useMemo(() => {
		if (!allMessages.length) {
			return { players: [] as string[], bots: [] as string[] }
		}

		let lastRoundStartIndex = -1

		for (let i = allMessages.length - 1; i >= 0; i -= 1) {
			const message = allMessages[i]

			if (
				isServerMessage(message) &&
				message.message === gameConfig.WINNING_NUMBER_CREATED_MESSAGE
			) {
				lastRoundStartIndex = i
				break
			}
		}

		const roundMessages = allMessages.slice(lastRoundStartIndex + 1)
		const players = new Set<string>()
		const bots = new Set<string>()

		roundMessages.forEach((m) => {
			if (isServerMessage(m) || isInfoMessage(m)) {
				return
			}

			if (BOT_NAMES.includes(m.userName)) {
				bots.add(m.userName)
			} else {
				players.add(m.userName)
			}
		})

		return { players: Array.from(players), bots: Array.from(bots) }
	}, [allMessages])

	const lastResult = useMemo(() => {
		if (!allMessages.length) {
			return null
		}

		const serverMessages = [...allMessages].reverse().filter((m) => isServerMessage(m))

		for (const m of serverMessages) {
			const text = String(m.message)

			if (!text.includes('Загаданное число:')) {
				continue
			}

			const match = /Загаданное число:\s*(\d+)[\s\S]*?Победил игрок\s+(.+?)\s+с числом:\s*(\d+)/.exec(
				text
			)

			if (!match) {
				continue
			}

			return {
				winningNumber: Number(match[1]),
				winnerName: match[2],
				winnerNumber: Number(match[3]),
			}
		}

		return null
	}, [allMessages])

	const phaseInfo: PhaseInfo = useMemo(() => {
		if (!lastServerMessage) {
			return {
				title: 'Ожидаем начало раунда',
				description:
					'Как только сервер запустит игру, вы увидите уведомление и таймер раунда.',
				variant: 'idle',
			}
		}

		const text = String(lastServerMessage.message)

		if (text === gameConfig.GREETING_MESSAGE) {
			return {
				title: 'Игра уже идёт',
				description:
					'Сервер загадал число. Введите своё число внизу и попробуйте попасть как можно точнее.',
				variant: 'running',
			}
		}

		if (text === gameConfig.WINNING_NUMBER_CREATED_MESSAGE) {
			return {
				title: 'Новое число загадано',
				description:
					'Начался новый раунд. Введите своё число — у вас ограниченное время до объявления победителя.',
				variant: 'running',
			}
		}

		if (text === gameConfig.NO_PLAYERS_MESSAGE) {
			return {
				title: 'В прошлом раунде не было попыток',
				description:
					'Никто не сделал ни одной попытки. В следующем раунде попробуйте ввести число первым.',
				variant: 'noPlayers',
			}
		}

		if (text.includes('Загаданное число:')) {
			return {
				title: 'Раунд завершён',
				description:
					'Сервер объявил загаданное число и победителя. Скоро начнётся новый раунд.',
				variant: 'finished',
			}
		}

		return {
			title: 'Игра продолжается',
			description:
				'Сервер принимает новые числа. Чем точнее ваша интуиция, тем выше шанс победы.',
			variant: 'running',
		}
	}, [lastServerMessage])

	const statusBadgeClass =
		phaseInfo.variant === 'running'
			? classes.statusBadgeRunning
			: phaseInfo.variant === 'finished'
			? classes.statusBadgeFinished
			: classes.statusBadgeIdle

	const timerActive = timeLeft !== null && timeLeft >= 0
	const timerValueClass = [
		classes.timerValue,
		!timerActive ? classes.timerInactive : undefined,
		timerActive && timeLeft !== null && timeLeft <= 10
			? classes.timerDanger
			: undefined,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={classes.card}>
			{banner && (
				<div
					className={
						banner.variant === 'roundStart'
							? classes.bannerRoundStart
							: banner.variant === 'roundResult'
							? classes.bannerResult
							: classes.bannerInfo
					}
				>
					<span className={classes.bannerIcon}>
						{banner.variant === 'roundStart'
							? '⚡'
							: banner.variant === 'roundResult'
							? '🏆'
							: banner.variant === 'noPlayers'
							? '…'
							: '★'}
					</span>
					<span className={classes.bannerText}>{banner.text}</span>
				</div>
			)}
			<div className={classes.headerRow}>
				<div>
					<h2 className={classes.title}>{phaseInfo.title}</h2>
					<p className={classes.description}>{phaseInfo.description}</p>
				</div>
				<div className={statusBadgeClass}>
					{phaseInfo.variant === 'running'
						? 'Раунд идёт'
						: phaseInfo.variant === 'finished'
						? 'Раунд завершён'
						: phaseInfo.variant === 'noPlayers'
						? 'Нет игроков'
						: 'Ожидание'}
				</div>
			</div>

			<div className={classes.bodyRow}>
				<div className={classes.timerPill}>
					<span className={classes.timerLabel}>До объявления победителя</span>
					<span className={timerValueClass}>
						{timerActive && timeLeft !== null ? `${timeLeft} сек` : '—'}
					</span>
				</div>

				<div className={classes.playersRow}>
					<span className={classes.playersTitle}>Участники текущего раунда</span>
					<div className={classes.playersBadges}>
						<span className={classes.playerBadgeHighlight}>
							Игроков: {players.length}
						</span>
						<span className={classes.playerBadge}>
							Ботов: {bots.length}
						</span>
						{players.map((player) => (
							<span key={player} className={classes.playerBadge}>
								{player}
							</span>
						))}
						{bots.map((bot) => (
							<span key={bot} className={classes.playerBadge}>
								{bot}
							</span>
						))}
					</div>
				</div>
			</div>

			{lastResult && (
				<div className={classes.resultBlock}>
					<div className={classes.resultTitle}>Последний результат раунда</div>
					<div className={classes.resultRow}>
						<div>
							<div className={classes.resultNumber}>
								Загаданное число: {lastResult.winningNumber}
							</div>
						</div>
						<div>
							<div className={classes.resultWinner}>
								Победитель: {lastResult.winnerName}
							</div>
							<div className={classes.resultSub}>
								Его число: {lastResult.winnerNumber}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

