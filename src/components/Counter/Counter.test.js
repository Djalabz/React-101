import { render } from "@testing-library/react";
import Counter from "./Counter";

test("counter test", () => {
  const counter = render(<Counter />);
  const count = counter.getByText("0");
  expect(count).toBeInTheDocument();
});