const measureTip = 'The actual measure. At the moment, these are always HEDIS measures.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of patients who are eligible for this measure.';
const numeratorTip = 'The number of patients who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of patients who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

const pageSize = 5;

const headerInfo = [
  {
    text: 'Measure',
    tooltip: measureTip,
    flexBasis: 22,
  },
  {
    text: 'Remaining Inclusions',
    tooltip: remainingInclusionsTip,
    flexBasis: 14,
  },
  {
    text: 'Eligible Population',
    tooltip: eligiblePopulationTip,
    flexBasis: 14,
  },
  {
    text: 'Numerator',
    tooltip: numeratorTip,
    flexBasis: 14,
  },
  {
    text: 'Denominator',
    tooltip: denominatorTip,
    flexBasis: 14,
  },
  {
    text: 'Available Exclusions',
    tooltip: availableExclusionsTip,
    flexBasis: 14,
  },
]

const subHeaderInfo = [
  {
    text: 'Sub-Measure',
    tooltip: measureTip,
    flexBasis: 22,
  },
  {
    text: 'Remaining Inclusions',
    tooltip: remainingInclusionsTip,
    flexBasis: 14,
  },
  {
    text: 'Eligible Population',
    tooltip: eligiblePopulationTip,
    flexBasis: 14,
  },
  {
    text: 'Numerator',
    tooltip: numeratorTip,
    flexBasis: 14,
  },
  {
    text: 'Denominator',
    tooltip: denominatorTip,
    flexBasis: 14,
  },
  {
    text: 'Available Exclusions',
    tooltip: availableExclusionsTip,
    flexBasis: 14,
  },
]

const formatData = (currentResults) => {
  const formattedData = [];
  currentResults.forEach((measureResult) => {
    formattedData.push({
      value: measureResult.measure,
      label: measureResult.label,
      type: 'measure',
      included: measureResult.initialPopulation - measureResult.exclusions,
      eligible: measureResult.initialPopulation,
      numerator: measureResult.numerator,
      denominator: measureResult.denominator,
      exclusions: measureResult.exclusions,
    });
  });
  return formattedData;
};

module.exports = {
  headerInfo, subHeaderInfo, pageSize, formatData,
};
