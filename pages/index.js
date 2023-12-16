import {
  SOCKET_URL,
  gameConfig,
  socketEvents,
} from "@constants/commonConstants";
import { getRandomIntInRange } from "@utils/commonUtils";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(
    `Great Intuit(${getRandomIntInRange({ min: 1, max: 999 })})`
  );
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch(SOCKET_URL);

    socket = io();

    socket.on(socketEvents.RECEIVE_MESSAGE, (data) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("emitted");

    socket.emit(socketEvents.SEND_MESSAGE, {
      username,
      message,
    });
    setMessage("");
  }

  return (
    <div className="main">
      <div className="mainWrapper">
        <div className="mainInner">
          <div className="name">
            <h1 className="nameTitle">Great Intuition the Game</h1>
          </div>

          <div className="username">
            <h2 className="usernameSubtitle">
              {"Ваш ник (можно ввести свой):"}
            </h2>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="window">
            <ul className="windowChat">
              {allMessages.map(({ username, message }, index) => (
                <li key={index} className="message">
                  {username}: {message}
                </li>
              ))}
            </ul>

            <form className="form" onSubmit={handleSubmit}>
              <input
                className="inputMessage"
                disabled={!username}
                name="message"
                placeholder="введите своё число"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete={"off"}
                type="number"
                size={3}
              />
              <button
                className="submitButton"
                type="submit"
                disabled={!username || !message}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="rules">
        <h2>Правила</h2>
        <p className="rulesParagraph">Введи свой ник</p>
        <p className="rulesParagraph">Загадай число</p>
        <p className="rulesParagraph">Соревнуйся с другими игроками</p>
        <p className="rulesParagraph">Используй интуицию</p>
        <p className="rulesParagraph">{`Раунд длиться ${
          gameConfig.GAME_DURATION / 1000
        } секунд`}</p>
      </div>
      <div className="Leaderboard">
        <h2>Таблица лидеров</h2>
        <p>@Supernova5007</p>
        <p>Alex76456</p>
      </div>
    </div>
  );
};

export default Home;
