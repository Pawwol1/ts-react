import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetails from './userDetails';

test('form validation test', () => {
  render(
    <MemoryRouter>
      <UserDetails />
    </MemoryRouter>
  );
  
});
