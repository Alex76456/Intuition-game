import { gameConfig, socketEvents } from "@constants/commonConstants"
import { getRandomIntInRange, getWinningMessage } from "@utils/commonUtils"
import { Server } from "socket.io"

const state = { messages: [] }

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up")
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on("connection", (socket) => {
    socket.on(socketEvents.SEND_MESSAGE, (obj) => {
      state.messages = [...state.messages, obj]
      io.emit(socketEvents.RECEIVE_MESSAGE, obj)
    })
  })

  setInterval(() => {
    if (!state.messages.length) {
      io.emit(socketEvents.RECEIVE_MESSAGE, {
        username: gameConfig.SERVER_NAME,
        message: gameConfig.NO_PLAYERS_MESSAGE,
      })
      return
    }

    const winningNumber = getRandomIntInRange({ min: gameConfig.MIN_RANDOM_NUMBER, max: gameConfig.MAX_RANDOM_NUMBER })
    const winningMessage = getWinningMessage({ winningNumber, messages: state.messages })

    state.messages = []

    io.emit(socketEvents.RECEIVE_MESSAGE, {
      username: gameConfig.SERVER_NAME,
      message: gameConfig.GET_RESULT_MESSAGE({ winningNumber, winningMessage }),
    })
  }, gameConfig.GAME_DURATION)

  console.log("Setting up socket")
  res.end()
}
