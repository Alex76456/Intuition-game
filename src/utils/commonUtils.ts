import {
	APP_ID,
	APP_NAME,
	BOT_NAMES,
	gameConfig,
} from '@constants/commonConstants'
import {
	CommonStatisticType,
	MessageType,
	ServerStateType,
} from '@allTypes/commonTypes'
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from 'firebase/firestore'

import { db } from 'db/firebase'

export const getRandomIntInRange = ({
	min,
	max,
}: {
	min: number
	max: number
}) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const getNumbersDifference = (num1: number, num2: number) => {
	return Math.abs(num1 - num2)
}

const getSortedMessagesByWinning = ({
	messages,
	winningNumber,
}: {
	messages: MessageType[]
	winningNumber: number
}) =>
	messages.sort(
		(a, b) =>
			getNumbersDifference(Number(a.message), winningNumber) -
			getNumbersDifference(Number(b.message), winningNumber)
	)

export const getWinningMessage = ({
	messages,
	winningNumber,
}: {
	messages: MessageType[]
	winningNumber: number
}) => {
	const sortedMessagesByWinning = getSortedMessagesByWinning({
		messages,
		winningNumber,
	})

	return sortedMessagesByWinning[0]
}

export const getResultMessage = ({
	winningNumber,
	winningMessage,
}: {
	winningMessage: MessageType
	winningNumber: number
}) => {
	const winBet = typeof winningMessage.bet === 'number' && winningMessage.bet > 0 ? winningMessage.bet : 0
	const winAmount = winBet * 2
	const winLine =
		winAmount > 0
			? `\n Сумма выигрыша: ${winAmount} монет`
			: ''
	return `Загаданное число: ${winningNumber} \n Победил игрок ${winningMessage.userName} с числом: ${winningMessage.message} ヽ༼ ʘ̚ل͜ʘ̚༽ﾉ${winLine}`
}

export const getRemainingSeconds = ({
	nextResultDate,
}: {
	nextResultDate: number
}) => {
	const diffSeconds = Math.floor((nextResultDate - Date.now()) / 1000)
	const safeSeconds = diffSeconds < 0 ? 0 : diffSeconds

	return `* ${safeSeconds} сек до объявления победителя *`
}

export const getRemainingSecondsNumber = (nextResultDate: number): number => {
	const diffSeconds = Math.floor((nextResultDate - Date.now()) / 1000)
	return diffSeconds < 0 ? 0 : diffSeconds
}

export const getRandomBotMessage = () => {
	const number = getRandomIntInRange({
		min: gameConfig.MIN_RANDOM_NUMBER,
		max: gameConfig.MAX_RANDOM_NUMBER,
	})

	const newBotMessage = {
		userName:
			BOT_NAMES[
				getRandomIntInRange({
					min: 0,
					max: BOT_NAMES.length - 1,
				})
			],
		message: number,
		bet: number,
	}

	return newBotMessage
}

export const getAccurace = ({
	winningNumber,
	number,
}: {
	number: number
	winningNumber: number
}) => {
	const costOfOnePercent =
		(gameConfig.MAX_RANDOM_NUMBER - gameConfig.MIN_RANDOM_NUMBER) / 100

	const accurace =
		100 - Math.round(Math.abs(winningNumber - number) / costOfOnePercent)

	if (accurace > 100) {
		return 100
	} else if (accurace < 0) {
		return 1
	} else {
		return accurace
	}
}

export const getAverageNumber = (numbers: number[]) => {
	return numbers.reduce((acc, cur) => acc + cur, 0)
}

