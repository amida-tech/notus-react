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
  flexBasis: 'standard',
  alignContent: 'center',
};

const eligiblePopulation = {
  key: 'eligible',
  header: 'Eligible Population',
  tooltip: eligiblePopulationTip,
  flexBasis: 'standard',
  alignContent: 'center',
};

const numerator = {
  key: 'numerator',
  header: 'Numerator',
  tooltip: numeratorTip,
  flexBasis: 'standard',
  alignContent: 'center',
};

const denominator = {
  key: 'denominator',
  header: 'Denominator',
  tooltip: denominatorTip,
  flexBasis: 'standard',
  alignContent: 'center',
};

const exclusions = {
  key: 'exclusions',
  header: 'Available Exclusions',
  tooltip: availableExclusionsTip,
  flexBasis: 'standard',
  alignContent: 'center',
};

const headerData = (isComposite) => {
  if (isComposite) {
    return headerInfo;
  }
  return subHeaderInfo;
}

const headerInfo = [
  {
    key: 'label',
    link: true,
    header: 'Measure',
    tooltip: measureTip,
    flexBasis: 'larger',
  },
  inclusions,
  eligiblePopulation,
  numerator,
  denominator,
  exclusions,
]

const subHeaderInfo = [
  {
    key: 'label',
    header: 'Sub-Measure',
    tooltip: measureTip,
    flexBasis: 'larger',
  },
  inclusions,
  eligiblePopulation,
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
  headerData, pageSize, formatData,
};
