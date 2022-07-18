import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserlistSearch from './userlistSearch';

test('value from input should be rendered', () => {
  render(
    <MemoryRouter>
      <UserlistSearch users={[]} />
    </MemoryRouter>);
  const inputElement = screen.getByPlaceholderText("Type to search");
  fireEvent.change(inputElement, {target: {value: "Eve"}});
  expect(inputElement).toHaveValue("Eve")
})

test('searched value should be found and put it in the list', () => {
  const users = [{
    id: 0,
    first_name: "Eve",
    last_name: "",
    email: "",
    avatar: ""
}]
  render(
    <MemoryRouter>
      <UserlistSearch users={users} />
    </MemoryRouter>);
  const inputElement = screen.getByPlaceholderText("Type to search");
  fireEvent.change(inputElement, {target: {value: users[0].first_name}});
  expect(inputElement).toHaveValue(users[0].first_name);

  const btnElement = screen.getByText("Search");
  fireEvent.click(btnElement);

  const pElement = screen.getByTestId("user_name");
  expect(pElement).toHaveTextContent(users[0].first_name);
})

test('should print No user found when value from the input is not found', () => {
  const users = [{
    id: 0,
    first_name: "Janet",
    last_name: "",
    email: "",
    avatar: ""
}]
  render(
    <MemoryRouter>
      <UserlistSearch users={users} />
    </MemoryRouter>);
  const inputElement = screen.getByPlaceholderText("Type to search");
  const searchValue: string = "Bob"
  fireEvent.change(inputElement, {target: {value: searchValue}});
  expect(inputElement).toHaveValue(searchValue)

  const btnElement = screen.getByText("Search");
  fireEvent.click(btnElement);

  const divElement = screen.getByText("No user found")
  expect(divElement).toBeInTheDocument();
})