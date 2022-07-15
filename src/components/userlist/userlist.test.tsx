import React, {SetStateAction} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer'
import PaginationComponent from './pagination/pagination';

test('pagination should be in document', async () => {

  render(<PaginationComponent totalPages={2} setPage={function (value: SetStateAction<number>): void {}}/>)

  const paginationElement = await screen.findByTestId("pagination");
  expect(paginationElement).toBeInTheDocument(); 
});

test('pagination should not be in document when totalpages is 0', async () => {
  render(<PaginationComponent totalPages={0} setPage={function (value: SetStateAction<number>): void {}}/>);
  expect(screen.getByTestId("hidden")).toBeInTheDocument();
});

test('snapshot for pagination', () => {
  const renderedComponent = renderer.create(
  <PaginationComponent totalPages={2} setPage={function (value: SetStateAction<number>): void {}}/>
  ).toJSON()
  expect(renderedComponent).toMatchSnapshot()
})