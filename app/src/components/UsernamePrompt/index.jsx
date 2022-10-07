import React, { useContext, useState } from "react";
import UserContext from "../../userContext";
import "./index.css";

const UsernamePrompt = () => {
  const [name, setName] = useState("");
  const { setUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(name);
  };

  return (
    <form className="username-prompt" onSubmit={handleSubmit}>
      what's your username ?
      <input
        className="username-prompt__input"
        placeholder="don't be shy"
        type="text"
        onChange={(e) => setName(e.target.value)}
        data-testid="usernamePrompt-input"
      ></input>
    </form>
  );
};

export default UsernamePrompt;
