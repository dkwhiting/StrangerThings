import "./Messages.css";
import React, { useEffect, useState } from "react";
import { fetchMe } from "../api/auth";
import UserPosts from "./posts/UserPosts";

const Messages = ({ token, user }) => {
  const [toggleView, setToggleView] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([])
  const [recievedMessages, setRecievedMessages] = useState([])


  useEffect(() => {
    try {
      const getAllMessages = async () => {
        const data = await fetchMe(token)
        setAllMessages(data.data.messages)
      }
      if (token) {
        getAllMessages();
      }
      setSentMessages(allMessages.filter((message) => message.fromUser._id == user._id))
      setRecievedMessages(allMessages.filter((message) => message.fromUser._id != user._id))
      console.log(allMessages)
      console.log(recievedMessages)
    } catch (error) {
      console.log(error)
    }
  }, [token])

  return (
    <div className="messages">
      <h2>Messages</h2>
      <div>
        <div className="messages-header">
          <button onClick={() => setToggleView(true)}>Recieved</button>
          <button onClick={() => setToggleView(false)}>Sent</button>
        </div>
        <div className="all-messages">
          {
            toggleView
              ? recievedMessages.map((message) => {
                return (
                  <div className="single-message">
                    <div className="message-username">{message.fromUser.username}</div>
                    <div className="message-content">{message.content}</div>
                  </div>
                )
              })
              : sentMessages.map((message) => {
                return (
                  <div className="single-message">
                    <div className="message-username">{message.fromUser.username}</div>
                    <div className="message-content">{message.content}</div>
                  </div>
                )
              })
          }
        </div>

      </div>
    </div>
  )
}

export default Messages;