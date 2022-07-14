import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer'
import App from './App';

it('snapshot for App component', () => {
  const renderedComponent = renderer.create(
      <MemoryRouter initialEntries={['/']}>
          <App />
      </MemoryRouter>).toJSON()
  expect(renderedComponent).toMatchSnapshot()
})

test('should show "Page not found"', () => {
  const badRoute = '/bad/route'
  render(
      <MemoryRouter initialEntries={[badRoute]}>
          <App />
      </MemoryRouter>)
  expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
})