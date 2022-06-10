import React, {
  createContext, useState, useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid, Typography, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import env from '../../env';
import TableFilterPanel from '../DisplayTable/TableFilterPanel';
import DisplayTable from '../DisplayTable/DisplayTable';
import ChartBar from './ChartBar';
import D3Chart from './D3Chart';
import MeasureSelector from '../Common/MeasureSelector';
import FilterDrawer from '../FilterMenu/FilterDrawer';
import ColorMapping from '../Utilites/ColorMapping';
import MeasureTable from '../Utilites/MeasureTable';
import PatientTable from '../Utilites/PatientTable';
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

function onReturnClick(history) {
  history.push('/');
}

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
  const [patientView, setPatientView] = useState(false);
  const [patientResults, setPatientResults] = useState([]);
  const [tableFilter, setTableFilter] = useState('');

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
    if (activeMeasure.measure === 'composite' || activeMeasure.measure === '') {
      setComposite(true);
      setDisplayData(store.results.map((result) => ({ ...result })));
      setCurrentResults(store.currentResults);
      setSelectedMeasures(store.currentResults.map((result) => result.measure));
      setColorMap(baseColorMap);
      setFilterDisabled(false);
      setPatientResults([]);
      setTableFilter('');
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
    setPatientView(false);
  }, [activeMeasure, store]);

  useEffect(() => {
    if (!isComposite && patientResults.length === 0) {
      const patientUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members?measurementType=${activeMeasure.measure}`);
      const patientsPromise = axios.get(patientUrl);
      Promise.all([patientsPromise]).then((values) => {
        setPatientResults(values[0].data);
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
  }

  const handleTableFilterChange = (event) => {
    setTableFilter(event.target.value === tableFilter ? '' : event.target.value);
  }

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
          <Grid className="d3-container__return-link-display" onClick={() => onReturnClick(history)}>
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
        { isComposite
          ? (
            <Grid className="d3-container__measure-selector">
              <Typography className="d3-container__selector-title">Detailed View: </Typography>
              <MeasureSelector
                measure={activeMeasure.measure}
                currentResults={store.currentResults}
                handleMeasureChange={handleMeasureChange}
              />
            </Grid>
          )
          : (
            <Grid className="d3-container__table-toggle">
              <ToggleButtonGroup
                color="primary"
                value={patientView}
                exclusive
                onChange={() => setPatientView(!patientView)}
              >
                <ToggleButton value={false}>Overview</ToggleButton>
                <ToggleButton value>Members</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          )}
        { patientView
          ? (
            <>
              <TableFilterPanel
                measure={activeMeasure.measure}
                patientResult={patientResults[0]}
                tableFilter={tableFilter}
                handleTableFilterChange={handleTableFilterChange}
              />
              <DisplayTable
                tableType="patient"
                rowData={PatientTable.formatData(
                  patientResults,
                  selectedMeasures,
                  store.info,
                  tableFilter,
                )}
                headerInfo={PatientTable.headerData(
                  selectedMeasures,
                  store.info,
                )}
                pageSize={PatientTable.pageSize}
                useCheckBox={false}
                handleCheckBoxChange={handleSelectedMeasureChange}
              />
            </>
          )
          : (
            <DisplayTable
              tableType="measure"
              rowData={MeasureTable.formatData(currentResults)}
              headerInfo={MeasureTable.headerData(isComposite)}
              pageSize={MeasureTable.pageSize}
              useCheckBox
              selectedRows={selectedMeasures}
              colorMapping={colorMap}
              handleTableFilterChange={handleTableFilterChange}
            />
          )}
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
