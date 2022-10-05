import { Fragment, useState } from "react";
import "./App.css";
import MessagesList from "./components/MessagesList";
import UserContext from "./userContext";
import UsernamePrompt from "./components/UsernamePrompt";
import TextInput from "./components/TextInput";

const storedMessages = localStorage.getItem("messages");
const initialMessages = storedMessages ? JSON.parse(storedMessages) : [];
const initialUser = sessionStorage.getItem("user");
const initialLastUserMessage = initialMessages.find(
  ({ username }) => username === initialUser
);

const App = () => {
  const [user, setUserState] = useState(initialUser);
  const [messages, setMessages] = useState(initialMessages);

  const [lastUserMessage, setLastUserMessage] = useState(
    initialLastUserMessage
  );

  const setUser = (user) => {
    sessionStorage.setItem("user", user);
    setUserState(user);
  };

  const sendMessage = (message) => {
    const updatedMessages = [...messages];
    const messageWithId = {
      ...message,
      id: `${message.username}_${message.timestamp.getTime()}`,
    };
    updatedMessages.unshift(messageWithId);
    persistMessages(updatedMessages);
  };

  const editMessage = ({ text, id }) => {
    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(
      ({ id: messageId }) => messageId === id
    );
    updatedMessages[messageIndex].text = text;
    persistMessages(updatedMessages);
  };

  const deleteMessage = (id) => {
    const updatedMessages = [...messages];
    const messageIndex = updatedMessages.findIndex(
      ({ id: messageId }) => messageId === id
    );
    updatedMessages.splice(messageIndex, 1);
    persistMessages(updatedMessages);
  };

  const persistMessages = (messages) => {
    setMessages(messages);
    setLastUserMessage(messages[0]);
    localStorage.setItem("messages", JSON.stringify(messages));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <h1>chat.exe</h1>
      {user ? (
        <Fragment>
          <MessagesList messages={messages} deleteMessage={deleteMessage} />
          <TextInput
            sendMessage={sendMessage}
            editMessage={editMessage}
            lastUserMessage={lastUserMessage}
          />
        </Fragment>
      ) : (
        <UsernamePrompt />
      )}
    </UserContext.Provider>
  );
};

export default App;
