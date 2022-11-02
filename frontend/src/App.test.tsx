import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';



test('renders the landing page', () => {
  render(<App />);
});

// Testing to click on the search button and checking the numbers of pull requests Cards before and after clicking.
test('click on the button search', () => {
  const { container } = render(<App />);
  const btn = screen.getByRole("button");
  expect(btn).not.toBeDisabled();
  const prCards = container.getElementsByClassName('pr-card');
  console.log(prCards.length);

  expect(prCards.length).toBe(1);

  userEvent.click(btn);

  expect(prCards.length).toBe(7);
})