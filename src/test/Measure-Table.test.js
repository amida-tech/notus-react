import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Try } from '@mui/icons-material';
import MeasureResultsTable from '../components/MeasureResults/MeasureResultsTable';

const measureTip = 'The actual measure. At the moment, these are always HEDIS measures.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of patients who are eligible for this measure.';
const numeratorTip = 'The number of patients who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of patients who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

const currentResults = [
  {
    _id: 'composite-2022-02-27',
    measure: 'composite',
    date: '2022-02-27T00:00:00.000Z',
    value: 45.863095238095234,
    starRating: 2.5,
    numerator: 78,
    denominator: 177,
    initialPopulation: 183,
    exclusions: 129,
    label: 'Composite - Composite Score',
    shortLabel: 'Composite',
    title: 'Composite Score',
  },
  {
    _id: 'aab-2022-02-27',
    measure: 'aab',
    date: '2022-02-27T00:00:00.000Z',
    value: 62.5,
    starRating: 3,
    denominator: 32,
    numerator: 20,
    initialPopulation: 33,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 62.5,
        denominator: 32,
        numerator: 20,
        initialPopulation: 33,
        exclusions: 22,
        label: 'AAB-1 - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
      },
    ],
    label: 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
    shortLabel: 'AAB',
    title: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
  },
  {
    _id: 'aise-2022-02-27',
    measure: 'aise',
    date: '2022-02-27T00:00:00.000Z',
    value: 44.285714285714285,
    starRating: 2,
    denominator: 70,
    numerator: 31,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 36.84210526315789,
        denominator: 19,
        numerator: 7,
        initialPopulation: 19,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Influenza',
      },
      {
        measure: 'aise-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 52.63157894736842,
        denominator: 19,
        numerator: 10,
        initialPopulation: 19,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Td/Tdap',
      },
      {
        measure: 'aise-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Zoster',
      },
      {
        measure: 'aise-4',
        date: '2022-02-27T00:00:00.000Z',
        value: 33.33333333333333,
        denominator: 15,
        numerator: 5,
        initialPopulation: 15,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Pneumococcal',
      },
    ],
    label: 'AIS-E - Adult Immunization Status',
    shortLabel: 'AIS-E',
    title: 'Adult Immunization Status',
  },
  {
    _id: 'drre-2022-02-27',
    measure: 'drre',
    date: '2022-02-27T00:00:00.000Z',
    value: 50,
    starRating: 2.5,
    denominator: 30,
    numerator: 15,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Follow-Up',
      },
      {
        measure: 'drre-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Remission',
      },
      {
        measure: 'drre-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Response',
      },
    ],
    label: 'DRR-E - Depression Remission or Response for Adolescents and Adults',
    shortLabel: 'DRR-E',
    title: 'Depression Remission or Response for Adolescents and Adults',
  },
  {
    _id: 'imae-2022-02-27',
    measure: 'imae',
    date: '2022-02-27T00:00:00.000Z',
    value: 26.666666666666668,
    starRating: 1.5,
    denominator: 45,
    numerator: 12,
    initialPopulation: 49,
    exclusions: 35,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Meningococcal Serogroups A, C, W, Y',
      },
      {
        measure: 'imae-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Tdap',
      },
      {
        measure: 'imae-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - HPV',
      },
      {
        measure: 'imae-4',
        date: '2022-02-27T00:00:00.000Z',
        value: 0,
        denominator: 9,
        numerator: 0,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Combination 1: Meningococcal, Tdap',
      },
      {
        measure: 'imae-5',
        date: '2022-02-27T00:00:00.000Z',
        value: 0,
        denominator: 6,
        numerator: 0,
        initialPopulation: 9,
        exclusions: 7,
        label: 'IMA-E - Combination 2: Meningococcal, Tdap, HPV',
      },
    ],
    label: 'IMA-E - Immunizations for Adolescents',
    shortLabel: 'IMA-E',
    title: 'Immunizations for Adolescents',
  },
]
const selectedMeasures = [
  'composite',
  'aab',
  'aise',
  'drre',
  'imae',
]
const colorMapping = [
  {
    measure: 'drre',
    color: '#88CCEE',
  },
  {
    measure: 'aab',
    color: '#CC6677',
  },
  {
    measure: 'aise',
    color: '#DDCC77',
  },
  {
    measure: 'imae',
    color: '#117733',
  },
  {
    measure: 'composite',
    color: '#332288',
  },
]
const handleMeasureChange = (event) => {
};
const MeasureResultsTableTitles = ['Measure',
  'Remaining Inclusions',
  'Eligible Population',
  'Numerator',
  'Denominator',
  'Available Exclusions']

describe('Measure Results Table Test', () => {
  test('MeasureResultsTable renders to screen', () => {
    render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={handleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
  })
  describe('Measure Results Table Titles Render', () => {
    render(<MeasureResultsTable
      currentResults={currentResults}
      handleMeasureChange={handleMeasureChange}
      selectedMeasures={selectedMeasures}
      colorMapping={colorMapping}
    />)
    MeasureResultsTableTitles.forEach((title) => {
      test(`Measure Results Table '${title}' renders to screen`, () => {
        
      })
    });
  })
})
