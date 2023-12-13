import React, { useEffect, useState } from "react"
import io from "socket.io-client"

let socket

const Home = () => {
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")
  const [allMessages, setAllMessages] = useState([])

  useEffect(() => {
    socketInitializer()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function socketInitializer() {
    await fetch("/api/socket")

    socket = io()

    socket.on("receive-message", (data) => {
      setAllMessages((pre) => [...pre, data])
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log("emitted")

    socket.emit("send-message", {
      username,
      message,
    })
    setMessage("")
  }

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "30px", padding: "100px" }}>
      <h1>Mind game</h1>
      <h1>Enter a username</h1>

      <input style={{ border: "3px solid black" }} value={username} onChange={(e) => setUsername(e.target.value)} />

      <div style={{ padding: "5px", border: "1px solid gray", maxHeight: "300px", minHeight: "100px" }}>
        <ul>
          {allMessages.map(({ username, message }, index) => (
            <li key={index} style={{ listStyle: "none" }}>
              {username}: {message}
            </li>
          ))}
        </ul>

        <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
          <input
            disabled={!username}
            name="message"
            placeholder="enter your message"
            style={{ width: "500px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  )
}

export default Home
