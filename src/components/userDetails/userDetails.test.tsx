import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import UserDetails from './userDetails';

const fakeUsers = {
  data: [
      {
          "id": 7,
          "email": "michael.lawson@reqres.in",
          "first_name": "Michael",
          "last_name": "Lawson",
          "avatar": "https://reqres.in/img/faces/7-image.jpg"
      },
  ],
  page: 2,
  per_page: 6,
  "url": "https://reqres.in/#support-heading",
  "text": "To keep ReqRes free, contributions towards server costs are appreciated!",
  total: 12,
  total_pages: 2,
};


test('form title error should be shown', async () => {
  const errMsg: string = "The title must be 1 to 255 characters with no double spaces";
  const inputValue: string = "  ";

  jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUsers),
                status: 200,
            } as Response)
        );

  await act(async () => {
    render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
    )
  });

  const inputElement = await screen.findByPlaceholderText("...");
  fireEvent.change(inputElement, {target: {value: inputValue}});

  expect(inputElement).toHaveValue(inputValue);

  const errMsgShown = await screen.findByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('form message error should be shown', async () => {
  const errMsg: string = "The message must be 4 to 500 characters with no double spaces";
  const inputValue: string = "Test";
  
  jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUsers.data[0]),
                status: 200,
            } as Response)
        );

  await act(async () => {
    render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
    )
  });
  
  const textareaElement = await screen.findByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: inputValue}});

  expect(textareaElement).toHaveValue(inputValue);

  const errMsgShown = await screen.findByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('first character cannot be empty space error should be shown', async () => {
  const errMsg: string = "The first character cannot be an empty space";
  const inputValue: string = " ";
 
  jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUsers.data[0]),
                status: 200,
            } as Response)
        );

  await act(async () => {
    render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
    )
  });
  
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
  
  jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUsers.data[0]),
                status: 200,
            } as Response)
        );

  await act(async () => {
    render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
    )
  });
  
  const inputElement = screen.getByPlaceholderText("...");
  fireEvent.change(inputElement, {target: {value: inputValue}});
  expect(inputElement).toHaveValue(inputValue);

  const textareaElement = screen.getByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: textareaValue}});
  expect(textareaElement).toHaveValue(textareaValue);

  const btnElement = screen.getByText("Send message");
  fireEvent.click(btnElement);

  const successMsgShown = screen.getByText(successMsg);
  expect(successMsgShown).toBeInTheDocument();
});