import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from 'components/Common/Navbar';
import '@azure/msal-browser';

    jest.mock('@azure/msal-browser');
    
describe('Navbar.js', () => {
    it('can open the navMenu & logout', () => {
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
        screen.debug(undefined, 40000);
    });

    it('can performs azLogout when azToken is set in local storage', () => {
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
        screen.debug(undefined, 40000);
    });
});
