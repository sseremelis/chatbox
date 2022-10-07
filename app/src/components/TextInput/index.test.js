import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./index";
import UserContext from "../../userContext";

describe("TextInput", () => {
  it("should render render an alert when form is submitted with empty text", () => {
    render(<TextInput />);
    fireEvent.click(screen.getByTestId("text-input-button"));
    expect(
      screen.getByText("you can't send an empty message >_<")
    ).toBeInTheDocument();
  });

  describe("when input gets submitted", () => {
    const mockSendMessage = jest.fn();
    const user = "sotiris";

    beforeEach(() => {
      render(
        <UserContext.Provider value={{ user }}>
          <TextInput sendMessage={mockSendMessage} />
        </UserContext.Provider>
      );
    });

    it("should send message with correct params", () => {
      const testMessage = "this is a test message";
      const textInput = screen.getByTestId("text-input");
      fireEvent.change(textInput, { target: { value: testMessage } });
      fireEvent.submit(textInput);

      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      expect(mockSendMessage).toHaveBeenCalledWith({
        text: testMessage,
        username: user,
        timestamp: new Date(2022, 1, 1),
      });
    });

    it("clears the input after submitting", () => {
      expect(screen.getByTestId("text-input").value).toEqual("");
    });
  });

  describe("when arrow up is pressed", () => {
    const mockEditMessage = jest.fn();
    const lastUserMessage = { id: "message_id", text: "hello" };

    beforeEach(() => {
      render(
        <TextInput
          editMessage={mockEditMessage}
          lastUserMessage={lastUserMessage}
        />
      );
      fireEvent.keyUp(screen.getByTestId("text-input"), { key: "ArrowUp" });
    });

    it("should enter edit mode", () => {
      expect(screen.getByTestId("text-input").value).toEqual(
        lastUserMessage.text
      );
    });

    describe("when input gets submitted", () => {
      const newMessage = "new message";

      beforeEach(() => {
        const textInput = screen.getByTestId("text-input");
        fireEvent.change(textInput, { target: { value: newMessage } });
        fireEvent.submit(textInput);
      });

      it("should edit message with correct params", () => {
        expect(mockEditMessage).toHaveBeenCalledTimes(1);
        expect(mockEditMessage).toHaveBeenCalledWith({
          text: newMessage,
          id: lastUserMessage.id,
        });
      });

      it("clears the input after submitting", () => {
        expect(screen.getByTestId("text-input").value).toEqual("");
      });
    });
  });
});
