import React, {
  createContext, useState, useEffect,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  Grid, Typography, Box, Tab, Button,
} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

import { TabContext, TabList, TabPanel } from '@mui/lab';

import env from '../../env';
import TableFilterPanel from '../DisplayTable/TableFilterPanel';
import DisplayTable from '../DisplayTable/DisplayTable';
import ChartBar from './ChartBar';
import ChartHeader from './ChartHeader'
import D3Chart from './D3Chart';
import MeasureSelector from '../Common/MeasureSelector';
import FilterDrawer from '../FilterMenu/FilterDrawer';

import ColorMapping from '../Utilities/ColorMapping';
import MeasureTable from '../Utilities/MeasureTable';
import MemberTable from '../Utilities/MemberTable';
import MeasureTableRow from '../DisplayTable/MeasureTableRow';
import MemberTableRow from '../DisplayTable/MemberTableRow';
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

const axios = require('axios').default;

export const firstRenderContext = createContext(true);

const chartColorArray = [
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

function labelGenerator(measure) {
  if (!measure?.label) {
    return '';
  }
  const { label } = measure;
  return (
    <Grid className="d3-container__return-measure-labels">
      <Typography className="d3-container__return-measure-title">{label.substring(0, label.indexOf(' '))}</Typography>
      <Typography className="d3-container__return-measure-description">{label.substring(label.indexOf('- ') + 1)}</Typography>
    </Grid>
  )
}

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
  const [memberResults, setMemberResults] = useState([]);
  const [tableFilter, setTableFilter] = useState([]);
  const [headerInfo, setHeaderInfo] = useState([])
  const [rowEntries, setRowEntries] = useState([])
  const [tabValue, setTabValue] = React.useState('overview');

  useEffect(() => {
    function handleResize() {
      setGraphWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  useEffect(() => { // Break apart later if we feel we need to separate concerns.
    const baseColorMap = store.currentResults.map((item, index) => ({
      value: item.measure,
      color: index <= 11 ? chartColorArray[index] : chartColorArray[index % 11],
    }));
    setCurrentTimeline(defaultTimelineState);
    setCurrentFilters(defaultFilterState);
    if (activeMeasure.measure === 'composite' || activeMeasure.measure === '') {
      setComposite(true);
      setDisplayData(store.results.map((result) => ({ ...result })));
      setCurrentResults(store.currentResults);
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
      setColorMap(baseColorMap);
      setFilterDisabled(false);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(true));
    } else {
      setComposite(false);
      const subMeasureCurrentResults = getSubMeasureCurrentResults(activeMeasure, store);
      setDisplayData(expandSubMeasureResults(activeMeasure, store));
      setCurrentResults(subMeasureCurrentResults);
      setSelectedMeasures(subMeasureCurrentResults.map((result) => result.measure));
      setColorMap(ColorMapping(baseColorMap, chartColorArray, subMeasureCurrentResults));
      setFilterDisabled(true);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(false));
    }
  }, [setTableFilter, history, activeMeasure, isComposite, store]);

  useEffect(() => {
    if (!isComposite && memberResults.length === 0) {
      const memberUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members?measurementType=${activeMeasure.measure}`);
      const membersPromise = axios.get(memberUrl);
      Promise.all([membersPromise]).then((values) => {
        setMemberResults(values[0].data);
      });
    }
  })

  useEffect(() => {
    if (store.currentResults !== undefined) {
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
    }
  }, [store.currentResults]);

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

  useEffect(() => {
    setRowEntries(MemberTable.formatData(
      memberResults,
      activeMeasure.measure,
      store.info,
      tableFilter,
    ))
  }, [tableFilter, memberResults, activeMeasure.measure, store.info])

  useEffect(() => {
    const path = window.location.pathname
    if (path.includes('members')) {
      const pathMeasure = path.replace('/', '').replace('/members', '');
      const subMeasures = Object.keys(store.info).filter((item) => item.includes(pathMeasure));
      setHeaderInfo(MemberTable.headerData(subMeasures, store.info));
      setRowEntries(MemberTable.formatData(
        memberResults,
        pathMeasure,
        store.info,
        tableFilter,
      ))
      setComposite(false)
      setTabValue('members')
    } else if (path === '/') {
      setTabValue('overview')
    } else {
      setTabValue('overview')
    }
  }, [activeMeasure.measure, memberResults, selectedMeasures, store.info, tabValue, tableFilter])

  const handleSelectedMeasureChange = (event) => {
    setTableFilter([])
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
    history.push(`/${event.target.value === 'composite' ? '' : event.target.value}`)
  };

  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleFilteredDataUpdate(selectedMeasures, filterOptions, currentTimeline);
  }

  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleFilteredDataUpdate(selectedMeasures, currentFilters, timelineUpdate);
  }

  const handleTableFilterChange = (event) => {
    if (event.target.value === undefined) {
      setTableFilter([])
    } else if (tableFilter.includes(event.target.value)) {
      const tableFilterIndex = tableFilter.indexOf(event.target.value)
      const newFiltering = tableFilter.filter((_, i) => i !== tableFilterIndex);

      setTableFilter(newFiltering)
    } else {
      const newFiltering = [...tableFilter, event.target.value]

      setTableFilter(newFiltering);
    }
  }

  const handleTabChange = (_e, newValue) => {
    setTabValue(newValue);
    if (newValue === 'members') {
      history.push(`/${activeMeasure.measure}/members`)
      setHeaderInfo(MemberTable.headerData(selectedMeasures, store.info));
      setRowEntries(MemberTable.formatData(
        memberResults,
        activeMeasure.measure,
        store.info,
        tableFilter,
      ))
    } else {
      history.push(`/${activeMeasure.measure}`)
      setHeaderInfo(MeasureTable.headerData(isComposite));
    }
  };

  return (
    <div className="d3-container">
      <FilterDrawer
        filterDrawerOpen={dashboardState.filterDrawerOpen}
        toggleFilterDrawer={dashboardActions.toggleFilterDrawer}
        currentFilters={currentFilters}
        handleFilterChange={handleFilterChange}
      />
      {dashboardState.isLoading ? (
        <Grid className="d3-container__loading-container--measure-selector">
          <Skeleton variant="rectangular" className="d3-container__loading-skeleton--measure-selector" />
        </Grid>
      ) : (
        <ChartHeader
          isComposite={isComposite}
          setComposite={setComposite}
          setTabValue={setTabValue}
          setTableFilter={setTableFilter}
          history={history}
          isLoading={dashboardState.isLoading}
          labelGenerator={labelGenerator}
          currentResults={currentResults}
          activeMeasure={activeMeasure}
        />
      )}
      {!dashboardState.isLoading && (
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
      )}

      {dashboardState.isLoading ? (
        <Grid className="d3-container__loading-container--d3-chart">
          <Skeleton variant="rectangular" className="d3-container__loading-skeleton--d3-chart" />
        </Grid>
      ) : (
        <Grid className="d3-container__main-chart">
          <D3Chart
            displayData={displayData}
            colorMapping={colorMap}
            measureInfo={store.info}
            graphWidth={graphWidth}
            currentTimeline={currentTimeline}
          />
        </Grid>
      )}

      <Grid className="d3-container__bottom-display">
        <Box className="d3-container__overview-member-chart">
          <TabContext value={tabValue}>
            <Box className="d3-container__table-tab-bar">

              {isComposite ? (
                <TabList TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }} sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }} onChange={handleTabChange} aria-label="overview and members tabs">
                  <Tab className="d3-container__table-selection-button" label="Overview" value="overview" />
                </TabList>
              ) : (
                <TabList TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }} sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }} onChange={handleTabChange} aria-label="overview and members tabs">
                  <Tab className="d3-container__table-selection-button" label="Overview" value="overview" />
                  <Tab className="d3-container__table-selection-button" label="Members" value="members" />
                </TabList>
              )}
            </Box>

            <TabPanel value="overview">

              {dashboardState.isLoading ? (
                <Grid className="d3-container__loading-container--measure-selector">
                  <Skeleton variant="rectangular" className="d3-container__loading-skeleton--measure-selector" />
                </Grid>
              ) : (
                <Grid className="d3-container__measure-selector">
                  <Typography className="d3-container__selector-title">Detailed View:</Typography>
                  <MeasureSelector
                    measure={activeMeasure.measure}
                    currentResults={store.currentResults}
                    handleMeasureChange={handleSelectedMeasureChange}
                    isLoading={dashboardState.isLoading}
                  />
                </Grid>
              )}

              <DisplayTable
                headerInfo={headerInfo}
                pageSize={MeasureTable.pageSize}
                useCheckBox
                selectedRows={selectedMeasures}
                handleCheckBoxChange={handleSelectedMeasureChange}
              >
                {MeasureTable.formatData(currentResults).map((item) => (
                  <MeasureTableRow
                    key={`measure-table-row-${item.value}`}
                    rowDataItem={item}
                    headerInfo={headerInfo}
                    useCheckBox
                    handleCheckBoxEvent={handleSelectedMeasureChange}
                    rowSelected={selectedMeasures.includes(item.value)}
                    color={colorMap.find((mapping) => mapping.value === item.value)?.color || '#000'}
                    measureInfo={store.info}
                  />
                ))}
              </DisplayTable>
            </TabPanel>

            <TabPanel value="members">
              <TableFilterPanel
                tableFilter={tableFilter}
                handleTableFilterChange={handleTableFilterChange}
              />
              <Box className="d3-container__entries-display">
                Results:&nbsp;
                <Typography display="inline" sx={{ fontWeight: 800 }}>{rowEntries.length}</Typography>
                &nbsp;Entries Found
              </Box>
              <DisplayTable
                headerInfo={headerInfo}
                pageSize={MemberTable.pageSize}
                useCheckBox={false}
              >
                {rowEntries.length === 0
                  ? (
                    <Box className="d3-container__no-entries">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                        className="d3-container__no-entries-button"
                        aria-label="clear"
                        onClick={() => {
                          setTableFilter([])
                        }}
                      >
                        Reset Table
                      </Button>
                    </Box>
                  )
                  : (rowEntries.map((item) => (
                    <MemberTableRow
                      key={`member-table-row-${item.value}`}
                      rowDataItem={item}
                      headerInfo={headerInfo}
                    />
                  )))}
              </DisplayTable>
            </TabPanel>

          </TabContext>
        </Box>
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
