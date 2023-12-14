import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const Home = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch('/api/socket');

    socket = io();

    socket.on('receive-message', (data) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('emitted');

    socket.emit('send-message', {
      username,
      message,
    });
    setMessage('');
  }

  return (
    <div className="main">
      <div className="mainWrapper">
        <div className="mainInner">
          <div className="name">
            <h1 className="nameTitle">Great Intuition the Game</h1>
          </div>

          <div className="username">
            <h2 className="usernameSubtitle">Enter a username</h2>
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
                placeholder="enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete={'off'}
                type="number"
                size={3}
              />
              <button className="submitButton" type="submit" disabled={!username}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="rules">
        <h2>Правила</h2>
      </div>
      <div className="Leaderboard">
        <h2>Таблица лидеров</h2>
      </div>
    </div>
  );
};

export default Home;
