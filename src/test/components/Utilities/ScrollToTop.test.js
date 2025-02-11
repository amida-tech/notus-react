import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { default as ScrollToTop } from 'components/Utilities/ScrollToTop';
import '@testing-library/jest-dom';

describe('ScrollToTop.js', () => {
    // Persist the original window.scrollTo
    const originalScrollTo = window.scrollTo;

    // Mock window.scrollTo
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    // Restore window.scrollTo & clear mocks
    afterEach(() => {
        window.scrollTo = originalScrollTo;
        jest.clearAllMocks();
    });

    it('renders components correctly under ScrollToTop', () => {
        render(
            <BrowserRouter>
                <ScrollToTop />
                <Switch>
                    <Route path='/'>
                        <div>home</div>
                        <Link to='/'>go</Link>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
        // Identify elements on the page
        const home = screen.getByText(/home/i);
        const linkToPage = screen.getByText(/go/i);
        // Click the link
        act(() => {
            fireEvent.click(linkToPage);
        });
        // Assert elements exist on the page
        expect(home && linkToPage).toBeInTheDocument();
    });
});
