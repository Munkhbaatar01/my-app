import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./counter";

test("Increment and decrement work correctly", () => {
  const updateQuantity = jest.fn();
  render(<Counter stock={5} quantity={1} updateQuantity={updateQuantity} />);

  const incrementButton = screen.getByText("+");
  const decrementButton = screen.getByText("-");
  const countDisplay = screen.getByText("1");

  fireEvent.click(incrementButton);
  expect(updateQuantity).toHaveBeenCalledWith(2);

  fireEvent.click(decrementButton);
  expect(updateQuantity).toHaveBeenCalledWith(1);
  
});
