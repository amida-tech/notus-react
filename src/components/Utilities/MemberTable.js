const { resultList } = require('test/data/DemoData');
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
  one: 1,
  two: 2,
  many: 3,
}

const filterByNonCompliance = (formattedData, subMeasures, tableFilter) => {

  // const ns = structuredClone(formattedData)
  // console.log('PRE-GAME>>>>>>>>>',
  //             'formatted data:', formattedData,
  //             'cloned data:', ns,
  //             'filter array:', tableFilter
  // )

  // this returns unfiltered data
  if (tableFilter.length === 0) {
    return formattedData;
  }
  const filteredData = [];

  // this returns data with only one filter applied
  if (tableFilter.length === 1) {
    const filterVal = tableFilter[0]
    const ns = structuredClone(formattedData)

    if (Object.keys(nonComplianceRange).includes(filterVal)) {
      ns.forEach((measure) => {
        const resultList = Object.values(measure).filter(submeasure => submeasure === 'false')

        if (resultList.length === nonComplianceRange[filterVal] && nonComplianceRange[filterVal] <= 2) {
          filteredData.push(measure)
        }
        if (resultList.length >= nonComplianceRange[filterVal] && nonComplianceRange[filterVal] > 2) {
          filteredData.push(measure)
        }
      })

      // console.log('SINGLE FILTER POST GAME>>>>>>>>>',
      //         'formatted data:', formattedData,
      //         'cloned data:', ns,
      //         'filter array:', tableFilter,
      //         'filtered data:', filteredData
      // )

      return filteredData;
    }
  }

  // AISE TEST RESULTS
  // ALL 242
  // TWO 60
  // MULTI 73
  // TWO MULTI EXPECTED 133
  // SUCCESS!!

  // this returns data with multiple filters selected
  // AISE makes for the best to test this
  if (tableFilter.length > 1) {
    const ns = structuredClone(formattedData)

    console.log('our table filters:', tableFilter)

    tableFilter.forEach((filterVal) => {
      console.log('filter to be worked:', filterVal)

      ns.forEach((measure) => {
        console.log('measure to be worked:', measure)
        const resultList = Object.values(measure).filter(submeasure => submeasure === 'false')

        if (resultList.length === nonComplianceRange[filterVal] && nonComplianceRange[filterVal] <= 2) {
          filteredData.push(measure)
        }
        if (resultList.length >= nonComplianceRange[filterVal] && nonComplianceRange[filterVal] > 2) {
          filteredData.push(measure)
        }
      })

      console.log('our filtered data to deliver:', filteredData)
      return filteredData
    })
  }
}

module.exports = {
  headerData, pageSize, formatData,
};
