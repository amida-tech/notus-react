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
  getSubMeasureCurrentResults,
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
  const [isComposite, setComposite] = useState(true);
  const [currentResults, setCurrentResults] = useState([]);
  const [colorMap, setColorMap] = useState([]);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(defaultFilterState);
  const [currentTimeline, setCurrentTimeline] = useState(defaultTimelineState);
  const [graphWidth, setGraphWidth] = useState(window.innerWidth);
  const [filterDisabled, setFilterDisabled] = useState(true);

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
    const baseColorMap = store.currentResults.map((item, index) => ({
      value: item.measure,
      color: index <= 11 ? colorArray[index] : colorArray[index % 11],
    }));
    if (activeMeasure.measure === 'composite') {
      setComposite(true);
      setDisplayData(store.results.map((result) => ({ ...result })));
      setCurrentResults(store.currentResults);
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
      setColorMap(baseColorMap);
      setFilterDisabled(false);
    } else {
      setComposite(false);
      const subMeasureCurrentResults = getSubMeasureCurrentResults(activeMeasure, store);
      setDisplayData(expandSubMeasureResults(activeMeasure, store));
      setCurrentResults(subMeasureCurrentResults);
      setSelectedMeasures(subMeasureCurrentResults.map((result) => result.measure));
      setColorMap(ColorMapping(baseColorMap, colorArray, subMeasureCurrentResults));
      setFilterDisabled(true);
    }
    setCurrentTimeline(defaultTimelineState);
    setCurrentFilters(defaultFilterState);
  }, [activeMeasure, store]);

  useEffect(() => {
    if (store.currentResults !== undefined) {
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
    }
  }, [setSelectedMeasures, store.currentResults]);

  const handleFilteredDataUpdate = (measures, filters, timeline) => {
    let newDisplayData = isComposite
      ? store.results.map((result) => ({ ...result }))
      : expandSubMeasureResults(activeMeasure, store);
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

  const handleSelectedMeasureChange = (event) => {
    let newSelectedMeasures;
    if (event.target.checked) {
      newSelectedMeasures = event.target.value === 'all'
        ? currentResults.map((result) => result.measure)
        : selectedMeasures.concat(event.target.value);
      setSelectedMeasures(newSelectedMeasures);
    } else {
      newSelectedMeasures = event.target.value === 'all'
        ? [] : selectedMeasures.filter((result) => result !== event.target.value);
      setSelectedMeasures(newSelectedMeasures);
    }
    handleFilteredDataUpdate(newSelectedMeasures, currentFilters, currentTimeline);
  };

  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleFilteredDataUpdate(selectedMeasures, filterOptions, currentTimeline);
  }

  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleFilteredDataUpdate(selectedMeasures, currentFilters, timelineUpdate);
  }

  const handleMeasureChange = (event) => {
    history.push(`/${event.target.value === 'composite' ? '' : event.target.value}`);
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
            handleMeasureChange={handleMeasureChange}
          />
        </Grid>
        <DisplayTable
          rowData={MeasureTable.formatData(currentResults)}
          headerInfo={MeasureTable.headerData(isComposite)}
          pageSize={MeasureTable.pageSize}
          useCheckBox
          handleCheckBoxChange={handleSelectedMeasureChange}
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
