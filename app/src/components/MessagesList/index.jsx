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
        <Message key={index} message={message} />
      ))
    )}
  </div>
);

export default MessagesList;
