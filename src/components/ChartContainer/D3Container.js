import {
  Grid, Tab, Tabs,
} from '@mui/material';
import React, {
  createContext, useState, useEffect,
} from 'react';
import ChartBar from './ChartBar';
import D3Chart from './D3Chart';
import MeasureSelector from '../Common/MeasureSelector';
import TabPanel from '../Common/TabPanel';
import FilterDrawer from '../FilterMenu/FilterDrawer';
import MeasureResultsTable from '../MeasureResults/MeasureResultsTable';
import ColorMapping from '../Utilites/ColorMapping';
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
  const [byLineMeasure, setByLineMeasure] = useState({});
  const [byLineCurrentResults, setByLineCurrentResults] = useState([])
  const [byLineDisplayData, setByLineDisplayData] = useState([]);
  const [byLineColorMap, setByLineColorMap] = useState([]);
  const [byLineSelectedMeasures, setByLineSelectedMeasures] = useState([]);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState(defaultTimelineState);
  const [graphWidth, setGraphWidth] = useState(window.innerWidth);
  const [filterDisabled, setFilterDisabled] = useState(false);
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
    newDisplayData = filterTimeline(newDisplayData, timeline);
    setDisplayData(newDisplayData);
  };

  const handleByLineDisplayDataUpdate = (activeSubMeasures, currentMeasure, timeline) => {
    let newByLineDisplayData = [];
    newByLineDisplayData = expandSubMeasureResults(currentMeasure).filter(
      (result) => activeSubMeasures.includes(result.measure),
    );

    newByLineDisplayData = filterTimeline(newByLineDisplayData, timeline);
    setByLineDisplayData(newByLineDisplayData);
  }

  const handleTabChange = (event, index) => {
    setTabValue(index);
    const defaultByLineMeasure = store.currentResults[0];
    if (index === 0) {
      setFilterDisabled(false);
    } else if (index === 1) {
      setByLineMeasure(defaultByLineMeasure);
      const filteredDisplayData = store.results.filter(
        (item) => item.measure === store.currentResults[0].measure,
      );
      setByLineCurrentResults([defaultByLineMeasure]);
      setByLineSelectedMeasures([defaultByLineMeasure.measure]);
      setByLineColorMap(ColorMapping(colorMap, colorArray, filteredDisplayData));
      handleByLineDisplayDataUpdate(
        [defaultByLineMeasure.measure],
        defaultByLineMeasure,
        currentTimeline,
      );
      setFilterDisabled(true);
    }

    dashboardActions.setActiveMeasure(defaultByLineMeasure);
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

  const handleByLineMeasureChange = (event) => {
    let newSelectedSubMeasures;
    if (event.target.checked) {
      newSelectedSubMeasures = event.target.value === 'all'
        ? byLineCurrentResults.map((result) => result.measure)
        : byLineSelectedMeasures.concat(event.target.value);
      setByLineSelectedMeasures(newSelectedSubMeasures);
    } else {
      newSelectedSubMeasures = event.target.value === 'all'
        ? [] : byLineSelectedMeasures.filter((result) => result !== event.target.value);
      setByLineSelectedMeasures(newSelectedSubMeasures);
    }
    handleByLineDisplayDataUpdate(newSelectedSubMeasures, byLineMeasure, currentTimeline);
  };

  const expandSubMeasureResults = (selectedMeasure) => {
    const expandedResults = [];
    store.results.filter(
      (result) => result.measure === selectedMeasure.measure,
    ).forEach((byLine) => {
      expandedResults.push(byLine);
      if (selectedMeasure.subScores && selectedMeasure.subScores.length > 1) {
        byLine.subScores.forEach((subScore) => expandedResults.push(subScore));
      }
    });

    return expandedResults;
  }

  const filterTimeline = (timelineDisplayData, timeline) => {
    if (timeline.choice !== 'all') {
      let dayLimit = 0;
      if (timeline.choice === 'YTD') {
        dayLimit = new Date(new Date().getFullYear(), 0, 1).getTime();
      } else {
        dayLimit = new Date().getTime() - (parseInt(timeline.choice, 10) * 24 * 60 * 60 * 1000);
      }
      return timelineDisplayData.filter((result) => new Date(result.date) > dayLimit);
    }
    return timelineDisplayData;
  }

  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleDisplayDataUpdate(selectedMeasures, filterOptions, currentTimeline);
  }

  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleDisplayDataUpdate(selectedMeasures, currentFilters, timelineUpdate);
    handleByLineDisplayDataUpdate(byLineSelectedMeasures, byLineMeasure, timelineUpdate);
  }

  const handleByLineChange = (event) => {
    const newByLineMeasure = store.currentResults.find(
      (item) => item.measure === event.target.value,
    );
    setByLineMeasure(newByLineMeasure);
    const filteredDisplayData = store.results.filter(
      (item) => item.measure === event.target.value,
    );
    let newByLineCurrentResults = [];
    if (newByLineMeasure.subScores && newByLineMeasure.subScores.length > 1) {
      newByLineCurrentResults = [newByLineMeasure, ...newByLineMeasure.subScores];
    } else {
      newByLineCurrentResults = [newByLineMeasure];
    }
    setByLineCurrentResults(newByLineCurrentResults);

    const byLineMeasureList = [];
    newByLineCurrentResults.forEach((item) => byLineMeasureList.push(item.measure));
    setByLineSelectedMeasures(byLineMeasureList);
    handleByLineDisplayDataUpdate(byLineMeasureList, newByLineMeasure, currentTimeline);
    setByLineColorMap(ColorMapping(colorMap, colorArray, filteredDisplayData));
    dashboardActions.setActiveMeasure(newByLineMeasure);
  };

  return (
    <div className="d3-container">
      <FilterDrawer
        filterDrawerOpen={dashboardState.filterDrawerOpen}
        toggleFilterDrawer={dashboardActions.toggleFilterDrawer}
        currentFilters={currentFilters}
        handleFilterChange={handleFilterChange}
      />
      <Grid item className="d3-container__chart-bar">
        <ChartBar
          filterDrawerOpen={dashboardState.filterDrawerOpen}
          toggleFilterDrawer={dashboardActions.toggleFilterDrawer}
          currentTimeline={currentTimeline}
          handleTimelineChange={handleTimelineChange}
          filterSum={currentFilters.sum}
          filterDisabled={filterDisabled}
        />
      </Grid>
      <Tabs
        value={tabValue}
        onChange={(event, index) => handleTabChange(event, index)}
        indicatorColor="primary"
      >
        <Tab label="All Measures" className="d3-container__tab-button" />
        <Tab label="Individual Measures" className="d3-container__tab-button" />
      </Tabs>
      <TabPanel value={tabValue} index={1}>
        <Grid container className="d3-container__chart-holder">
          <Grid item sx={{ width: '25%' }}>
            <MeasureSelector
              currentResults={store.currentResults}
              measure={byLineMeasure.measure}
              handleMeasureChange={handleByLineChange}
            />
          </Grid>
          <Grid item>
            <D3Chart
              displayData={byLineDisplayData}
              graphWidth={graphWidth}
              colorMapping={byLineColorMap}
              measureInfo={store.info}
              currentTimeline={currentTimeline}
            />
          </Grid>
        </Grid>
        <MeasureResultsTable
          currentResults={byLineCurrentResults}
          handleMeasureChange={handleByLineMeasureChange}
          selectedMeasures={byLineSelectedMeasures}
          colorMapping={byLineColorMap}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={0}>
        <Grid container className="d3-container__chart-holder">
          <Grid item className="d3-container__main-chart">
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
