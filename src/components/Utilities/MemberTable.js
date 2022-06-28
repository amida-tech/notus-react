const { getMeasureCompliance } = require('./GeneralUtil');

const memberIdTip = 'The member\'s member ID.';
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

const formatData = (memberResults, activeMeasure, storeInfo, tableFilter) => {
  const formattedData = [];
  const subMeasures = Object.keys(storeInfo).filter((item) => item.includes(activeMeasure));
  memberResults.forEach((memberResult) => {
    const memberResultArray = [];
    const complianceResult = getMeasureCompliance(memberResult);
    if (complianceResult.length === 1) {
      memberResultArray.push({
        memberID: memberResult.memberId,
        measure: subMeasures[0],
        label: storeInfo[subMeasures[0]].displayLabel,
        value: complianceResult[0],
      });
    } else {
      complianceResult.forEach((result, index) => {
        memberResultArray.push({
          memberID: memberResult.memberId,
          measure: subMeasures[index + 1],
          label: storeInfo[subMeasures[index + 1]]?.displayLabel,
          value: result,
        });
      });
    }

    const formattedResult = {
      value: memberResult.memberId,
      label: memberResult.memberId,
      type: 'member',
    }

    if (memberResultArray.length === 1) {
      formattedResult[subMeasures[0]] = memberResultArray[0].value.toString()
    } else {
      formattedResult[subMeasures[0]] = allValuesEqual(memberResultArray).toString();
      for (let k = 1; k < subMeasures.length; k += 1) {
        formattedResult[subMeasures[k]] = memberResultArray[k - 1].value.toString();
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

  // this returns unfiltered data
  if (tableFilter.length === 0) {
    return formattedData;
  }
  const filteredData = [];

  console.log('tableFilter paramaters before we filter the data:', tableFilter)
  console.log('Formatted data to filter:', formattedData)
  console.log('Submeasures:', subMeasures)

  // this checks that if there is only one submeasure, it goes through each submeasure parameter and adds up the score
  // I think this is only for the composite data set or like, AAB? it seems to work fine
  if (subMeasures.length === 1) {
    formattedData.forEach((score) => {
      if (score[subMeasures[0]] === 'false') {
        filteredData.push(score);
      }
    });
    return filteredData;
  }

  // filtering for ONLY TWO non compliance
  if (tableFilter.includes("two")) {

    // this is what I start with
    console.log(formattedData)

    formattedData.forEach((measure) => {
      console.log('our measure:', measure)
      // I feel like I want to reduce here
    })

    // this is what should be filtered now
    console.log(filteredData)
    return filteredData
  }
}

module.exports = {
  headerData, pageSize, formatData,
};
