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
			getNumbersDifference(a.message, winningNumber) -
			getNumbersDifference(b.message, winningNumber)
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
	return `Загаданное число: ${winningNumber} \n Победил игрок ${winningMessage.userName} с числом: ${winningMessage.message} ヽ༼ ʘ̚ل͜ʘ̚༽ﾉ`
}

export const getRemainingSeconds = ({
	nextResultDate,
}: {
	nextResultDate: number
}) => {
	return `* ${Math.floor(
		(nextResultDate - Date.now()) / 1000
	)} сек до объявления победителя *`
}

export const getRandomBotMessage = () => {
	const newBotMessage = {
		userName:
			BOT_NAMES[
				getRandomIntInRange({
					min: 0,
					max: BOT_NAMES.length - 1,
				})
			],
		message: getRandomIntInRange({
			min: gameConfig.MIN_RANDOM_NUMBER,
			max: gameConfig.MAX_RANDOM_NUMBER,
		}),
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
			number: cur.message,
		})

		if (acc.hasOwnProperty(cur.userName)) {
			const userRecord = acc[cur.userName]
			const newAccuracyRecords = [
				...userRecord.accuracyRecords,
				newAccuracyRecord,
			]
			const newNumbersSuggested = userRecord.numbersSuggested + 1

			return {
				...acc,
				[cur.userName]: {
					averageAccuracy: Math.round(
						getAverageNumber(newAccuracyRecords) / newNumbersSuggested
					),
					wins: userRecord.wins,
					numbersSuggested: userRecord.numbersSuggested + 1,
					gamesPlayed: userRecord.gamesPlayed,
					accuracyRecords: newAccuracyRecords,
				},
			}
		} else {
			return {
				...acc,
				[cur.userName]: {
					averageAccuracy: newAccuracyRecord,
					wins: 0,
					numbersSuggested: 1,
					gamesPlayed: 0,
					accuracyRecords: [newAccuracyRecord],
				},
			}
		}
	}, startStatistic)

	new Set(messages.map((mess) => mess.userName)).forEach((name) => {
		statistic[name].gamesPlayed++
	})

	statistic[winningMessage.userName].wins++

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
