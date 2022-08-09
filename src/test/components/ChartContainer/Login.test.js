import {
  fireEvent, render, screen,
} from '@testing-library/react';
import Login from '../../../views/auth/Login'

describe('Login', () => {
  it('Renders on Load', () => {
    render(<Login />)
  });
});
describe('Links render as expected', () => {
  it('2 Links render on page', () => {
    render(<Login />)
    const linksOnPage = document.getElementsByTagName('a')
    expect(linksOnPage.length).toBe(2)
  });
  it('"Sign Up" link renders to page with correct text and href', () => {
    render(<Login />)
    const linksOnPage = document.getElementsByTagName('a')
    const signUpLink = linksOnPage[0]
    expect(signUpLink.href.includes('/auth/register')).toBeTruthy()
    expect(signUpLink.innerHTML).toBe('Sign Up')
  });
  it('"Forgot Password" link renders to page with correct text and href', () => {
    render(<Login />)
    const linksOnPage = document.getElementsByTagName('a')
    const forgotPasswordLink = linksOnPage[1]
    expect(forgotPasswordLink.href.includes('#pablo')).toBeTruthy()
    expect(forgotPasswordLink.innerHTML).toBe('Forgot password')
  });
});

describe('Labels render as expected', () => {
  it('2 Labels render on page', () => {
    render(<Login />)
    const labelsOnPage = document.getElementsByTagName('label')
    expect(labelsOnPage.length).toBe(2)
  });
  it('"Username/Email" label renders to page with correct placeholder', () => {
    render(<Login />)
    const labelsOnPage = document.getElementsByTagName('label')
    const usernameEmailLabel = labelsOnPage[0]
    expect(usernameEmailLabel.innerHTML.includes('Username/Email')).toBe(true)
  });
  it('"Password" label renders to page with correct placeholder', () => {
    render(<Login />)
    const labelsOnPage = document.getElementsByTagName('label')
    const passwordLabel = labelsOnPage[1]

    expect(passwordLabel.innerHTML.includes('Password')).toBe(true)
  });
});

describe('Inputs render as expected', () => {
  it('2 Inputs render on page', () => {
    render(<Login />)
    const inputsOnPage = document.getElementsByTagName('input')
    expect(inputsOnPage.length).toBe(2)
  });
  it('"Username/Email" input renders to page with correct text', () => {
    render(<Login />)
    const inputsOnPage = document.getElementsByTagName('input')

    const usernameEmailLabel = inputsOnPage[0]
    expect(usernameEmailLabel.placeholder).toBe('Username or email address')
  });
  it('"Password" input renders to page with correct text', () => {
    render(<Login />)
    const inputsOnPage = document.getElementsByTagName('input')
    const passwordLabel = inputsOnPage[1]

    expect(passwordLabel.placeholder).toBe('Password')
  });
});

describe('Button renders as expected', () => {
  it('Number of buttons on DOM is two', () => {
    render(<Login />)
    const buttonsOnPage = document.getElementsByTagName('button')
    expect(buttonsOnPage.length).toBe(2)
  })

  it('Google button renders with correct text', () => {
    render(<Login />)
    const googleButton = screen.getByRole('button', { name: 'google.svg Sign in with Google' })
    expect(googleButton.textContent.includes('Sign in with Google')).toBe(true)
  })

  it('Login button renders with correct text', () => {
    render(<Login />)
    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton.textContent.includes('Login')).toBe(true)
  })
})

describe('Sign up link renders and navigates as expected', () => {
  it("Sign up link navigates to '/auth/register'", () => {
    render(<Login />)
    const registerLink = screen.getByRole('link', { name: 'Sign Up' })
    expect(registerLink.hasAttribute('href', '/auth/register')).toBe(true)
  })
})

describe('Google OAuth logging in', () => {
  it('Button is clickable', () => {
    window.HTMLFormElement.prototype.submit = (undefined) => {undefined}
    render(<Login />)
    const googleLogin = screen.getByRole('button', { name: 'google.svg Sign in with Google' })
    expect(fireEvent.click(googleLogin)).toBe(true)
  })
})
