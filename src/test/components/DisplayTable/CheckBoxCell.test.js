import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckBoxCell from 'components/DisplayTable/CheckBoxCell';

describe('CheckBoxCell.js', () => {
    it('', () => {
        render(<CheckBoxCell />);
        // Identify all checkboxes
        const checkboxes = screen.getAllByRole('checkbox');
        // Click the first checkbox
        fireEvent.click(checkboxes[0]);
        // Assert only one checkbox
        expect(checkboxes.length).toBe(1);
    });
});
