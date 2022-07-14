import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetails from './userDetails';

test('form title error should be shown', async () => {
  const errMsg: string = "The title must be 1 to 255 characters with no double spaces";
  const inputValue: string = "  ";
  render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
  );
  const inputElement = await screen.findByPlaceholderText("...");
  fireEvent.change(inputElement, {target: {value: inputValue}});

  expect(inputElement).toHaveValue(inputValue);

  const errMsgShown = await screen.findByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('form message error should be shown', async () => {
  const errMsg: string = "The message must be 4 to 500 characters with no double spaces";
  const inputValue: string = "Test";
  render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
  );
  const textareaElement = await screen.findByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: inputValue}});

  expect(textareaElement).toHaveValue(inputValue);

  const errMsgShown = await screen.findByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('first character cannot be empty space error should be shown', async () => {
  const errMsg: string = "The first character cannot be an empty space";
  const inputValue: string = " ";
  render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
  );
  const textareaElement = await screen.findByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: inputValue}});

  expect(textareaElement).toHaveValue(inputValue);

  const errMsgShown = await screen.findByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('after validation and btn click success message should be shown', async () => {
  const successMsg: string = "The message has been sent successfully";
  const inputValue: string = "Test";
  const textareaValue: string = "Test test"
  render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
  );
  const inputElement = await screen.findByPlaceholderText("...");
  fireEvent.change(inputElement, {target: {value: inputValue}});
  expect(inputElement).toHaveValue(inputValue);

  const textareaElement = await screen.findByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: textareaValue}});
  expect(textareaElement).toHaveValue(textareaValue);

  const btnElement = await screen.findByText("Send message");
  fireEvent.click(btnElement);

  const successMsgShown = await screen.findByText(successMsg);
  expect(successMsgShown).toBeInTheDocument();
});