import { getRemainingSeconds, getResultMessage } from "@utils/commonUtils"

export const socketEvents = {
  RECEIVE_MESSAGE: "receive-message",
  SEND_MESSAGE: "send-message",
}

export const SOCKET_URL = "/api/socket"

export const gameConfig = {
  INFO_MESSAGE_NAME: ". . . ",
  SERVER_NAME: "SERVER",
  GAME_DURATION: 60 * 1000,
  MIN_RANDOM_NUMBER: 0,
  MAX_RANDOM_NUMBER: 100,
  GREETING_MESSAGE: "Добро пожаловать! Число уже загадано, попытайтесь отгадать...",
  NO_PLAYERS_MESSAGE: "Никто не попытался отгадать...(ง ͠ಥ_ಥ)ง",
  WINNING_NUMBER_CREATED_MESSAGE: `Новое число от 0 до 100 загадано!`,
  GET_RESULT_MESSAGE: ({ winningNumber, winningMessage }) => getResultMessage({ winningNumber, winningMessage }),
  GET_REMAINING_SECONDS: ({ nextResultDate }) => getRemainingSeconds({ nextResultDate }),
}
