/* eslint-disable no-underscore-dangle */
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { TickChange, TimelineOptions } from '../Utilities/ChartUtil';
import { colorMappingProps } from './D3Props';

// TODO: REMOVE DEFAULT COLOR LOGIC

function D3Chart({
  displayData, colorMapping, measureInfo, graphWidth, currentTimeline,
}) {
  // Binder for react to apply changes to the svg
  const D3LineChart = useRef();

  // Date Parser
  const parseDate = d3.timeParse('%Y-%m-%d');

  // Data manipulation
  const workingList = [];
  const dataCounts = {};
  displayData.forEach((item) => {
    if (dataCounts[item.measure]) {
      dataCounts[item.measure] += 1;
    } else {
      dataCounts[item.measure] = 1;
    }

    workingList.push(item.measure)
  });
  const measureList = Array.from(new Set(workingList));
  let dataCount = 0;
  Object.keys(dataCounts).forEach((key) => {
    if (dataCounts[key] > dataCount) {
      dataCount = dataCounts[key];
    }
  });

  // Basic Styling consts to be used later
  const margin = {
    top: 50,
    right: 30,
    bottom: 75,
    left: 45,
  };

  const width = graphWidth - 220;
  const height = 500;
  const maxTickCount = width / 100;
  const tickCount = dataCount > maxTickCount ? maxTickCount : dataCount;

  function TimeFormatter(dateToFormat) {
    const dateSplit = dateToFormat.split('T')[0];
    const dividedDate = dateSplit.split('-');

    return `Date: ${dividedDate[1]}-${dividedDate[2]}-${dividedDate[0]}`;
  }

  useEffect(() => {
    // Clear previous SVG
    d3.select(D3LineChart.current).selectAll('*').remove();

    // SVG constrol and also styling
    const svg = d3
      .select(D3LineChart.current)
      .attr('class', 'd3-chart__line-chart')
      .append('g')
      .attr('transform', `translate(${margin.left + 50},${margin.top})`);

    // Generates labels and context for x axis
    const x = d3.scaleTime() // What data we're measuring
      .domain(d3.extent(displayData, (d) => parseDate(d.date.split('T')[0])))
      // The 'width' of the data
      .range([0, width]);

    // X Axis labels and context
    svg
      .append('g')
      .attr('transform', `translate(0,${height - (margin.bottom / 1.2)})`)
      .attr('class', 'd3-chart__dates-x')
      .call(
        d3.axisBottom(x).ticks(tickCount).tickFormat(d3.timeFormat('%b %d')),
      );

    // Generates Label and context for y axis
    d3.max(displayData, (d) => d.value);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, 0]);

    svg.append('g').attr('class', 'd3-chart__rating-y').call(d3.axisLeft(y));

    // Grid
    // gridlines in x axis function
    function makeXGridlines() {
      return d3.axisBottom(x).ticks(tickCount);
    }

    // gridlines in y axis function
    function makeYGridlines() {
      return d3.axisLeft(y).ticks(5);
    }

    // add the X gridlines
    svg
      .append('g')
      .attr('class', 'd3-chart__x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(makeXGridlines().tickSize(-height).tickFormat(''));

    // add the Y gridlines
    svg
      .append('g')
      .attr('class', 'd3-chart__y-axis')
      .call(makeYGridlines().tickSize(-width).tickFormat(''));

    d3.selectAll('.axis-grid line').style('stroke', 'lightgray');

    // X axis label:
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height)
      .attr('class', 'd3-chart__label')
      .text(TimelineOptions.find((option) => option.value === currentTimeline.choice).label)

    // Y axis label:
    svg
      .append('text')
      .attr('class', 'd3-chart__label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left - 25)
      .attr('x', -margin.top - 160)
      .text('Percent');

    // Change Ticks to Percent
    TickChange();
    // Generates the actual line
    const line = d3
      .line()
      .curve(d3.curveCardinal)
      .x((d) => x(parseDate(d.date.split('T')[0])))
      .y((d) => y(d.value));
    // Tool Tips
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-chart__tooltip');
    const toolTipGenerator = (event) => {
      const normalizeTicks = dataCount - event.srcElement.__data__.length;
      const tickWidth = (width / (dataCount - 1));
      const index = Math.floor((event.offsetX - 84) / (tickWidth)) - normalizeTicks;
      if (event.srcElement.__data__.length <= index) {
        return '';
      }

      const MeasureValue = measureInfo[
        event.srcElement.__data__[index].measure
      ].displayLabel
      const measureDisplay = MeasureValue === 'Composite' ? `${MeasureValue} Score` : `Measure: ${MeasureValue}`;
      const valueDisplay = `Value: ${
        Math.floor(event.srcElement.__data__[index].value * 100) / 100
      }%`;
      const dateDisplay = TimeFormatter(event.srcElement.__data__[index].date);
      tooltip.text(`${measureDisplay} \n ${valueDisplay} \n ${dateDisplay}`);
      const { color } = colorMapping.find(
        (mapping) => mapping.value === event.target.__data__[0].measure,
      ) || '#000';
      const leftPosition = (event.pageX > width) ? event.pageX - 176 : event.pageX + 10
      return tooltip
        .attr('data-html', 'true')
        .style('background-color', color)
        .style('visibility', 'visible')
        .style('width', '168px')
        .style('top', `${event.pageY - 10}px`)
        .style('left', `${leftPosition}px`);
    };

    // Iterates through an array variation.
    if (measureList.length > 0) {
      measureList.forEach((measure) => {
        svg
          .append('path')
          .datum(displayData.filter((item) => item.measure === measure))
          .attr('fill', 'none')
          .attr(
            'stroke',
            colorMapping.find((mapping) => mapping.value === measure)?.color || '#000',
          )
          .attr('opacity', '.50')
          .attr('stroke-width', 5)
          .attr('d', line)
          .on('mouseover', (event) => {
            d3.select(event.currentTarget).attr('opacity', '1');
            toolTipGenerator(event);
          })
          .on('mousemove', (event) => toolTipGenerator(event))
          .on('mouseout', (event) => {
            d3.select(event.currentTarget).attr('opacity', '.50');
            return tooltip.style('visibility', 'hidden');
          });
      });
    }
    // Create line at end of chart to make it a complete box
    svg.append('line')
      .attr('x1', width)
      .attr('y1', 0)
      .attr('x2', width)
      .attr('y2', height - margin.bottom)
      .style('stroke-width', 1)
      .style('stroke', '#CFD8DC')
      .style('fill', 'none');
  });
  return (
    <div className="d3-chart">
      <svg ref={D3LineChart} />
    </div>
  );
}

D3Chart.propTypes = {
  displayData: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
  measureInfo: PropTypes.shape({
    displayLabel: PropTypes.string,
  }),
  colorMapping: colorMappingProps,
  graphWidth: PropTypes.number,
  currentTimeline: PropTypes.shape({
    choice: PropTypes.string,
    range: PropTypes.arrayOf(PropTypes.string),
  }),
};

D3Chart.defaultProps = {
  displayData: [],
  measureInfo: {},
  colorMapping: [],
  graphWidth: 0,
  currentTimeline: {
    choice: 'all',
    range: [null, null],
  },

};

export default D3Chart;
