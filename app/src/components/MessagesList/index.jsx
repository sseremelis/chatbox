import React from "react";
import Message from "./Message";

const MessagesList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <Message key={index} message={message} />
    ))}
  </div>
);

export default MessagesList;
