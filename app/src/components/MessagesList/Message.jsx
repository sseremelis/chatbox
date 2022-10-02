import React, { useContext } from "react";
import UserContext from "../../userContext";
import "./Message.css";

const Message = ({ message: { username, timestamp, text } }) => {
  const { user } = useContext(UserContext);

  const time = new Date(timestamp);
  const formattedTimestamp = `${time.getHours()}:${time.getMinutes()}`;

  const isUserMessage = username === user;
  return (
    <div className={`message ${isUserMessage ? "message--right" : ""}`}>
      <div className="message__info">
        <span className="message__time">{formattedTimestamp}</span>
        <span className="message__username">{username}</span>
      </div>
      {text}
    </div>
  );
};

export default Message;
