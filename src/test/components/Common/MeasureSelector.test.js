import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MeasureSelector from 'components/Common/MeasureSelector';
import { measureSelectorResults } from '../../resources/constants/CommonConstants';

describe('MeasureSelector.test.js', () => {
    it('default props function as expected', () => {
        render(<MeasureSelector currentResults={measureSelectorResults} />);
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
            fireEvent.click(options[0]);
            // Assert aria-selected is false
            expect(options[0]).toHaveAttribute('aria-selected', 'false');
        });
    });
});
