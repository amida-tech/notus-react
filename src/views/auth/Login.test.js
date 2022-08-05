import {
  fireEvent, render, screen,
} from '@testing-library/react';
import Login from './Login'

describe('Login', () => {
  test('Login renders', () => {
    render(<Login />)
    screen.debug()
  });
});``