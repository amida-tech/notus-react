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

module.exports = { updateTimestamp, getDatestamp, getAge };
