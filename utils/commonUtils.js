export const getRandomIntInRange = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const getNumbersDifference = (num1, num2) => {
  return Math.abs(num1 - num2)
}

const getSortedMessagesByWinning = ({ messages, winningNumber }) =>
  messages.sort(
    (a, b) => getNumbersDifference(a.message, winningNumber) - getNumbersDifference(b.message, winningNumber),
  )

export const getWinningMessage = ({ messages, winningNumber }) => {
  const sortedMessagesByWinning = getSortedMessagesByWinning({ messages, winningNumber })

  return sortedMessagesByWinning[0]
}

export const getResultMessage = ({ winningNumber, winningMessage }) => {
  return `Загаданное число: ${winningNumber} \n Победил игрок ${winningMessage.username} с числом: ${winningMessage.message}`
}
