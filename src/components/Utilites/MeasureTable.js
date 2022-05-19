const measureTip = 'The actual measure. At the moment, these are always HEDIS measures.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of patients who are eligible for this measure.';
const numeratorTip = 'The number of patients who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of patients who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

const pageSize = 5;

const inclusions = {
  key: 'included',
  header: 'Remaining Inclusions',
  tooltip: remainingInclusionsTip,
  flexBasis: 14,
  alignContent: 'center',
};

const eliigiblePopulation = {
  key: 'eligible',
  header: 'Eligible Population',
  tooltip: eligiblePopulationTip,
  flexBasis: 14,
  alignContent: 'center',
};

const numerator = {
  key: 'numerator',
  header: 'Numerator',
  tooltip: numeratorTip,
  flexBasis: 14,
  alignContent: 'center',
};

const denominator = {
  key: 'denominator',
  header: 'Denominator',
  tooltip: denominatorTip,
  flexBasis: 14,
  alignContent: 'center',
};

const exclusions = {
  key: 'exclusions',
  header: 'Available Exclusions',
  tooltip: availableExclusionsTip,
  flexBasis: 14,
  alignContent: 'center',
};

const headerInfo = [
  {
    key: 'label',
    header: 'Measure',
    tooltip: measureTip,
    flexBasis: 22,
  },
  inclusions,
  eliigiblePopulation,
  numerator,
  denominator,
  exclusions,
]

const subHeaderInfo = [
  {
    key: 'label',
    header: 'Sub-Measure',
    tooltip: measureTip,
    flexBasis: 22,
  },
  inclusions,
  eliigiblePopulation,
  numerator,
  denominator,
  exclusions,
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
