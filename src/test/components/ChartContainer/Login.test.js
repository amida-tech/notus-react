import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { toEditorSettings } from 'typescript';
import Login from '../../../views/auth/Login'

describe('Login', () => {
  test('Renders on Load', () => {
    render(<Login />)
  });
});
describe('Links render as expected', () => {
  test('2 Links render on page', () => {
    render(<Login />)
    // links
    const linksOnPage = document.getElementsByTagName('a')
    expect(linksOnPage.length).toBe(2)
  });
  test('"Sign Up" link renders to page with correct text and href', () => {
    render(<Login />)
    // links
    const linksOnPage = document.getElementsByTagName('a')
    const signUpLink = linksOnPage[0]
    expect(signUpLink.href.includes('/auth/register')).toBeTruthy()
    expect(signUpLink.innerHTML).toBe('Sign Up')
  });
  test('"Forgot Password" link renders to page with correct text and href', () => {
    render(<Login />)
    // links
    const linksOnPage = document.getElementsByTagName('a')
    const forgotPasswordLink = linksOnPage[1]
    expect(forgotPasswordLink.href.includes('#pablo')).toBeTruthy()
    expect(forgotPasswordLink.innerHTML).toBe('Forgot password')
  });
});

describe('Labels render as expected', () => {
  test('2 Labels render on page', () => {
    render(<Login />)
    // labels
    const labelsOnPage = document.getElementsByTagName('label')
    expect(labelsOnPage.length).toBe(2)
  });
  test('"Username/Email" label renders to page with correct placeholder', () => {
    render(<Login />)
    // // labels
    const labelsOnPage = document.getElementsByTagName('label')
    const usernameEmailLabel = labelsOnPage[0]
    expect(usernameEmailLabel.innerHTML.includes('Username/Email')).toBe(true)
  });
  test('"Password" label renders to page with correct placeholder', () => {
    render(<Login />)
    // // labels
    const labelsOnPage = document.getElementsByTagName('label')
    const passwordLabel = labelsOnPage[1]

    expect(passwordLabel.innerHTML.includes('Password')).toBe(true)
  });
});

describe('Inputs render as expected', () => {
  test('2 Inputs render on page', () => {
    render(<Login />)
    // inputs
    const inputsOnPage = document.getElementsByTagName('input')
    expect(inputsOnPage.length).toBe(2)
  });
  test('"Username/Email" input renders to page with correct text', () => {
    render(<Login />)
    // inputs
    const inputsOnPage = document.getElementsByTagName('input')

    const usernameEmailLabel = inputsOnPage[0]
    expect(usernameEmailLabel.placeholder).toBe('Username or email address')
  });
  test('"Password" input renders to page with correct text', () => {
    render(<Login />)
    // inputs
    const inputsOnPage = document.getElementsByTagName('input')
    const passwordLabel = inputsOnPage[1]

    expect(passwordLabel.placeholder).toBe('Password')
  });
});

describe('Button renders as expected', () => {
  test('Number of buttons on DOM is two', () => {
    render(<Login />)
    const buttonsOnPage = document.getElementsByTagName('button')
    expect(buttonsOnPage.length).toBe(2)
  })

  test('Google button renders with correct text', () => {
    render(<Login />)
    // buttons
    // const googleButton = screen.getByText('Sign in with Google')
    const googleButton = screen.getByRole('button', { name: 'google.svg Sign in with Google' });
    expect(googleButton.textContent.includes('Sign in with Google')).toBe(true)
  })

  test('Login button renders with correct text', () => {
    render(<Login />)
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton.textContent.includes('Login')).toBe(true)
  })
})

describe('Sign up link renders and navigates as expected', () => {
  test("Sign up link navigates to '/auth/register'", () => {
    render(<Login />)
    const registerLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(registerLink.hasAttribute('href', '/auth/register')).toBe(true)
  })
})

describe('Google OAuth logging in works', () => {
  test("Google logging in works", () => {
    render(<Login />)
    const googleLogin = screen.getByRole('button', { name: 'google.svg Sign in with Google' })
    console.log(googleLogin)
  })
})

// // expect(signUpLink.href).to.equal('/auth/register')
// // console.log(signUpLink.length)
// screen.debug()

// label for Username/Email
// input for Username/Email
// label for Password
// input for Password
// 2 butttons

// gooogle OAUTH WORKS
// login button WORKS
// both inputs work (receive text)