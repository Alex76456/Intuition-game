import { getResultMessage } from "@utils/commonUtils"

export const socketEvents = {
  RECEIVE_MESSAGE: "receive-message",
  SEND_MESSAGE: "send-message",
}

export const SOCKET_URL = "/api/socket"

export const gameConfig = {
  SERVER_NAME: "SERVER",
  GAME_DURATION: 30 * 1000,
  MIN_RANDOM_NUMBER: 0,
  MAX_RANDOM_NUMBER: 100,
  NO_PLAYERS_MESSAGE: "Ожидаем игроков...",
  GET_RESULT_MESSAGE: getResultMessage,
}
