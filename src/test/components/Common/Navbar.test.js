import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from 'components/Common/Navbar';
import '@azure/msal-browser';

// Mock azLogout from AuthService
jest.mock('views/auth/AuthService', () => {
    return {
        azLogout: jest.fn()
    };
});
// Mock @azure/msal-browser
jest.mock('@azure/msal-browser');

describe('Navbar.js', () => {
    it('can open the navMenu & logout', () => {
        // Render the Navbar
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        // Identify the navMenu
        const navMenu = screen.getByTestId('AccountCircleOutlinedIcon');
        // Open the navMenu
        act(() => {
            fireEvent.click(navMenu);
        });
        // Identify the logout option
        const logout = screen.getByText(/Logout/i);
        // Click logout
        act(() => {
            fireEvent.click(logout);
        });
        // Assert navMenu & logout are in the document
        expect(navMenu && logout).toBeInTheDocument();
    });

    it('can perform azLogout when azToken is set in local storage', () => {
        localStorage.setItem('azToken', 'mock-token');
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        const navMenu = screen.getByTestId('AccountCircleOutlinedIcon');
        act(() => {
            fireEvent.click(navMenu);
        });
        const logout = screen.getByText(/Logout/i);
        act(() => {
            fireEvent.click(logout);
        });
        expect(navMenu && logout).toBeInTheDocument();
    });
});
