import React, { useContext, useState } from "react";
import UserContext from "../../userContext";
import "./TextInput.css";

const TextInput = ({ sendMessage }) => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setAlert(true);
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
          onChange={(e) => {
            setAlert(false);
            setText(e.target.value);
          }}
        />
        <button className="text-input__button" type="submit">
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