export const getUpdatedStatistic = ({
	winningNumber,
	startStatistic,
	messages,
	winningMessage,
}: {
	winningNumber: number
	startStatistic: CommonStatisticType
	messages: MessageType[]
	winningMessage: MessageType
}) => {
	const statistic = messages.reduce((acc, cur) => {
		const newAccuracyRecord = getAccurace({
			winningNumber,
			number: Number(cur.message),
		})
		const difference = getNumbersDifference(
			winningNumber,
			Number(cur.message)
		)
		const isWinner = cur.userName === winningMessage.userName
		const bet = typeof cur.bet === 'number' && cur.bet > 0 ? cur.bet : 0

		if (acc.hasOwnProperty(cur.userName)) {
			const userRecord = acc[cur.userName]
			const newAccuracyRecords = [
				...userRecord.accuracyRecords,
				newAccuracyRecord,
			]
			const newNumbersSuggested = userRecord.numbersSuggested + 1
			const winStreak = isWinner
				? (userRecord.winStreak ?? 0) + 1
				: 0
			const currentCoins = userRecord.coins ?? 0
			const newCoins = currentCoins - bet + (isWinner ? bet * 2 : 0)
			const bestDifference =
				userRecord.bestDifference !== undefined
					? Math.min(userRecord.bestDifference, difference)
					: difference

			return {
				...acc,
				[cur.userName]: {
					...userRecord,
					averageAccuracy: Math.round(
						getAverageNumber(newAccuracyRecords) / newNumbersSuggested
					),
					wins: userRecord.wins + (isWinner ? 1 : 0),
					numbersSuggested: userRecord.numbersSuggested + 1,
					accuracyRecords: newAccuracyRecords,
					winStreak,
					coins: newCoins,
					bestDifference,
				},
			}
		} else {
			const baseCoins = 100
			const newCoins = baseCoins - bet + (isWinner ? bet * 2 : 0)

			return {
				...acc,
				[cur.userName]: {
					averageAccuracy: newAccuracyRecord,
					wins: isWinner ? 1 : 0,
					numbersSuggested: 1,
					gamesPlayed: 0,
					accuracyRecords: [newAccuracyRecord],
					winStreak: isWinner ? 1 : 0,
					coins: newCoins,
					bestDifference: difference,
				},
			}
		}
	}, startStatistic)

	new Set(messages.map((mess) => mess.userName)).forEach((name) => {
		statistic[name].gamesPlayed++
		if (name !== winningMessage.userName && statistic[name].winStreak !== undefined) {
			statistic[name].winStreak = 0
		}
	})

	return statistic
}

const getStartOfToday = () => {
	const now = new Date()
	now.setHours(0, 0, 0, 0)
	return now.getTime()
}

export const applyDailyCoinsRefill = (statistic: CommonStatisticType) => {
	const startOfToday = getStartOfToday()

	Object.keys(statistic).forEach((name) => {
		const userRecord = statistic[name]
		const lastRefillDate = userRecord.lastRefillDate ?? 0

		if (lastRefillDate < startOfToday) {
			const currentCoins = userRecord.coins ?? 0
			statistic[name] = {
				...userRecord,
				coins: currentCoins + 100,
				lastRefillDate: startOfToday,
			}
		}
	})

	return statistic
}

export const setStatisticToDB = async (newStatistic: CommonStatisticType) => {
	try {
		const dbRef = doc(db, APP_NAME, APP_ID)
		const dbData = await getDoc(dbRef)

		if (!dbData.exists()) {
			const dbRef = doc(db, APP_NAME, APP_ID)

			await setDoc(dbRef, newStatistic)
		} else {
			await updateDoc(dbRef, newStatistic)
		}
	} catch (error) {
		console.log('Ошибка при загрузке данных в Firestore:', error)
		return
	}
}

export const getStartStatisticFromDB = async (serverState: ServerStateType) => {
	const roomsCollection = collection(db, APP_NAME)

	try {
		const roomsSnapshot = await getDocs(roomsCollection)
		const statisticDB = roomsSnapshot.docs[0].data()

		serverState.statistic = statisticDB
	} catch (error) {
		console.error('Ошибка при зарузке игроков из Firestore:', error)
	}
}
