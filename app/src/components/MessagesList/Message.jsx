import React, { useContext } from "react";
import UserContext from "../../userContext";
import "./Message.css";

const Message = ({
  message: { username, timestamp, text, id },
  highlighted,
  deleteMessage,
}) => {
  const { user } = useContext(UserContext);

  const time = new Date(timestamp);
  const formattedHours = time.getHours().toString().padStart(2, "0");
  const formattedMinutes = time.getMinutes().toString().padStart(2, "0");
  const formattedTimestamp = `${formattedHours}:${formattedMinutes}`;

  const isUserMessage = username === user;

  return (
    <div
      className={`message 
        ${isUserMessage ? "message--right" : ""}
        ${highlighted && !isUserMessage ? "message--highlighted" : ""}
    `}
    >
      <div className="message__info">
        {isUserMessage && (
          <button
            type="button"
            className="button--reset message__delete"
            onClick={() => deleteMessage(id)}
          >
            Delete message
          </button>
        )}
        <span className="message__time">{formattedTimestamp}</span>
        <span className="message__username">{username}</span>
      </div>
      {text}
    </div>
  );
};

export default Message;
