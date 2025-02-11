import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportBuilder from 'components/Reports/ReportBuilder';
import { mockStore } from 'test/resources/constants/ReportsConstants';

describe('ReportBuilder.js', () => {
    it('functions correctly', () => {
        render(<ReportBuilder store={mockStore} />);
        // Identify the dropdowns
        const dropdownSelects = screen.getAllByRole('button');
        // For each dropdown
        dropdownSelects.forEach((dropdown) => {
            // Open the dropdown
            fireEvent.mouseDown(dropdown);
            // Identify all options
            const options = screen.queryAllByRole('option');
            // Assert the correct number of options
            expect(options.length).toBe(2);
            // Click the first option
            fireEvent.click(options[1]);
            // Assert aria-selected is false
            expect(options[1]).toHaveAttribute('aria-selected', 'true');
        });
    });
});
