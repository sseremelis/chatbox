import React, { useContext, useState } from "react";
import UserContext from "../../userContext";

const UsernamePrompt = () => {
  const [name, setName] = useState("");
  const { setUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      What username do you want to use?
      <input type="text" onChange={(e) => setName(e.target.value)}></input>
    </form>
  );
};

export default UsernamePrompt;
