import React, { useContext, useState } from "react";
import UserContext from "../../userContext";

const TextInput = ({ sendMessage }) => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Add some text to your message");
      return;
    }
    sendMessage({ username: user, timestamp: new Date(), text });
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      {user}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};
export default TextInput;
