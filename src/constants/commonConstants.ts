import { MessageType } from '@allTypes/commonTypes'
import { getRemainingSeconds, getResultMessage } from '@utils/commonUtils'

export const APP_NAME = 'intuitionGame'

export const APP_ID = '76456'

export const LOCAL_STORAGE_USER_NAME_KEY = `${APP_NAME}_userName`

export const socketEvents = {
	RECEIVE_MESSAGE: 'receive-message',
	SEND_MESSAGE: 'send-message',
	STATISTIC_MESSAGE: 'statistic-message',
	TIME_LEFT: 'time-left',
	ROUND_RESULT: 'round-result',
	SYNC_STATE: 'sync-state',
}

export const SOCKET_URL = '/api/socket'

export const BOT_NAMES = [
	'BotMan',
	/*  "CheloBot",
  "BotChel", */
	'NeBot',
	/* "RoBotnick",
  "RoBot",
  "ZaBotLivy",
  "Botan",
  "Botkins",
  "BotBorod", */
	'Botusha',
	'BotRutdinov',
	'BotJamesBot',
]

export const gameConfig = {
	INFO_MESSAGE_NAME: '. . . ',
	SERVER_NAME: 'SERVER',

	GAME_DURATION: 60 * 1000,
	MIN_RANDOM_NUMBER: 0,
	MAX_RANDOM_NUMBER: 100,
	FREQUENCY_BOT_MESSAGES: { min: 20, max: 40 },

	GREETING_MESSAGE:
		'Добро пожаловать! Число уже загадано, попытайтесь отгадать...',
	NO_PLAYERS_MESSAGE: 'Никто не попытался отгадать...(ง ͠ಥ_ಥ)ง',
	WINNING_NUMBER_CREATED_MESSAGE: `Новое число от 0 до 100 загадано!`,

	GET_RESULT_MESSAGE: ({
		winningNumber,
		winningMessage,
	}: {
		winningMessage: MessageType
		winningNumber: number
	}) => getResultMessage({ winningNumber, winningMessage }),
	GET_REMAINING_SECONDS: ({ nextResultDate }: { nextResultDate: number }) =>
		getRemainingSeconds({ nextResultDate }),
}

export const RULES = [
	'Цель игры — угадать число от 0 до 100, которое загадывает сервер. Чем ближе ваше число к загаданному, тем лучше.',
	'В каждом раунде вы вводите одно число и ставку в монетах. Без монет участвовать в раунде нельзя.',
	'Монеты: при выигрыше ставка удваивается (возврат ставки плюс такой же выигрыш). При проигрыше ставка списывается полностью.',
	'Каждый день баланс монет пополняется на 100. Новым игрокам доступны монеты для первых ставок.',
	'Раунд длится 60 секунд. За это время все желающие отправляют число и ставку. По истечении времени объявляется загаданное число и победитель — тот, чьё число оказалось ближе всего к загаданному.',
	'Соревнуйтесь с другими игроками и ботами. Используйте интуицию и следите за статистикой в таблице лидеров.',
]
