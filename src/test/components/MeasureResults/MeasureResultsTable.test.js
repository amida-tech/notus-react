import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import MeasureResultsTable from '../../../components/MeasureResults/MeasureResultsTable';
import '@testing-library/jest-dom'
import { currentResults, colorMapping } from '../../data/TestData';

const measureTip = 'The actual measure. At the moment, these are always HEDIS measures.';
// We're not testing all the tips. One is fine.

const selectedMeasures = [
  'composite',
  'aab',
  'aise',
  'drre',
  'imae',
];

let x = true;
const mockHandleMeasureChange = jest.fn(() => !x);

const handleByLineMeasureChange = (event) => {
  x = event.target.checked;
};

describe('MeasureResultsTable', () => {
  it('renders to screen with default conditions', () => {
    render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={mockHandleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    expect(screen.getByText('Measure')).toBeTruthy();
    expect(screen.getByText('Remaining Inclusions')).toBeTruthy();
    expect(screen.getByText('Eligible Population')).toBeTruthy();
    expect(screen.getByText('Numerator')).toBeTruthy();
    expect(screen.getByText('Denominator')).toBeTruthy();
    expect(screen.getByText('Available Exclusions')).toBeTruthy();

    const svgEl = screen.getByLabelText(measureTip, { selector: 'svg' })
    expect(svgEl).toBeInTheDocument();
  })

  it('when you click any checkbox but "all," both that checkbox and "all" are unchecked', () => {
    const { container, rerender } = render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={mockHandleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    // Steps:
    const targetInputTag = container.getElementsByTagName('input')
    for (let i = 0; i < targetInputTag.length; i += 1) {
      expect(targetInputTag[i].checked).toBe(true)
    }
  })
 
  it('when you click "all," every checkbox will then be checked', () => {
    const { container, rerender } = render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={mockHandleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)

    const imaeCheckbox = container.querySelector('input[value="imae"]');
    const allCheckbox = container.querySelector('input[value="all"]');
    expect(imaeCheckbox).toHaveProperty('checked', true);
    expect(allCheckbox).toHaveProperty('checked', true);

    fireEvent.click(imaeCheckbox);
    expect(mockHandleMeasureChange).toHaveBeenCalled(); // Check for the values of what is called.

    rerender(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={mockHandleMeasureChange}
      selectedMeasures={selectedMeasures.filter((measure) => measure !== 'imae')}
      colorMapping={colorMapping}
    />);

    expect(imaeCheckbox).toHaveProperty('checked', false);
    expect(allCheckbox).toHaveProperty('checked', false);
  })
})
