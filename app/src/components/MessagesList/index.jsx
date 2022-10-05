import React from "react";
import Message from "./Message";
import "./MessagesList.css";

const MessagesList = ({ messages }) => (
  <div className="messages-list">
    {!messages.length ? (
      <div className="messages-list__empty-message">no messages yet!</div>
    ) : (
      messages.map((message, index) => (
        // First message is the latest one
        <Message key={message.id} message={message} highlighted={index === 0} />
      ))
    )}
  </div>
);

export default MessagesList;
