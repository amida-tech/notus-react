import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import MeasureResultsTable from '../../../components/MeasureResults/MeasureResultsTable';
import '@testing-library/jest-dom'
import { currentResults, colorMapping } from '../../data/TestData';

const measureTip = 'The actual measure. At the moment, these are always HEDIS measures.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of patients who are eligible for this measure.';
const numeratorTip = 'The number of patients who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of patients who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

const selectedMeasures = [
  'composite',
  'aab',
  'aise',
  'drre',
  'imae',
];

const handleMeasureChange = (event) => {
};

describe('MeasureResultsTable', () => {
  it('renders to screen with default conditions', () => {
    render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={handleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    expect(screen.getByText('Measure')).toBe(true);
    expect(screen.getByText('Remaining Inclusions')).toBe(true);
    expect(screen.getByText('Eligible Population')).toBe(true);
    expect(screen.getByText('Numerator')).toBe(true);
    expect(screen.getByText('Denominator')).toBe(true);
    expect(screen.getByText('Available Exclusions')).toBe(true);
  })

  // it('renders ToolTip text for "Measure Tip" to screen', () => {
  //   const { getByText } = render(<MeasureResultsTable
  //     currentResults={currentResults}
  //     handleMeasureChange={handleMeasureChange}
  //     selectedMeasures={selectedMeasures}
  //     colorMapping={colorMapping}
  //   />)
  //   const svgEl = screen.getByLabelText(measureTip, { selector: 'svg' })
  //   expect(svgEl).toBeInTheDocument();
  //   fireEvent.mouseOver(svgEl);
  //   expect(screen.getByText(measureTip)).toBe(true);
  // });

  // test('Measure Results Table checkbox (to the left of titles) value set to "all"', () => {
  //   const { container } = render(<MeasureResultsTable
  //     currentResults={currentResults}
  //     handleMeasureChange={handleMeasureChange}
  //     selectedMeasures={selectedMeasures}
  //     colorMapping={colorMapping}
  //   />)

  //   const inputElValue = container.getElementsByTagName('input')[0].value
  //   expect(inputElValue).toBe('all')
  // })
  // test('All Measure Results Table input\'s type are Checkbox ', () => {
  //   const { container } = render(<MeasureResultsTable
  //     currentResults={currentResults}
  //     handleMeasureChange={handleMeasureChange}
  //     selectedMeasures={selectedMeasures}
  //     colorMapping={colorMapping}
  //   />)

  //   const allInputTags = container.getElementsByTagName('input')
  //   for (let i = 0; i < allInputTags.length; i += 1) {
  //     expect(allInputTags[i].type).toBe('checkbox')
  //   }
  // })
})
