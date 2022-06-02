import React, {
  createContext, useState, useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import DisplayTable from '../DisplayTable/DisplayTable';
import ChartBar from './ChartBar';
import D3Chart from './D3Chart';
import MeasureSelector from '../Common/MeasureSelector';
import FilterDrawer from '../FilterMenu/FilterDrawer';
import ColorMapping from '../Utilites/ColorMapping';
import MeasureTable from '../Utilites/MeasureTable'
import {
  storeProps,
  activeMeasureProps,
  dashboardStateProps,
  dashboardActionsProps,
  defaultActiveMeasure,
} from './D3Props';
import {
  filterByDOC,
  filterByPercentage,
  filterByStars,
  filterByTimeline,
  expandSubMeasureResults,
} from './D3ContainerUtils';

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

function D3Container({
  activeMeasure, dashboardState, dashboardActions, store,
}) {
  const history = useHistory();
  const [displayData, setDisplayData] = useState(
    store.results.map((result) => ({ ...result })),
  );
  const [currentFilters, setCurrentFilters] = useState(defaultFilterState);
  const [byLineMeasure, setByLineMeasure] = useState({});
  const [byLineCurrentResults, setByLineCurrentResults] = useState([])
  const [byLineDisplayData, setByLineDisplayData] = useState([]);
  const [byLineColorMap, setByLineColorMap] = useState([]);
  const [byLineSelectedMeasures, setByLineSelectedMeasures] = useState([]);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState(defaultTimelineState);
  const [graphWidth, setGraphWidth] = useState(window.innerWidth);
  const [filterDisabled, setFilterDisabled] = useState(true);

  const workingList = [];
  store.results.forEach((item) => workingList.push(item.measure));

  const measureList = Array.from(new Set(workingList));
  const colorMap = measureList.map((item, index) => ({
    value: item,
    color: index <= 11 ? colorArray[index] : colorArray[index % 11],
  }));

  // Leave alone.
  useEffect(() => {
    function handleResize() {
      setGraphWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  // Leave alone.
  useEffect(() => {
    console.log(activeMeasure.measure);
    if (activeMeasure.measure === 'composite') {
      setDisplayData(store.results.map((result) => ({ ...result })));
      setFilterDisabled(false);
    } else {
      const newByLineMeasure = store.results.filter(
        (item) => item.measure === activeMeasure.measure,
      );
      console.log(newByLineMeasure);
      let newByLineCurrentResults = [];
      if (newByLineMeasure.subScores && newByLineMeasure.subScores.length > 1) {
        newByLineCurrentResults = [newByLineMeasure, ...newByLineMeasure.subScores];
      } else {
        newByLineCurrentResults = [newByLineMeasure];
      }
      console.log(newByLineMeasure);
      setDisplayData(newByLineCurrentResults);
      setFilterDisabled(true);
    }
  }, [activeMeasure, store]);

  useEffect(() => {
    if (store.currentResults !== undefined) {
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
    }
  }, [setSelectedMeasures, setCurrentFilters, store.currentResults]);

  const handleFilteredDataUpdate = (measures, filters, timeline) => {
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
    newDisplayData = filterByTimeline(newDisplayData, timeline);
    setDisplayData(newDisplayData);
  };

  const handleByLineDisplayDataUpdate = (activeSubMeasures, currentMeasure, timeline) => {
    let newByLineDisplayData = [];
    newByLineDisplayData = expandSubMeasureResults(currentMeasure, store).filter(
      (result) => activeSubMeasures.includes(result.measure),
    );

    newByLineDisplayData = filterByTimeline(newByLineDisplayData, timeline);
    setByLineDisplayData(newByLineDisplayData);
  }

  const handleDisplayTableChange = (event) => {
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
    handleFilteredDataUpdate(newSelectedMeasures, currentFilters, currentTimeline);
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

  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleFilteredDataUpdate(selectedMeasures, filterOptions, currentTimeline);
  }

  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleFilteredDataUpdate(selectedMeasures, currentFilters, timelineUpdate);
    handleByLineDisplayDataUpdate(byLineSelectedMeasures, byLineMeasure, timelineUpdate);
  }

  const handleByLineChange = (event) => {
    history.push(`/${event.target.value === 'composite' ? '' : event.target.value}`);
    // const newByLineMeasure = store.currentResults.find(
    //   (item) => item.measure === event.target.value,
    // );
    // setByLineMeasure(newByLineMeasure);
    // const filteredDisplayData = store.results.filter(
    //   (item) => item.measure === event.target.value,
    // );
    // let newByLineCurrentResults = [];
    // if (newByLineMeasure.subScores && newByLineMeasure.subScores.length > 1) {
    //   newByLineCurrentResults = [newByLineMeasure, ...newByLineMeasure.subScores];
    // } else {
    //   newByLineCurrentResults = [newByLineMeasure];
    // }
    // setByLineCurrentResults(newByLineCurrentResults);

    // const byLineMeasureList = [];
    // newByLineCurrentResults.forEach((item) => byLineMeasureList.push(item.measure));
    // setByLineSelectedMeasures(byLineMeasureList);
    // handleByLineDisplayDataUpdate(byLineMeasureList, newByLineMeasure, currentTimeline);
    // setByLineColorMap(ColorMapping(colorMap, colorArray, filteredDisplayData));
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
      <Grid className="d3-container__main-chart">
        <D3Chart
          displayData={displayData}
          colorMapping={colorMap}
          measureInfo={store.info}
          graphWidth={graphWidth}
          currentTimeline={currentTimeline}
        />
      </Grid>
      <Grid className="d3-container__bottom-display">
        <Grid className="d3-container__measure-selector">
          <Typography className="d3-container__selector-title">Detailed View: </Typography>
          <MeasureSelector
            currentResults={store.currentResults}
            measure={byLineMeasure.measure}
            handleMeasureChange={handleByLineChange}
          />
        </Grid>
        <DisplayTable
          rowData={MeasureTable.formatData(store.currentResults)}
          headerInfo={MeasureTable.headerInfo}
          pageSize={MeasureTable.pageSize}
          useCheckBox
          handleCheckBoxChange={handleDisplayTableChange}
          selectedRows={selectedMeasures}
          colorMapping={colorMap}
        />
      </Grid>
    </div>
  );
}

D3Container.propTypes = {
  store: storeProps,
  activeMeasure: activeMeasureProps,
  dashboardState: dashboardStateProps,
  dashboardActions: dashboardActionsProps,
};

D3Container.defaultProps = {
  store: [],
  activeMeasure: defaultActiveMeasure,
  dashboardState: {
    filterDrawerOpen: false,
  },
  dashboardActions: {},
};

export default D3Container;
