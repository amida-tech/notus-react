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

const getNumDenValue = (patientValue) => {
  if (Array.isArray(patientValue)) {
    return patientValue.length;
  }
  return patientValue === true ? 1 : 0;
}

const getMeasureCompliance = (patientResult) => {
  const patientDetails = patientResult[patientResult.memberId];
  const detailKeys = Object.keys(patientDetails);
  const numeratorsFound = [];
  const complianceResult = [];
  detailKeys.forEach((key) => {
    if (key.includes('Numerator')) {
      numeratorsFound.push(key);
    }
  });
  numeratorsFound.forEach((numerator, index) => {
    const numValue = getNumDenValue(patientDetails[numerator]);
    let denValue = 0;
    let useIndex = 0;
    if (numeratorsFound.length === 1) {
      denValue = getNumDenValue(patientDetails.Denominator);
    } else {
      useIndex = index + 1;
      denValue = getNumDenValue(patientDetails[`Denominator ${useIndex}`]);
    }
    complianceResult.push(numValue === denValue);
  });
  return complianceResult;
}

module.exports = {
  updateTimestamp, getDatestamp, getAge, getMeasureCompliance,
};
