import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer'
import Userlist from './userlist';

test('pagination should be in document', () => {
  render(<Userlist />);
  const paginationElement = screen.getByTestId("pagination");
  expect(paginationElement).toBeInTheDocument(); 
});

test('pagination should not be in document when totalpages is 0', () => {
  render(<Userlist />);
  const paginationElement = screen.getByTestId("pagination");
  // fireEvent.change(paginationElement, {count : 2});
  // expect(paginationElement).toHaveAttribute("count", 2);
});

test('snapshot for pagination', () => {
  const renderedComponent = renderer.create(<Userlist />).toJSON()
  expect(renderedComponent).toMatchSnapshot()
})