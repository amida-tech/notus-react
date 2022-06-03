const memberIdTip = 'The patient\'s member ID.';
const pageSize = 10;

// These will change based on the measurement.
const headerData = (selectedMeasures, measure, storeInfo) => {
  const headerInfo = [
    {
      key: 'label',
      link: true,
      header: 'MemberID',
      tooltip: memberIdTip,
      flexBasis: selectedMeasures.length > 4 ? selectedMeasures.length >= 6 ? 10 : 15 : 22,
    },
  ];
  selectedMeasures.forEach((measureName) => {
    const labelFound = storeInfo[measureName].displayLabel
    headerInfo.push({
      key: measureName,
      link: true,
      header: labelFound,
      // tooltip: memberIdTip,
      flexBasis: selectedMeasures.length > 4 ? selectedMeasures.length >= 6 ? 5 : 10 : 15,
    })
  })
  return headerInfo
};

const formatData = (patientResults, selectedMeasures, storeInfo) => {
  const formattedData = [];
  const numeratorValues = []
  const denominatorsValues = []

  for (let i = 0; i < patientResults.length; i += 1) {
    const patientDetails = patientResults[i][patientResults[i].memberId]
    const detailKeys = Object.keys(patientDetails)
    const denominatorsFound = []
    const numeratorsFound = []
    detailKeys.forEach((key) => {
      if (key.includes('Numerator')) {
        numeratorsFound.push(key)
      } else if (key.includes('Denominator')) {
        denominatorsFound.push(key)
      }
    })
    numeratorsFound.forEach((numerator, index) => {
      const numValue = patientDetails[numerator]
      const numeratorObject = {
        memberID: patientResults[i].memberId,
        measure: selectedMeasures[index + 1],
        label: storeInfo[selectedMeasures[index + 1]].displayLabel,
        [numerator]: numValue,
      }
      numeratorValues.push(numeratorObject)
    })
    denominatorsFound.forEach((denominators, index) => {
      const denValue = patientDetails[denominators]
      const denominatorsObject = {
        memberID: patientResults[i].memberId,
        measure: selectedMeasures[index + 1],
        label: storeInfo[selectedMeasures[index + 1]].displayLabel,
        [denominators]: denValue,
      }
      denominatorsValues.push(denominatorsObject)
    })

    formattedData.push({
      value: patientResults[i].memberId,
      label: patientResults[i].memberId,
      type: 'patient',
      included: 1,
      numeratorValues: 1,
      numerator: 1,
      denominator: 1,
      exclusions: 1,

    });

    
  }

  return formattedData;
};

module.exports = {
  headerData, pageSize, formatData,
};
