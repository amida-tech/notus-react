const measureTip = 'The actual measure. At the moment, these are always HEDIS measures. (Hover over measures and table headers to view description)';
const subMeasureTip = 'Hover over sub-measures to view description, for more information click sub-measure to go to NCQA to receive further information.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of members who are eligible for this measure.';
const numeratorTip = 'The number of members who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of members who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

const measureLinks = [
  { measure: 'aab', link: 'https://www.ncqa.org/hedis/measures/avoidance-of-antibiotic-treatment-for-acute-bronchitis-bronchiolitis/' },
  { measure: 'adde', link: 'https://www.ncqa.org/hedis/measures/follow-up-care-for-children-prescribed-adhd-medication/' },
  { measure: 'aise', link: 'https://www.ncqa.org/hedis/measures/adult-immunization-status/' },
  { measure: 'apme', link: 'https://www.ncqa.org/hedis/measures/metabolic-monitoring-for-children-and-adolescents-on-antipsychotics/' },
  { measure: 'asfe', link: 'https://www.ncqa.org/hedis/measures/unhealthy-alcohol-use-screening-and-follow-up/' },
  { measure: 'bcse', link: 'https://www.ncqa.org/hedis/measures/breast-cancer-screening/' },
  { measure: 'ccs', link: 'https://www.ncqa.org/hedis/measures/cervical-cancer-screening/' },
  { measure: 'cise', link: 'https://www.ncqa.org/hedis/measures/childhood-immunization-status/' },
  { measure: 'cole', link: 'https://www.ncqa.org/hedis/measures/colorectal-cancer-screening/' },
  { measure: 'cou', link: 'https://www.ncqa.org/hedis/measures/risk-of-continued-opioid-use/' },
  { measure: 'cwp', link: 'https://www.ncqa.org/hedis/measures/appropriate-testing-for-pharyngitis/' },
  { measure: 'dmse', link: 'https://www.ncqa.org/hedis/measures/utilization-of-the-phq-9-to-monitor-depression-symptoms-for-adolescents-and-adults/' },
  { measure: 'drre', link: 'https://www.ncqa.org/hedis/measures/depression-remission-or-response-for-adolescents-and-adults/' },
  { measure: 'dsfe', link: 'https://www.ncqa.org/hedis/measures/depression-screening-and-follow-up-for-adolescents-and-adults/' },
  { measure: 'fum', link: 'https://www.ncqa.org/hedis/measures/follow-up-after-emergency-department-visit-for-mental-illness/' },
  { measure: 'imae', link: 'https://www.ncqa.org/hedis/measures/immunizations-for-adolescents/' },
  { measure: 'pdse', link: 'https://www.ncqa.org/hedis/measures/postpartum-depression-screening-and-follow-up/' },
  { measure: 'pnde', link: 'https://www.ncqa.org/hedis/measures/prenatal-depression-screening-and-followup/' },
  { measure: 'prse', link: 'https://www.ncqa.org/hedis/measures/prenatal-immunization-status/' },
  { measure: 'psa', link: 'https://www.ncqa.org/hedis/measures/non-recommended-psa-based-screening-in-older-men/' },
  { measure: 'uop', link: 'https://www.ncqa.org/hedis/measures/use-of-opioids-from-multiple-providers/' },
  { measure: 'uri', link: 'https://www.ncqa.org/hedis/measures/appropriate-treatment-for-upper-respiratory-infection/' },
]

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
  headerData, pageSize, formatData, measureLinks,
};
