import { render, screen } from "@testing-library/react";
import Message from "./Message";
import UserContext from "../../userContext";

const props = {
  message: {
    username: "sotiris",
    timestamp: new Date(2022, 1, 1, 13, 4),
    text: "this is only a test text",
    id: "message_id",
  },
  highlighted: true,
};

describe("Message", () => {
  it("renders formatted time correctly", () => {
    render(<Message {...props} />);
    expect(screen.getByText("13:04")).toBeInTheDocument();
  });

  it("does not display message on the right", () => {
    render(<Message {...props} />);
    expect(screen.getByTestId("message").classList).not.toContain(
      "message--right"
    );
  });

  it("adds hightlighting", () => {
    render(<Message {...props} />);
    expect(screen.getByTestId("message").classList).toContain(
      "message--highlighted"
    );
  });

  describe("when same user", () => {
    const user = "sotiris";

    beforeEach(() => {
      render(
        <UserContext.Provider value={{ user }}>
          <Message {...props} />
        </UserContext.Provider>
      );
    });

    it("displays message on the right", () => {
      expect(screen.getByTestId("message").classList).toContain(
        "message--right"
      );
    });

    it("does not add hightlighting", () => {
      expect(screen.getByTestId("message").classList).not.toContain(
        "message--highlighted"
      );
    });

    it("renders delete button", () => {
      expect(screen.getByText("Delete message")).toBeInTheDocument();
    });
  });
});
