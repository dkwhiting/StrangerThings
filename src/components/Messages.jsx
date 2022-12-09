import "./Messages.css";
import React, { useState } from "react";

const Messages = ({ sentMessages, recievedMessages }) => {
  const [toggleView, setToggleView] = useState(true);

  return (
    <div className="messages">
      <h2>Messages</h2>
      <div>
        <div className="messages-header">
          <button onClick={() => setToggleView(true)}>Recieved</button>
          <button onClick={() => setToggleView(false)}>Sent</button>
        </div>
        <div className='sort-bar'>
          <div className="sort-user">User</div>
          <div className="sort-description">Description</div>
        </div>
        <div className="all-messages">
          {
            toggleView
              ? recievedMessages.map((message, i) => {
                return (
                  <div className="single-message" key={i}>
                    <div className="message-username">{message.fromUser.username}</div>
                    <div className="message-content">{message.content}</div>
                  </div>
                )
              })
              : sentMessages.map((message, i) => {
                return (
                  <div className="single-message" key={i}>
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