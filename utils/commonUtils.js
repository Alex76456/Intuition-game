import { BOT_NAMES, gameConfig } from "@constants/commonConstants";

export const getRandomIntInRange = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getNumbersDifference = (num1, num2) => {
  return Math.abs(num1 - num2);
};

const getSortedMessagesByWinning = ({ messages, winningNumber }) =>
  messages.sort(
    (a, b) =>
      getNumbersDifference(a.message, winningNumber) -
      getNumbersDifference(b.message, winningNumber)
  );

export const getWinningMessage = ({ messages, winningNumber }) => {
  const sortedMessagesByWinning = getSortedMessagesByWinning({
    messages,
    winningNumber,
  });

  return sortedMessagesByWinning[0];
};

export const getResultMessage = ({ winningNumber, winningMessage }) => {
  return `Загаданное число: ${winningNumber} \n Победил игрок ${winningMessage.username} с числом: ${winningMessage.message} ヽ༼ ʘ̚ل͜ʘ̚༽ﾉ`;
};

export const getRemainingSeconds = ({ nextResultDate }) => {
  return `* ${Math.floor(
    (nextResultDate - Date.now()) / 1000
  )} сек до объявления победителя *`;
};

export const getRandomBotMessage = () => {
  const newBotMessage = {
    username:
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
  };

  return newBotMessage;
};

export const getAccurace = ({ winningNumber, number }) => {
  const costOfOnePercent =
    (gameConfig.MAX_RANDOM_NUMBER - gameConfig.MIN_RANDOM_NUMBER) / 100;

  const accurace =
    100 - Math.round(Math.abs(winningNumber - number) / costOfOnePercent);

  if (accurace > 100) {
    return 100;
  } else if (accurace < 0) {
    return 1;
  } else {
    return accurace;
  }
};

export const getAverageNumber = (numbers) => {
  return numbers.reduce((acc, cur) => acc + cur, 0);
};

export const getUpdatedStatistic = ({
  winningNumber,
  startStatistic,
  messages,
  winningMessage,
}) => {
  const statistic = messages.reduce((acc, cur) => {
    const newAccuracyRecord = getAccurace({
      winningNumber,
      number: cur.message,
    });

    if (acc.hasOwnProperty(cur.username)) {
      const userRecord = acc[cur.username];
      const newAccuracyRecords = [
        ...userRecord.accuracyRecords,
        newAccuracyRecord,
      ];
      const newNumbersSuggested = userRecord.numbersSuggested + 1;

      return {
        ...acc,
        [cur.username]: {
          averageAccuracy: Math.round(
            getAverageNumber(newAccuracyRecords) / newNumbersSuggested
          ),
          wins: userRecord.wins,
          numbersSuggested: userRecord.numbersSuggested + 1,
          gamesPlayed: userRecord.gamesPlayed,
          accuracyRecords: newAccuracyRecords,
        },
      };
    } else {
      return {
        ...acc,
        [cur.username]: {
          averageAccuracy: newAccuracyRecord,
          wins: 0,
          numbersSuggested: 1,
          gamesPlayed: 0,
          accuracyRecords: [newAccuracyRecord],
        },
      };
    }
  }, startStatistic);

  new Set(messages.map((mess) => mess.username)).forEach((name) => {
    statistic[name].gamesPlayed++;
  });

  statistic[winningMessage.username].wins++;

  return statistic;
};
