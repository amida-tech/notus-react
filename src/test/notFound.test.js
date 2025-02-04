import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '../notFound';
import { BrowserRouter } from 'react-router-dom';

// Test the notFound.js component
describe('notFound.js', () => {
  it('Renders correctly,', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    // Identify links on the page
    const linksOnPage = document.getElementsByTagName('a');
    // Assert 1 link is on the page
    expect(linksOnPage.length).toBe(1);
  });
});
