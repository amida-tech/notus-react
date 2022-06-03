const memberIdTip = 'The patient\'s member ID.';
const pageSize = 10;

// These will change based on the measurement.
const headerData = () => headerInfo;

const headerInfo = [
  {
    key: 'label',
    link: true,
    header: 'MemberID',
    tooltip: memberIdTip,
    flexBasis: 22,
  },
];

const formatData = (patientResults) => {
  const formattedData = [];
  patientResults.forEach((result) => {
    formattedData.push({
      value: result.memberId,
      label: result.memberId,
      type: 'patient',
    });
  });
  return formattedData;
};

module.exports = {
  headerData, pageSize, formatData,
};
