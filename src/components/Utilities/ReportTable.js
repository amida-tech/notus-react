const { getMeasureCompliance } = require('./GeneralUtil');

const pageSize = 15;

const headerData = [
  {
    key: 'measure',
    header: 'Measure',
    flexBasis: 'standard',
    rowType: 'text',
  },
  {
    key: 'type',
    header: 'Type',
    flexBasis: 'standard',
    rowType: 'text',
  },
  {
    key: 'status',
    header: 'Status',
    flexBasis: 'standard',
    rowType: 'icon',
    extraInfo: true, // Has compliance subtitle.
  },
  {
    key: 'exclusions',
    header: 'Exclusions',
    flexBasis: 'standard',
    rowType: 'icon',
  },
  {
    key: 'practitioner',
    header: 'Practitioner',
    flexBasis: 'standard',
    rowType: 'array',
  },
  {
    key: 'dates',
    header: 'Dates',
    flexBasis: 'standard',
    rowType: 'array',
  },
  {
    key: 'conditions',
    header: 'Conditions',
    flexBasis: 'extended',
    rowType: 'array',
    extraInfo: true, // Has icons.
  },
  {
    key: 'recommendations',
    header: 'Recommendations',
    flexBasis: 'extended',
    rowType: 'text',
  },
]

const formatData = (patientData, selectedMeasure, storeInfo) => {
  const complianceResult = getMeasureCompliance(patientData);
  const measureData = patientData[patientData.memberId];
  const measureList = Object.keys(storeInfo).filter((key) => key.includes(selectedMeasure));

  const formattedData = [];
  formattedData.push({
    value: measureList[0],
    measure: storeInfo[measureList[0]].displayLabel,
    type: 'Measure',
    status: complianceResult.every((entry) => entry),
    exclusions: measureData.Exclusions,
    practitioner: 'N/A',
    dates: 'N/A',
    conditions: 'N/A',
    recommendations: 'N/A',
  });

  if (complianceResult.length === 1) {
    return formattedData;
  }

  complianceResult.forEach((result, index) => {
    formattedData.push({
      value: measureList[index + 1],
      measure: storeInfo[measureList[index + 1]].displayLabel,
      type: 'Sub-Measure',
      status: result,
      exclusions: measureData[`Exclusions ${index + 1}`],
      practitioner: 'N/A',
      dates: 'N/A',
      conditions: 'N/A',
      recommendations: 'N/A',
    });
  });

  return (formattedData);
};

module.exports = {
  headerData, pageSize, formatData,
};
