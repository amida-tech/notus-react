const monthDayOpt = { month: 'short', day: '2-digit' };
const monthOpt = { month: '2-digit' };
const dayOpt = { day: '2-digit' };
const yearOpt = { year: 'numeric' };
const timeOpt = { hour: '2-digit', minute: '2-digit' };
const timeStamper = (givenDate, options) => givenDate.toLocaleString('default', options);

const updateTimestamp = (date) => `${timeStamper(date, monthDayOpt)} ${timeStamper(date, yearOpt)}, ${timeStamper(date, timeOpt)}`;

const getDatestamp = (date) => `${timeStamper(date, monthOpt)}/${timeStamper(date, dayOpt)}/${timeStamper(date, yearOpt)}`;

const msInAYear = 1000 * 60 * 60 * 24 * 365;

const getAge = (date) => {
  const ageInMilliseconds = new Date() - new Date(date);
  return Math.floor(ageInMilliseconds / msInAYear);
}

const getNumDenValue = (memberValue) => {
  if (Array.isArray(memberValue)) {
    return memberValue.length;
  }
  return memberValue === true ? 1 : 0;
}

const getMeasureCompliance = (memberResult) => {
  const memberDetails = memberResult[memberResult.memberId];
  const detailKeys = Object.keys(memberDetails);
  const numeratorsFound = [];
  const complianceResult = [];
  detailKeys.forEach((key) => {
    if (key.includes('Numerator')) {
      numeratorsFound.push(key);
    }
  });
  numeratorsFound.forEach((numerator, index) => {
    const numValue = getNumDenValue(memberDetails[numerator]);
    let denValue = 0;
    let useIndex = 0;
    if (numeratorsFound.length === 1) {
      denValue = getNumDenValue(memberDetails.Denominator);
    } else {
      useIndex = index + 1;
      denValue = getNumDenValue(memberDetails[`Denominator ${useIndex}`]);
    }
    complianceResult.push(numValue === denValue);
  });
  return complianceResult;
}

module.exports = {
  updateTimestamp, getDatestamp, getAge, getMeasureCompliance, getNumDenValue
};
