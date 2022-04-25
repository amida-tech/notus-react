import {
  Grid, Tab, Tabs,
} from '@mui/material';
import React, {
  createContext, useState, useEffect,
} from 'react';
import ChartBar from './ChartBar';
import D3Chart from './D3Chart';
import D3IndicatorByLineSelector from './D3IndicatorByLineSelector';
import D3IndicatorByLineChart from './D3IndicatorByLineChart';
import TabPanel from '../Common/TabPanel';
import FilterDrawer from '../FilterMenu/FilterDrawer';
import MeasureResultsTable from '../MeasureResults/MeasureResultsTable';
import {
  storeProps,
  dashboardStateProps,
  dashboardActionsProps,
} from './D3Props';
import { filterByDOC, filterByPercentage, filterByStars } from './D3ContainerUtils';

export const firstRenderContext = createContext(true);

const colorArray = [
  '#88CCEE',
  '#CC6677',
  '#DDCC77',
  '#117733',
  '#332288',
  '#AA4499',
  '#44AA99',
  '#999933',
  '#661100',
  '#6699CC',
  '#888888',
];

// If nothing set, select all.
const defaultFilterState = {
  domainsOfCare: [],
  stars: [],
  percentRange: [0, 100],
  sum: 0,
};

const defaultTimelineState = {
  choice: 'all', // 30, 60, ytd or custom.
  range: [null, null],
};

