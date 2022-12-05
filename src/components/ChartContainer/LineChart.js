import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { lineChartOptions } from './D3ContainerUtils';
import {
  displayDataProps,
  colorMapProps,
  storeProps,
  currentTimelineProps,
  graphWidthProps,
} from './D3Props';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
      displayData: props.displayData,
      colorMap: props.colorMap,
      measureInfo: props.measureInfo,
      graphWidth: props.graphWidth,
      currentTimeline: props.currentTimeline,
    };
  }

  componentDidMount() {
    const {
      displayData,
      colorMap,
      measureInfo,
      graphWidth,
      currentTimeline,
    } = this.state

    this.setState({
      chartData: chartStuff.map((chart) => ({
        name: chart.name,
        data: chart.data.map((entry) => entry.value),
      })),
      chartOptions: lineChartOptions(
        displayData,
        colorMap,
        measureInfo,
        graphWidth,
        currentTimeline,
        chartStuff,
      ),
    });
  }

  render() {
    const { chartOptions, chartData } = this.state
    return (
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="line"
        width="100%"
        height="100%"
      />
    );
  }
}

LineChart.propTypes = {
  displayData: displayDataProps,
  colorMap: colorMapProps,
  measureInfo: storeProps,
  currentTimeline: currentTimelineProps,
  graphWidth: graphWidthProps,
};

LineChart.defaultProps = {
  displayData: [],
  colorMap: [],
  measureInfo: [],
  currentTimeline: [],
  graphWidth: 0,
};

export default LineChart;
