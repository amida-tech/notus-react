import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('The App.js component - ', () => {
  it('renders the Login page as expected', async () => {
    // Render the main App (login page)
    render(<App />);
    waitFor(() => {
      // Finds the google login & asserts it is in the document
      const googleLoginBtn = screen.getByText(/Sign in with Google/i);
      expect(googleLoginBtn).toBeInTheDocument();
      // Finds the microsoft login & asserts it is in the document
      const msftLoginBtn = screen
        .getByText(/Sign in with Microsoft/i)
        .toBeInTheDocument();
      expect(msftLoginBtn).toBeInTheDocument();
    });
  });
});
