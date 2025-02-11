import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SavedQueries from 'components/Reports/SavedQueries';

describe('SavedQueries.js', () => {
    it('renders without crashing', () => {
        // Render the saved queries
        render(<SavedQueries />);
        // Identify all list items
        const listItems = screen.getAllByRole('listitem');
        // Identify all links
        const links = screen.getAllByRole('link');
        // Assert 4 listItems and for links
        expect(listItems && links).toHaveLength(4);
    });
});
