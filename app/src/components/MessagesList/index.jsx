import React from "react";
import Message from "./Message";
import "./MessagesList.css";

const MessagesList = ({ messages }) => (
  <div className="messages-list">
    {messages.map((message, index) => (
      <Message key={index} message={message} />
    ))}
  </div>
);

export default MessagesList;
