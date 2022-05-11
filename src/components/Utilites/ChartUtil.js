/* eslint-disable no-underscore-dangle */
const TickChange = (ChartType) => {
  const ticksFoundOnXAxis = document.querySelectorAll('.d3-chart__dates-x > .tick > line');
  const ratingPercentTickLinesFoundY = document.querySelectorAll('.d3-chart__rating-y > .tick > line');
  const ratingPercentTextFoundY = document.querySelectorAll('.d3-chart__rating-y > .tick > text');
  const DomainsFound = document.querySelectorAll('.domain');

  if (ChartType === 'D3Chart') {
    // Removes numbers of Y-axis on 10,30,50,70 and 90.
    ratingPercentTextFoundY.forEach((ratingPercent) => {
      const newRatingPercent = ratingPercent;
      if (newRatingPercent.innerHTML % 20 > 0) {
        newRatingPercent.style.display = 'none';
      } else { // Adds a Percent sign to the end of the rest.
        newRatingPercent.innerHTML = `${newRatingPercent.innerHTML}%`;
      }
    })
    // Removes ticks above dates on x-axis.
    ticksFoundOnXAxis.forEach((ticksFound) => {
      const newTicksFound = ticksFound;
      newTicksFound.style.display = 'none';
    })

    // Removes ticks of y-axis on 10, 30, 50, 70 and 90.
    ratingPercentTickLinesFoundY.forEach((ratingPercent) => {
      setOddPercentsToDisplayNone(ratingPercent);
    })

    // Removes X-axis line
    DomainsFound[0].style.display = 'none';
  } else {
    // X-axis tick lines
    const tickLinesFoundLineChartX = document.querySelectorAll(
      '.d3-indicator-by-line-chart__dates-x > .tick > line',
    );

    // Y-axis tick lines
    const ratingPercentTickLinesFoundLineChartY = document.querySelectorAll(
      '.d3-indicator-by-line-chart__rating-y > .tick > line',
    );
    // Y-axis text
    const ratingPercentTextFoundLineChartY = document.querySelectorAll(
      '.d3-indicator-by-line-chart__rating-y > .tick > text',
    );
    // Remove ticks above dates on x-axis
    tickLinesFoundLineChartX.forEach((tickLines) => {
      const newTickLines = tickLines;
      newTickLines.style.display = 'none';
    });

    // Removes X-axis line
    DomainsFound[0].style.display = 'none';

    // Removes ticks of y-axis on 10, 30, 50, 70 and 90.
    ratingPercentTickLinesFoundLineChartY.forEach((ratingPercent) => {
      setOddPercentsToDisplayNone(ratingPercent);
    })

    // Removes numbers of Y-axis on 10,30,50,70 and 90.
    ratingPercentTextFoundLineChartY.forEach((ratingPercent) => {
      const newRatingPercent = ratingPercent;
      if (newRatingPercent.innerHTML % 20 > 0) {
        newRatingPercent.style.display = 'none';
      } else {
        // Adds a Percent sign to the end of the rest.
        newRatingPercent.innerHTML = `${newRatingPercent.innerHTML}%`
      }
    })
  }
};

function setOddPercentsToDisplayNone(ratingPercent) {
  const newRatingPercent = ratingPercent;
  if (newRatingPercent.__data__ % 20 > 0) {
    newRatingPercent.style.display = 'none';
  }
}

const TimelineOptions = [
  { value: 'all', label: 'All Available' },
  { value: '30', label: 'Last 30 Days' },
  { value: '60', label: 'Last 60 Days' },
  { value: '90', label: 'Last 90 Days' },
  { value: 'YTD', label: 'Year to Date' },
];

module.exports = { TickChange, TimelineOptions };
