import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Sidebar from './sidebar';

test('image should change after click', () => {
  render(<Sidebar />);
  const openSidebarElement = screen.getByText("left");
  fireEvent.click(openSidebarElement);

  const imgElement = screen.getByRole("img") as HTMLImageElement;
  const imgElementSrc = imgElement.getAttribute("src");
  
  fireEvent.click(screen.getByText("Get new shiba image"));
  
  expect(imgElement.src).not.toBe(imgElementSrc);
});