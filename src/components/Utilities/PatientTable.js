const { getMeasureCompliance } = require('./GeneralUtil');

const memberIdTip = 'The patient\'s member ID.';
const pageSize = 10;

// These will change based on the measurement.
const headerData = (selectedMeasures, storeInfo) => {
  let standardFlexBasis = 'medium';
  if (selectedMeasures.length > 4) {
    standardFlexBasis = selectedMeasures.length >= 6 ? 'smaller' : 'small';
  }

  const headerInfo = [
    {
      key: 'label',
      link: true,
      header: 'MemberID',
      tooltip: memberIdTip,
      flexBasis: 'larger',
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
  return headerInfo;
};

const allValuesEqual = (valueArray) => {
  const compareValue = valueArray[0].value;
  for (let k = 1; k < valueArray.length; k += 1) {
    if (compareValue !== valueArray[k].value) {
      return false;
    }
  }
  return true;
}

const formatData = (patientResults, activeMeasure, storeInfo, tableFilter) => {
  const formattedData = [];
  const subMeasures = Object.keys(storeInfo).filter((item) => item.includes(activeMeasure));
  patientResults.forEach((patientResult) => {
    const patientResultArray = [];
    const complianceResult = getMeasureCompliance(patientResult);
    if (complianceResult.length === 1) {
      patientResultArray.push({
        memberID: patientResult.memberId,
        measure: subMeasures[0],
        label: storeInfo[subMeasures[0]].displayLabel,
        value: complianceResult[0],
      });
    } else {
      complianceResult.forEach((result, index) => {
        patientResultArray.push({
          memberID: patientResult.memberId,
          measure: subMeasures[index + 1],
          label: storeInfo[subMeasures[index + 1]].displayLabel,
          value: result,
        });
      });
    }

    const formattedResult = {
      value: patientResult.memberId,
      label: patientResult.memberId,
      type: 'patient',
    }

    if (patientResultArray.length === 1) {
      formattedResult[subMeasures[0]] = patientResultArray[0].value.toString()
    } else {
      formattedResult[subMeasures[0]] = allValuesEqual(patientResultArray).toString();
      for (let k = 1; k < subMeasures.length; k += 1) {
        formattedResult[subMeasures[k]] = patientResultArray[k - 1].value.toString();
      }
    }

    formattedData.push(formattedResult);
  });

  return filterByNonCompliance(formattedData, subMeasures, tableFilter);
};

const nonComplianceRange = {
  one: 2,
  two: 3,
  many: 4,
}

const filterByNonCompliance = (formattedData, subMeasures, tableFilter) => {
  if (tableFilter === '') {
    return formattedData;
  }
  const filteredData = [];
  if (subMeasures.length === 1) {
    formattedData.forEach((score) => {
      if (score[subMeasures[0]] === 'false') {
        filteredData.push(score);
      }
    });
    return filteredData;
  }
  const limit = nonComplianceRange[tableFilter] < 4
    ? (check) => check === nonComplianceRange[tableFilter]
    : (check) => check >= nonComplianceRange[tableFilter];
  formattedData.forEach((score) => {
    let nonComplianceCheck = 0;
    subMeasures.forEach((measure) => {
      if (score[measure] === 'false') {
        nonComplianceCheck += 1;
      }
    });
    if (limit(nonComplianceCheck)) {
      filteredData.push(score);
    }
  });
  return filteredData;
}

module.exports = {
  headerData, pageSize, formatData,
};
