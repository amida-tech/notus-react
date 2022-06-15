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

const formatData = (patientData) => {
  const complianceResult = getMeasureCompliance(patientData);
  console.log(complianceResult);
};

module.exports = {
  headerData, pageSize, formatData,
};
