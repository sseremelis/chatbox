import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const initialMessages = [
  {
    username: "natasa",
    timestamp: "2022-10-07T14:14:03.081Z",
    text: "how is your day so far?",
    id: "natasa_1665152043081",
  },
  {
    username: "sotiris",
    timestamp: "2022-10-07T10:53:00.101Z",
    text: "all good",
    id: "sotiris_1665139980101",
  },
  {
    username: "natasa",
    timestamp: "2022-10-07T10:52:55.393Z",
    text: "nice! what about you?",
    id: "natasa_1665139975393",
  },
  {
    username: "sotiris",
    timestamp: "2022-10-07T10:52:45.746Z",
    text: "hey there, what's up?",
    id: "sotiris_1665139965746",
  },
  {
    username: "natasa",
    timestamp: "2022-10-07T10:52:31.181Z",
    text: "hello!",
    id: "natasa_1665139951181",
  },
];

describe("App", () => {
  it("renders page title", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toBe("chat.exe");
  });

  describe("with no stored user", () => {
    const newUser = "new_user";

    beforeEach(() => {
      render(<App />);
    });

    afterEach(() => {
      sessionStorage.clear();
    });

    it("displays username prompt", () => {
      expect(screen.getByTestId("usernamePrompt-input")).toBeInTheDocument();
    });

    describe("when username is submitted", () => {
      beforeEach(() => {
        const usernamePrompt = screen.getByTestId("usernamePrompt-input");
        fireEvent.change(usernamePrompt, { target: { value: newUser } });
        fireEvent.submit(usernamePrompt);
      });

      it("enters the new user into the chat", () => {
        expect(screen.getByText(`${newUser}:`)).toBeInTheDocument();
      });

      it("saves the new user in session storage", () => {
        expect(sessionStorage.getItem("user")).toBe(newUser);
      });
    });
  });

  describe("with stored data", () => {
    beforeEach(() => {
      localStorage.setItem("messages", JSON.stringify(initialMessages));
      sessionStorage.setItem("user", "sotiris");
      render(<App />);
    });

    afterEach(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    it("renders stored messages", () => {
      expect(screen.getByText(initialMessages[0].text)).toBeInTheDocument();
      expect(screen.getByText(initialMessages[1].text)).toBeInTheDocument();
    });

    it("renders stored user", () => {
      expect(screen.getByText("sotiris:")).toBeInTheDocument();
    });

    describe("when message is sent", () => {
      const newMessage = "hello this is a new test message";
      beforeEach(() => {
        const textInput = screen.getByTestId("text-input");
        fireEvent.change(textInput, { target: { value: newMessage } });
        fireEvent.submit(textInput);
      });

      it("displays the new message", () => {
        expect(screen.getByText(newMessage)).toBeInTheDocument();
      });

      it("persists the message as first element in local storage", () => {
        const storedMessages = JSON.parse(localStorage.getItem("messages"));
        expect(storedMessages[0].text).toEqual(newMessage);
      });
    });

    describe("when message is edited", () => {
      const editMessage = "hello this is an edited message";
      beforeEach(() => {
        const textInput = screen.getByTestId("text-input");
        fireEvent.keyUp(textInput, { key: "ArrowUp" });
        fireEvent.change(textInput, { target: { value: editMessage } });
        fireEvent.submit(textInput);
      });

      it("displays the edited message", () => {
        expect(screen.getByText(editMessage)).toBeInTheDocument();
      });

      it("edits the correct message in local storage", () => {
        const storedMessages = JSON.parse(localStorage.getItem("messages"));
        expect(storedMessages[1].text).toEqual(editMessage);
      });
    });

    describe("when message is deleted", () => {
      const deletedMessage = initialMessages[3];
      beforeEach(() => {
        // Remove the second message of user 'sotiris', fourth message from all messages
        const deleteButton = screen.getAllByText("Delete message")[1];
        fireEvent.click(deleteButton);
      });

      it("deletes the message message", () => {
        expect(screen.queryByText(deletedMessage.text)).not.toBeInTheDocument();
      });

      it("removes the message from local storage", () => {
        const storedMessages = JSON.parse(localStorage.getItem("messages"));
        expect(storedMessages.length).toEqual(initialMessages.length - 1);
        expect(
          storedMessages.find((m) => m.id === deletedMessage.id)
        ).toBeFalsy();
      });
    });
  });
});
