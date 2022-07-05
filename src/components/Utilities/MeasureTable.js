const measureTip = 'The actual measure. At the moment, these are always HEDIS measures. (Hover over measures and table headers to view description)';
const subMeasureTip = 'Hover over sub-measures to view description, for more information click sub-measure to go to NCQA to receive further information.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of members who are eligible for this measure.';
const numeratorTip = 'The number of members who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of members who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

const pageSize = 10;

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
    flexBasis: 'large',
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
    tooltip: subMeasureTip,
    flexBasis: 'large',
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
