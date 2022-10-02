import React, { useContext, useState } from "react";
import UserContext from "../../userContext";
import "./TextInput.css";

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
    <div className="text-input">
      <form className="text-input__form" onSubmit={handleSubmit}>
        <div className="text-input__user">{user}:</div>
        <input
          className="text-input__input"
          placeholder="your message goes here ;)"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="text-input__button" type="submit">
          {">"}
        </button>
      </form>
    </div>
  );
};
export default TextInput;
