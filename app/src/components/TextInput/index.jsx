import React, { useContext, useRef, useState } from "react";
import UserContext from "../../userContext";
import "./TextInput.css";

const TextInput = ({ sendMessage, editMessage, lastUserMessage }) => {
  const { user } = useContext(UserContext);
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setAlert(true);
      return;
    }
    if (edit) {
      editMessage({ text, id: lastUserMessage.id });
      setEdit(false);
    } else {
      sendMessage({ username: user, timestamp: new Date(), text });
    }
    setText("");
  };

  const handleKeyUp = (e) => {
    if (e.key !== "ArrowUp" || !lastUserMessage) return;
    setText(lastUserMessage.text);
    setEdit(true);
    const textEnd = lastUserMessage.text.length;
    // Move cursor to the end of the input field
    inputRef.current.setSelectionRange(textEnd, textEnd);
  };

  return (
    <div className="text-input">
      <form className="text-input__form" onSubmit={handleSubmit}>
        <div className="text-input__user">{user}:</div>
        <input
          ref={inputRef}
          className="text-input__input"
          placeholder="your message goes here ;)"
          type="text"
          value={text}
          onChange={(e) => {
            setAlert(false);
            setText(e.target.value);
          }}
          onKeyUp={handleKeyUp}
          data-testid="text-input"
        />
        <button
          className="text-input__button"
          type="submit"
          data-testid="text-input-button"
        >
          {">"}
        </button>
        {alert && (
          <div className="text-input__alert">
            {"you can't send an empty message >_<"}
          </div>
        )}
      </form>
    </div>
  );
};
export default TextInput;
