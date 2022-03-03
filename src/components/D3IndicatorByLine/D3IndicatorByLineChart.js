import * as d3 from 'd3';
import React, {
    useContext, useRef
} from 'react';
import { byLineDisplayDataContext } from '../D3Container/ChartContainer';

function D3IndicatorByLineChart() {

    const { byLineDisplayData, setByLinedisplayData } = useContext(byLineDisplayDataContext);

    // Binder for react to apply changes to the svg
    const D3IndictaorLineChart = useRef();

    // Date Parser
    const parseDate = d3.timeParse('%Y-%m-%d')

    // Basic Styling consts to be used later
    const margin = {
        top: 50, right: 30, bottom: 75, left: 30,
    };
    const width = (window.innerWidth || document.body.clientWidth) - 100// parseInt(d3.select('#d3-line-chart').style('width')); //NOSONAR
    const height = 500;
    const tickCount = byLineDisplayData.length;

    // Clear previous SVG
    d3.select(D3IndictaorLineChart.current).selectAll('*').remove();

    // SVG constrol and also styling
    const svg = d3.select(D3IndictaorLineChart.current)
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'white')
        .style('color', 'black')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Generates labels and context for x axis
    const x = d3.scaleTime()
        // What data we're measuring
        .domain(d3.extent(byLineDisplayData, (d) => parseDate(d.date.split('T')[0])))
        // The 'width' of the data
        .range([0, width + margin.left]);

    // X Axis labels and context
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(tickCount).tickFormat(d3.timeFormat('%d-%b-%Y')));

    // Generates Label and context for y axis
    d3.max(byLineDisplayData, (d) => d.value);

    const y = d3.scaleLinear()
        .domain([0, 5])
        .range([height - margin.bottom, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    // Grid
    // gridlines in x axis function
    function makeXGridlines() {
        return d3.axisBottom(x)
            .ticks(tickCount)
    }

    // gridlines in y axis function
    function makeYGridlines() {
        return d3.axisLeft(y)
            .ticks(10)
    }

    // add the X gridlines
    svg.append('g')
        .attr('class', 'axis-grid')
        .attr('transform', `translate(0,${height})`)
        .call(makeXGridlines()
            .tickSize(-(height))
            .tickFormat(''))

    // add the Y gridlines
    svg.append('g')
        .attr('class', 'axis-grid')
        .call(makeYGridlines()
            .tickSize(-width)
            .tickFormat(''))

    d3.selectAll('.axis-grid line').style('stroke', 'lightgray')

    // Generates the actual line
    const line = d3.line()
        // .curve(d3.curveCardinal)
        .x((d) => x(parseDate(d.date.split('T')[0])))
        .y((d) => y(d.value / 20));

    // Iterates through an array variation.

    svg.append('path')
        .datum(byLineDisplayData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('opacity', '.33')
        .attr('stroke-width', 2)
        .attr('d', line)
        .on('mouseover', (event) => {
            d3.select(event.currentTarget).attr('opacity', '1');
        })
        .on('mouseout', (event) => {
            d3.select(event.currentTarget).attr('opacity', '.33');
        });


    return (
        <div id="d3-line-chart">
            <svg ref={D3IndictaorLineChart} />
        </div>
    )
}

export default D3IndicatorByLineChart;