function D3Container({ dashboardState, dashboardActions, store }) {
  const [displayData, setDisplayData] = useState(
    store.results.map((result) => ({ ...result })),
  );
  const [currentFilters, setCurrentFilters] = useState(defaultFilterState);
  const [tabValue, setTabValue] = useState(0);
  const [byLineMeasure, setByLineMeasure] = useState('');
  const [byLineDisplayData, setByLineDisplayData] = useState([]);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState(defaultTimelineState);
  const [graphWidth, setGraphWidth] = useState(window.innerWidth)
  const workingList = [];
  store.results.forEach((item) => workingList.push(item.measure));
  const measureList = Array.from(new Set(workingList));

  const colorMap = measureList.map((item, index) => ({
    measure: item,
    color: index <= 11 ? colorArray[index] : colorArray[index % 11],
  }));

  useEffect(() => {
    function handleResize() {
      setGraphWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  useEffect(() => {
    setDisplayData(store.results.map((result) => ({ ...result })))
  }, [store]);

  useEffect(() => {
    if (store.currentResults !== undefined) {
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
    }
  }, [setSelectedMeasures, setCurrentFilters, store.currentResults]);

  const handleDisplayDataUpdate = (measures, filters, timeline) => {
    let newDisplayData = store.results.map((result) => ({ ...result }));
    newDisplayData = newDisplayData.filter((result) => measures.includes(result.measure));
    if (filters.domainsOfCare.length > 0) {
      newDisplayData = filterByDOC(newDisplayData, filters, store);
    }
    if (filters.stars.length > 0) {
      newDisplayData = filterByStars(newDisplayData, filters, store);
    }
    if (filters.percentRange[0] > 0 || filters.percentRange[1] < 100) {
      newDisplayData = filterByPercentage(newDisplayData, filters, store);
    }
    if (timeline.choice !== 'all') {
      let dayLimit = 0;
      if (timeline.choice === '30' || timeline.choice === '60') {
        dayLimit = new Date().getTime() - (parseInt(timeline.choice, 10) * 24 * 60 * 60 * 1000);
      } else if (timeline.choice === 'ytd') {
        dayLimit = new Date(new Date().getFullYear(), 0, 1).getTime();
      } // Custom coming later.
      newDisplayData = newDisplayData.filter((result) => new Date(result.date) > dayLimit);
    }
    console.log(newDisplayData)
    setDisplayData(newDisplayData);
  };

  const handleTabChange = (event, index) => {
    setTabValue(index);
    setByLineMeasure(store.currentResults[0].measure);
    const filteredDisplayData = store.results.filter(
      (item) => item.measure === store.currentResults[0].measure,
    );
    setByLineDisplayData(filteredDisplayData);
    dashboardActions.setActiveMeasure(store.currentResults[0]);
  };

  const handleMeasureChange = (event) => {
    let newSelectedMeasures;
    if (event.target.checked) {
      newSelectedMeasures = event.target.value === 'all'
        ? store.currentResults.map((result) => result.measure)
        : selectedMeasures.concat(event.target.value);
      setSelectedMeasures(newSelectedMeasures);
    } else {
      newSelectedMeasures = event.target.value === 'all'
        ? [] : selectedMeasures.filter((result) => result !== event.target.value);
      setSelectedMeasures(newSelectedMeasures);
    }
    handleDisplayDataUpdate(newSelectedMeasures, currentFilters, currentTimeline);
  };

  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleDisplayDataUpdate(selectedMeasures, filterOptions, currentTimeline);
  }

  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleDisplayDataUpdate(selectedMeasures, currentFilters, timelineUpdate)
  }

  const handleByLineChange = (event) => {
    setByLineMeasure(event.target.value);
    const filteredDisplayData = store.results.filter(
      (item) => item.measure === event.target.value,
    );
    setByLineDisplayData(filteredDisplayData);
    dashboardActions.setActiveMeasure(
      store.currentResults.filter(
        (item) => item.measure === event.target.value,
      )[0],
    );
  };

  return (
    <div className="d3-container">
      <FilterDrawer
        filterDrawerOpen={dashboardState.filterDrawerOpen}
        toggleFilterDrawer={dashboardActions.toggleFilterDrawer}
        currentFilters={currentFilters}
        handleFilterChange={handleFilterChange}
      />
      <Tabs
        value={tabValue}
        onChange={(event, index) => handleTabChange(event, index)}
        indicatorColor="primary"
      >
        <Tab label="All Measures" className="d3-container__tab-button" />
        <Tab label="Measure by Line" className="d3-container__tab-button" />
      </Tabs>
      <TabPanel value={tabValue} index={1}>
        <Grid container>
          <Grid item sx={{ width: '25%' }}>
            <D3IndicatorByLineSelector
              currentResults={store.currentResults}
              byLineMeasure={byLineMeasure}
              handleByLineChange={handleByLineChange}
            />
          </Grid>
        </Grid>
        <D3IndicatorByLineChart
          byLineDisplayData={byLineDisplayData}
          graphWidth={graphWidth}
          colorMapping={colorMap}
          measureInfo={store.info}
          currentTimeline={currentTimeline}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={0}>
        <Grid container justifyContent="space-evenly" direction="column">
          <Grid item className="d3-container__chart">
            <ChartBar
              filterDrawerOpen={dashboardState.filterDrawerOpen}
              toggleFilterDrawer={dashboardActions.toggleFilterDrawer}
              currentTimeline={currentTimeline}
              handleTimelineChange={handleTimelineChange}
              filterSum={currentFilters.sum}
            />
          </Grid>
          <Grid item>
            <D3Chart
              displayData={displayData}
              colorMapping={colorMap}
              measureInfo={store.info}
              graphWidth={graphWidth}
              currentTimeline={currentTimeline}
            />
          </Grid>
        </Grid>
        <MeasureResultsTable
          currentResults={store.currentResults}
          handleMeasureChange={handleMeasureChange}
          selectedMeasures={selectedMeasures}
          colorMapping={colorMap}
        />
      </TabPanel>
    </div>
  );
}

D3Container.propTypes = {
  store: storeProps,
  dashboardState: dashboardStateProps,
  dashboardActions: dashboardActionsProps,
};

D3Container.defaultProps = {
  store: [],
  dashboardState: {
    filterDrawerOpen: false,
  },
  dashboardActions: {},
};

export default D3Container;
