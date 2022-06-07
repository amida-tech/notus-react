const memberIdTip = 'The patient\'s member ID.';
const pageSize = 10;

// These will change based on the measurement.
const headerData = (selectedMeasures, storeInfo) => {
  let headerFlexBasis = 22;
  if (selectedMeasures.length > 4) {
    headerFlexBasis = selectedMeasures.length >= 6 ? 10 : 15;
  }
  let standardFlexBasis = 15;
  if (selectedMeasures.length > 4) {
    standardFlexBasis = selectedMeasures.length >= 6 ? 5 : 10;
  }

  const headerInfo = [
    {
      key: 'label',
      link: true,
      header: 'MemberID',
      tooltip: memberIdTip,
      flexBasis: headerFlexBasis,
    },
  ];
  selectedMeasures.forEach((measureName) => {
    const labelFound = storeInfo[measureName].displayLabel
    headerInfo.push({
      key: measureName,
      link: false,
      header: labelFound,
      tooltip: storeInfo[measureName].title,
      flexBasis: standardFlexBasis,
    })
  });
  return headerInfo
};

const getValue = (patientValue) => {
  if (Array.isArray(patientValue)) {
    return patientValue.length;
  }
  return patientValue === true ? 1 : 0;
}

const allValuesEqual = (valueArray) => {
  const compareValue = valueArray[0].value;
  for (let k = 1; k < valueArray.length; k += 1) {
    if (compareValue !== valueArray[k].value) {
      return false;
    }
  }
  return true;
}

const formatData = (patientResults, selectedMeasures, storeInfo) => {
  const formattedData = [];

  patientResults.forEach((patientResult) => {
    const patientDetails = patientResult[patientResult.memberId]
    const detailKeys = Object.keys(patientDetails)
    const numeratorsFound = [];
    detailKeys.forEach((key) => {
      if (key.includes('Numerator')) {
        numeratorsFound.push(key);
      }
    });
    const patientResultArray = []
    numeratorsFound.forEach((numerator, index) => {
      const numValue = getValue(patientDetails[numerator]);
      let denValue = 0;
      let resultObject = {};
      let useIndex = 0;
      if (numeratorsFound.length === 1) {
        denValue = getValue(patientDetails.Denominator);
      } else {
        useIndex = index + 1;
        denValue = getValue(patientDetails[`Denominator ${useIndex}`]);
      }
      resultObject = {
        memberID: patientResult.memberId,
        measure: selectedMeasures[useIndex],
        label: storeInfo[selectedMeasures[useIndex]].displayLabel,
        value: numValue === denValue,
      };
      patientResultArray.push(resultObject);
    });

    const formattedResult = {
      value: patientResult.memberId,
      label: patientResult.memberId,
      type: 'patient',
    }

    if (patientResultArray.length === 1) {
      formattedResult[selectedMeasures[0]] = patientResultArray[0].value.toString()
    } else {
      formattedResult[selectedMeasures[0]] = allValuesEqual(patientResultArray).toString();
      for (let k = 1; k < selectedMeasures.length; k += 1) {
        formattedResult[selectedMeasures[k]] = patientResultArray[k - 1].value.toString();
      }
    }

    formattedData.push(formattedResult);
  });

  return formattedData;
};

module.exports = {
  headerData, pageSize, formatData,
};
