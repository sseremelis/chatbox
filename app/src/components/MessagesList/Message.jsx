import React, { useContext } from "react";
import UserContext from "../../userContext";

const Message = ({ message: { username, timestamp, text } }) => {
  const { user } = useContext(UserContext);

  const time = new Date(timestamp);
  const formattedTimestamp = `${time.getHours()}:${time.getMinutes()}`;

  const isUserMessage = username === user;
  return (
    <div className={isUserMessage ? "right-message" : ""}>
      <div>
        {formattedTimestamp} {username}
      </div>
      {text}
    </div>
  );
};

export default Message;
