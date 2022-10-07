// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(2022, 1, 1));
});
