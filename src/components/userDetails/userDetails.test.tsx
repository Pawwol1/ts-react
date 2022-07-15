import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserPage from './userPage/userPage';

const user = {
  "id": 7,
  "email": "michael.lawson@reqres.in",
  "first_name": "Michael",
  "last_name": "Lawson",
  "avatar": "https://reqres.in/img/faces/7-image.jpg"
};
const totalUsers: number = 12;

test('form title error should be shown', () => {
  const errMsg: string = "The title must be 1 to 255 characters with no double spaces";
  const inputValue: string = "  ";
  const formMsg = {
    toUser: "",
    title: inputValue,
    message: ""
  };

    render(
    <MemoryRouter>
      <UserPage 
      user={user} 
      totalUsers={totalUsers} 
      formMsg={formMsg} 
      formTitleError={true} 
      formMsgError={false} 
      emptySpaceError={false}
      msgSent={false}
      handleSubmit={function (e: React.FormEvent<Element>): void {}}
      handleTitleChange={function (e: React.ChangeEvent<HTMLInputElement>): void {}}
      handleMsgChange={function (e: React.ChangeEvent<HTMLTextAreaElement>): void {}}
      />
    </MemoryRouter>
    )

  const inputElement = screen.getByPlaceholderText("...");
  fireEvent.change(inputElement, {target: {value: inputValue}});

  expect(inputElement).toHaveValue(inputValue);

  const errMsgShown = screen.getByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('form message error should be shown', () => {
  const errMsg: string = "The message must be 4 to 500 characters with no double spaces";
  const inputValue: string = "Test";
  const formMsg = {
    toUser: "",
    title: "",
    message: inputValue
  };
  
  render(
    <MemoryRouter>
      <UserPage 
      user={user} 
      totalUsers={totalUsers} 
      formMsg={formMsg} 
      formTitleError={false} 
      formMsgError={true} 
      emptySpaceError={false}
      msgSent={false}
      handleSubmit={function (e: React.FormEvent<Element>): void {}}
      handleTitleChange={function (e: React.ChangeEvent<HTMLInputElement>): void {}}
      handleMsgChange={function (e: React.ChangeEvent<HTMLTextAreaElement>): void {}}
      />
    </MemoryRouter>
    )
  
  const textareaElement = screen.getByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: inputValue}});

  expect(textareaElement).toHaveValue(inputValue);

  const errMsgShown = screen.getByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('first character cannot be empty space error should be shown', () => {
  const errMsg: string = "The first character cannot be an empty space";
  const inputValue: string = " ";
  const formMsg = {
    toUser: "",
    title: "",
    message: inputValue
  };
 
  render(
    <MemoryRouter>
      <UserPage 
      user={user} 
      totalUsers={totalUsers} 
      formMsg={formMsg} 
      formTitleError={false} 
      formMsgError={false} 
      emptySpaceError={true}
      msgSent={false}
      handleSubmit={function (e: React.FormEvent<Element>): void {}}
      handleTitleChange={function (e: React.ChangeEvent<HTMLInputElement>): void {}}
      handleMsgChange={function (e: React.ChangeEvent<HTMLTextAreaElement>): void {}}
      />
    </MemoryRouter>
    )
  
  const textareaElement = screen.getByPlaceholderText("Start typing...");
  fireEvent.change(textareaElement, {target: {value: inputValue}});

  expect(textareaElement).toHaveValue(inputValue);

  const errMsgShown =  screen.getByText(errMsg);
  expect(errMsgShown).toBeInTheDocument();
});

test('after validation and btn click success message should be shown', async () => {
  const successMsg: string = "The message has been sent successfully";
  const inputValue: string = "Test";
  const textareaValue: string = "Test test"
  const formMsg = {
    toUser: "",
    title: inputValue,
    message: textareaValue
  };

  render(
    <MemoryRouter>
      <UserPage 
      user={user} 
      totalUsers={totalUsers} 
      formMsg={formMsg} 
      formTitleError={false} 
      formMsgError={false} 
      emptySpaceError={false}
      msgSent={true}
      handleSubmit={function (e: React.FormEvent<Element>): void {}}
      handleTitleChange={function (e: React.ChangeEvent<HTMLInputElement>): void {}}
      handleMsgChange={function (e: React.ChangeEvent<HTMLTextAreaElement>): void {}}
      />
    </MemoryRouter>
    )
  
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