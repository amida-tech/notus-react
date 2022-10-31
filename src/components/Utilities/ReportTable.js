const { getMeasureCompliance } = require('./GeneralUtil');

const pageSize = 15;

const headerData = [
  {
    key: 'measure',
    header: 'Measure',
    flexBasis: 'small',
    rowType: 'text',
  },
  {
    key: 'type',
    header: 'Type',
    flexBasis: 'small',
    rowType: 'text',
  },
  {
    key: 'status',
    header: 'Status',
    flexBasis: 'small',
    rowType: 'icon',
    extraInfo: true, // Has compliance subtitle.
  },
  {
    key: 'exclusions',
    header: 'Exclusions',
    flexBasis: 'small',
    rowType: 'icon',
  },
  {
    key: 'practitioner',
    header: 'Practitioner',
    flexBasis: 'small',
    rowType: 'array',
  },
  {
    key: 'dates',
    header: 'Dates',
    flexBasis: 'small',
    rowType: 'array',
  },
  {
    key: 'conditions',
    header: 'Conditions',
    flexBasis: 'large',
    rowType: 'array',
    extraInfo: true, // Has icons.
  },
  {
    key: 'recommendations',
    header: 'Recommendations',
    flexBasis: 'large',
    rowType: 'text',
  },
]

const formatData = (memberData, selectedMeasure, storeInfo) => {
  const complianceResult = getMeasureCompliance(memberData);
  const measureData = memberData[memberData.memberId];
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
    // RECOMMENDATION IS PULLED FROM storeInfo THIS IS FOR MEASURES WITH NO SUBMEASURES
    recommendations: storeInfo[measureList[0]].recommendation || ['No current recommendations found'],
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
      // RECOMMENDATION IS PULLED FROM storeInfo THIS IS FOR MEASURES WITH SUBMEASURES
      recommendations: storeInfo[measureList[index + 1]].recommendation || ['No current recommendations found'],
    });
  });

  return (formattedData);
};

module.exports = {
  headerData, pageSize, formatData,
};
