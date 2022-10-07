import { render, screen } from "@testing-library/react";
import MessagesList from "./index";

describe("MessagesList", () => {
  it("renders empty message if there are no messages", () => {
    render(<MessagesList messages={[]} />);
    expect(screen.getByText("no messages yet!")).toBeInTheDocument();
  });

  it("highlights latest message", () => {
    const messages = [
      { text: "hello", id: "id1" },
      { text: "hiya", id: "id2" },
    ];
    render(<MessagesList messages={messages} />);
    expect(screen.getAllByTestId("message")[0].classList).toContain(
      "message--highlighted"
    );
  });
});
