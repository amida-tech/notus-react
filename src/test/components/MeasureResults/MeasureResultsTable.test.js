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


const mockHandleMeasureChange = jest.fn(() => false);

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
    const { container } = render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={mockHandleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    // Steps:
    const targetInputTag = container.getElementsByTagName('input')[0]
    // console.log(targetInputTag)
    // screen.debug()
    // 2) fireEvent to click on a checkbox.
    // 3) Mock `handleMeasureChange` and confirm it was clicked.
    // 4) Rerender MeasureResultsTable.
    // 5) Then confirm that "all" and the selected checkboxes are both unchecked.
  })

  it('when you click "all," every checkbox will then be checked', () => {
    const { container } = render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={mockHandleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    // Steps:
    // 1) You must change the above props so not all checkboxes will be checked when rendered.
    // 2) fireEvent to click on "all".
    // 3) Mock `handleMeasureChange` and confirm it was clicked.
    // 4) Rerender MeasureResultsTable.
    // 5) Then confirm that all checkboxes are checked.
  })
})
