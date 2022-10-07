import { render, screen, fireEvent } from "@testing-library/react";
import UsernamePrompt from "./index";
import UserContext from "../../userContext";

describe("UsernamePrompt", () => {
  it("sets user when input is submitted", () => {
    const mockSetUser = jest.fn();
    render(
      <UserContext.Provider value={{ setUser: mockSetUser }}>
        <UsernamePrompt />
      </UserContext.Provider>
    );
    const usernamePromptInput = screen.getByTestId("usernamePrompt-input");
    const newUser = "sotiris";
    fireEvent.change(usernamePromptInput, { target: { value: newUser } });
    fireEvent.submit(usernamePromptInput);
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith(newUser);
  });
});
