import React, {
  createContext, useState, useEffect,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  Grid, Typography, Box, Tab, IconButton
} from '@mui/material';

import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';

import { TabContext, TabList, TabPanel } from '@mui/lab';

import env from '../../env';
import TableFilterPanel from '../DisplayTable/TableFilterPanel';
import DisplayTable from '../DisplayTable/DisplayTable';
import ChartBar from './ChartBar';
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

  const [rotation, setRotation] = React.useState(0)

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
      color: index <= 11 ? colorArray[index] : colorArray[index % 11],
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
      setHeaderInfo(MeasureTable.headerData(true));
    } else {
      setComposite(false);
      const subMeasureCurrentResults = getSubMeasureCurrentResults(activeMeasure, store);
      setDisplayData(expandSubMeasureResults(activeMeasure, store));
      setCurrentResults(subMeasureCurrentResults);
      setSelectedMeasures(subMeasureCurrentResults.map((result) => result.measure));
      setColorMap(ColorMapping(baseColorMap, colorArray, subMeasureCurrentResults));
      setFilterDisabled(true);
      setHeaderInfo(MeasureTable.headerData(false));
    }
  }, [history, activeMeasure, isComposite, store]);

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

  const handleSelectedMeasureChange = (event) => {
    setTableFilter([])
    setMemberResults([]);
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
    if (tableFilter.includes(event.target.value)) {
      const tableFilterIndex = tableFilter.indexOf(event.target.value)
      const newFiltering = tableFilter.filter((_, i) => i !== tableFilterIndex);

      setTableFilter(newFiltering)
    } else {
      const newFiltering = [...tableFilter, event.target.value]

      setTableFilter(newFiltering);
    }
  }

  const [tabValue, setTabValue] = React.useState('overview');

  const handleTabChange = (_e, newValue) => {
    setTabValue(newValue);
    if (newValue === 'members') {
      setHeaderInfo(MemberTable.headerData(selectedMeasures, store.info));
    } else {
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
      { isComposite
        ? <Typography className="d3-container__title d3-container__title--inactive">All Measures</Typography>
        : (
          <Grid
            className="d3-container__return-link-display"
            onClick={() => {
              setComposite(true);
              setTabValue('overview');
              setTableFilter([]);
              history.push('/');
            }}
          >
            <Typography className="d3-container__title">
              <ArrowBackIosIcon className="d3-container__return-icon" />
              All Measures
            </Typography>
            <Grid className="d3-container__return-measure-display">
              <DisabledByDefaultRoundedIcon className="d3-container__cancel-icon" />
              {labelGenerator(
                currentResults.find((result) => result.measure === activeMeasure.measure),
              )}
            </Grid>
          </Grid>
        ) }
      {dashboardState.isLoading ? null : (
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
        <Grid className="d3-container__loading-container">
          <CircularProgress size={250} thickness={3} className="d3-container__loading-spinner" />
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
              <TabList TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }} sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }} onChange={handleTabChange} aria-label="overview and members tabs">
                <Tab className="d3-container__table-selection-button" label="Overview" value="overview" />
                {!isComposite && <Tab className="d3-container__table-selection-button" label="Members" value="members" />}
              </TabList>
            </Box>

            <TabPanel value="overview">
              <Grid className="d3-container__measure-selector">
                <Typography className="d3-container__selector-title">Detailed View:</Typography>
                <MeasureSelector
                  measure={activeMeasure.measure}
                  currentResults={store.currentResults}
                  handleMeasureChange={handleSelectedMeasureChange}
                />
              </Grid>
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
                  />
                ))}
              </DisplayTable>
            </TabPanel>

            <TabPanel value="members">
              <TableFilterPanel
                tableFilter={tableFilter}
                handleTableFilterChange={handleTableFilterChange}
              />
                <DisplayTable
                  headerInfo={headerInfo}
                  pageSize={MemberTable.pageSize}
                  useCheckBox={false}
                >
                  {MemberTable.formatData(
                    memberResults,
                    activeMeasure.measure,
                    store.info,
                    tableFilter,
                  ).map((item) => (typeof item === 'string'
                    ? <Box className="d3-container__no-entries">
                        <Typography className="d3-container__no-entries-text" sx={{fontWeight: 600}}>{item}</Typography>
                        <IconButton size="large" className="d3-container__no-entries-button" aria-label="refresh" color="primary">
                          <RefreshIcon
                            className="d3-container__refresher"
                            onClick={() => setRotation(1)}
                            onAnimationEnd={() => setRotation(0)}
                            rotation={rotation}
                          />
                        </IconButton>
                      </Box>
                    : (
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
