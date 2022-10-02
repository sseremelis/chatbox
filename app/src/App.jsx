import { Fragment, useState } from "react";
import "./App.css";
import MessagesList from "./components/MessagesList";
import UserContext from "./userContext";
import UsernamePrompt from "./components/UsernamePrompt";
import TextInput from "./components/TextInput";

const initialMessages = localStorage.getItem("messages");
const App = () => {
  const [user, setUserState] = useState(sessionStorage.getItem("user"));
  const [messages, setMessages] = useState(
    initialMessages ? JSON.parse(initialMessages) : []
  );

  const setUser = (user) => {
    sessionStorage.setItem("user", user);
    setUserState(user);
  };

  const sendMessage = (message) => {
    const updatedMessages = [...messages];
    updatedMessages.unshift(message);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <h1>chat.exe</h1>
      {user ? (
        <Fragment>
          <MessagesList messages={messages} />
          <TextInput sendMessage={sendMessage} />
        </Fragment>
      ) : (
        <UsernamePrompt />
      )}
    </UserContext.Provider>
  );
};

export default App;
