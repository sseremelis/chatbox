import { Fragment, useState } from "react";
import "./App.css";
import MessagesList from "./components/MessagesList";
import UserContext from "./userContext";
import UsernamePrompt from "./components/UsernamePrompt";
import TextInput from "./components/TextInput";

const storedMessages = localStorage.getItem("messages");
const initialMessages = storedMessages ? JSON.parse(storedMessages) : [];
const initialUser = sessionStorage.getItem("user");

const App = () => {
  const [user, setUserState] = useState(initialUser);
  const [messages, setMessages] = useState(initialMessages);

  const setUser = (user) => {
    sessionStorage.setItem("user", user);
    setUserState(user);
  };

  const sendMessage = (message) => {
    const updatedMessages = [...messages];
    updatedMessages.unshift({
      ...message,
      id: `${message.username}_${message.timestamp.getTime()}`,
    });
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
