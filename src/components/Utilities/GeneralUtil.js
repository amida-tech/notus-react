const monthOpt = { month: 'short', day: '2-digit' };
const yearOpt = { year: 'numeric' };
const timeOpt = { hour: '2-digit', minute: '2-digit' };
const timeStamper = (givenDate, options) => givenDate.toLocaleString('default', options);

const updateTimestamp = (date) => `${timeStamper(date, monthOpt)} ${timeStamper(date, yearOpt)}, ${timeStamper(date, timeOpt)}`;

const getAge = (date) => {
  const ageInMilliseconds = new Date() - new Date(date);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
}

module.exports = { updateTimestamp, getAge };
