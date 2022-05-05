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
      handleMeasureChange={handleByLineMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    const targetSVGTagAllSelectedMeasuresChecked = container.querySelectorAll('[data-testid="CheckBoxIcon"]')
    const targetSVGTagAllSelectedMeasuresUnchecked = container.querySelectorAll('[data-testid="CheckBoxOutlineBlankIcon"]')
    expect(targetSVGTagAllSelectedMeasuresChecked.length).toEqual(6)
    expect(targetSVGTagAllSelectedMeasuresUnchecked.length).toEqual(0)

    rerender(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={handleByLineMeasureChange}
      selectedMeasures={[]}
      colorMapping={colorMapping}
    />)
    const targetSVGTagNoSelectedMeasuresChecked = container.querySelectorAll('[data-testid="CheckBoxIcon"]')
    const targetSVGTagNoSelectedMeasuresUnchecked = container.querySelectorAll('[data-testid="CheckBoxOutlineBlankIcon"]')
    expect(targetSVGTagNoSelectedMeasuresChecked.length).toEqual(0)
    expect(targetSVGTagNoSelectedMeasuresUnchecked.length).toEqual(6)

    rerender(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={handleByLineMeasureChange}
      selectedMeasures={['composite']}
      colorMapping={colorMapping}
    />)

    const targetSVGTagONESelectedMeasuresChecked = container.querySelectorAll('[data-testid="CheckBoxIcon"]')
    const targetSVGTagONESelectedMeasuresUnchecked = container.querySelectorAll('[data-testid="CheckBoxOutlineBlankIcon"]')
    expect(targetSVGTagONESelectedMeasuresChecked.length).toEqual(1)
    expect(targetSVGTagONESelectedMeasuresUnchecked.length).toEqual(5)

    rerender(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={handleByLineMeasureChange}
      selectedMeasures={['composite', 'aab']}
      colorMapping={colorMapping}
    />)

    const targetSVGTagTWOSelectedMeasuresChecked = container.querySelectorAll('[data-testid="CheckBoxIcon"]')
    const targetSVGTagTWOSelectedMeasuresUnchecked = container.querySelectorAll('[data-testid="CheckBoxOutlineBlankIcon"]')
    expect(targetSVGTagTWOSelectedMeasuresChecked.length).toEqual(2)
    expect(targetSVGTagTWOSelectedMeasuresUnchecked.length).toEqual(4)
  })
})
