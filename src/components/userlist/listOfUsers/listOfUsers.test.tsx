import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListOfUsers from './listOfUsers';

test('empty list should response Users not found', () => {
  render(
    <MemoryRouter>
      <ListOfUsers users={[]} />
    </MemoryRouter>);
  const pElement = screen.getByTestId("user_notFound")
  expect(pElement).toBeInTheDocument();
});

test('image should have a proper src attribute', () => {
  const users = [{
    id: 9,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "https://reqres.in/img/faces/9-image.jpg"
}]
  render(
    <MemoryRouter>
      <ListOfUsers users={users} />
    </MemoryRouter>);
  const imgElement = screen.getByRole("img");
  expect(imgElement).toHaveAttribute("src", users[0].avatar);
});

test('should print No photo when user object does not contain avatar', () => {
  const users = [{
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: ""
}]
  render(
    <MemoryRouter>
      <ListOfUsers users={users} />
    </MemoryRouter>);
  const imgElement = screen.getByRole("img");
  expect(imgElement).toHaveAttribute("src", users[0].avatar);
  expect(imgElement).toHaveAttribute("alt", "No photo");
});
