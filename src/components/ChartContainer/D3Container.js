import { Grid, Typography } from '@mui/material';
import { createContext } from 'react';

import theme from '../../assets/styles/AppTheme'

import FilterDrawer from '../FilterMenu/FilterDrawer';
import ChartBar from './ChartBar';
import ChartHeader from './ChartHeader';
import D3Chart from './D3Chart';

import {
  activeMeasureProps,
  defaultActiveMeasure,
  storeProps,
  filterDrawerOpenProps,
  toggleFilterDrawerProps,
  isLoadingProps,
  handleFilteredDataUpdateProps,
  setCurrentFiltersProps,
  selectedMeasuresProps,
  currentTimelineProps,
  currentFiltersProps,
  setCurrentTimelineProps,
  isCompositeProps,
  setCompositeProps,
  setTableFilterProps,
  currentResultsProps,
  filterDisabledProps,
  displayDataProps,
  colorMapProps,
  graphWidthProps,
  handleResetDataProps,
  setRowEntriesProps,
  setTabValueProps,
  setFilterActivatedProps,
  setIsLoadingProps,
  additionalFilterOptionsProps,
  setFilterInfoProps,
} from './D3Props';
import LineChart from './LineChart';

export const firstRenderContext = createContext(true);

function labelGenerator(measure) {
  if (!measure?.label) {
    return '';
  }
  const { label } = measure;
  return (
    <Grid sx={{ color: theme.palette?.bluegray.D4 }} className="d3-container__return-measure-labels">
      <Typography className="d3-container__return-measure-title">{label.substring(0, label.indexOf(' '))}</Typography>
      <Typography className="d3-container__return-measure-description">{label.substring(label.indexOf('- ') + 1)}</Typography>
    </Grid>
  )
}

function D3Container({
  setCurrentFilters,
  selectedMeasures,
  currentTimeline,
  currentFilters,
  handleFilteredDataUpdate,
  setCurrentTimeline,
  filterDrawerOpen,
  toggleFilterDrawer,
  isComposite,
  setComposite,
  setTableFilter,
  isLoading,
  currentResults,
  activeMeasure,
  filterDisabled,
  displayData,
  colorMap,
  store,
  graphWidth,
  setFilterActivated,
  setIsLoading,
  additionalFilterOptions,
  setTabValue,
  setRowEntries,
  handleResetData,
  setFilterInfo,
}) {
  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleFilteredDataUpdate(filterOptions, currentTimeline);
  }
  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleFilteredDataUpdate(currentFilters, timelineUpdate);
  }
  const chartStuff = []
  for (let i = 0; i < currentResults.length; i += 1) {
    const MEASURES = currentResults[i].measure
    chartStuff.push({
      name: MEASURES,
      data: displayData.filter((entry) => {
        if (MEASURES === entry.measure) {
          return entry.value
        }
      }),
    })
  }
  console.log(chartStuff)
  return (
    <div className="d3-container">
      <FilterDrawer
        filterDrawerOpen={filterDrawerOpen}
        toggleFilterDrawer={toggleFilterDrawer}
        currentFilters={currentFilters}
        handleFilterChange={handleFilterChange}
        additionalFilterOptions={additionalFilterOptions}
        setFilterActivated={setFilterActivated}
        setIsLoading={setIsLoading}
        setComposite={setComposite}
        setTableFilter={setTableFilter}
        setRowEntries={setRowEntries}
        handleResetData={handleResetData}
        setFilterInfo={setFilterInfo}
      />
      <ChartHeader
        isComposite={isComposite}
        setComposite={setComposite}
        setTabValue={setTabValue}
        setTableFilter={setTableFilter}
        isLoading={isLoading}
        handleResetData={handleResetData}
        labelGenerator={labelGenerator}
        currentResults={currentResults}
        activeMeasure={activeMeasure}
      />
      <Grid item className="d3-container__chart-bar">
        <ChartBar
          filterDrawerOpen={filterDrawerOpen}
          toggleFilterDrawer={toggleFilterDrawer}
          currentTimeline={currentTimeline}
          handleTimelineChange={handleTimelineChange}
          filterSum={currentFilters.sum}
          filterDisabled={filterDisabled}
        />
      </Grid>
      <Grid className="d3-container__main-chart">
        {/* <D3Chart
          displayData={displayData.filter((result) => selectedMeasures.includes(result.measure))}
          colorMapping={colorMap}
          measureInfo={store.info}
          graphWidth={graphWidth}
          currentTimeline={currentTimeline}
        /> */}
        <LineChart
          chartStuff={chartStuff}
          displayData={displayData}
          colorMap={colorMap}
          measureInfo={store.info}
          graphWidth={graphWidth}
          currentTimeline={currentTimeline}
        />
      </Grid>
    </div>
  );
}

D3Container.propTypes = {
  store: storeProps,
  activeMeasure: activeMeasureProps,
  filterDrawerOpen: filterDrawerOpenProps,
  isLoading: isLoadingProps,
  toggleFilterDrawer: toggleFilterDrawerProps,
  handleFilteredDataUpdate: handleFilteredDataUpdateProps,
  setCurrentFilters: setCurrentFiltersProps,
  selectedMeasures: selectedMeasuresProps,
  currentTimeline: currentTimelineProps,
  currentFilters: currentFiltersProps,
  setCurrentTimeline: setCurrentTimelineProps,
  isComposite: isCompositeProps,
  setComposite: setCompositeProps,
  setTableFilter: setTableFilterProps,
  currentResults: currentResultsProps,
  filterDisabled: filterDisabledProps,
  displayData: displayDataProps,
  colorMap: colorMapProps,
  graphWidth: graphWidthProps,
  setFilterActivated: setFilterActivatedProps,
  setIsLoading: setIsLoadingProps,
  additionalFilterOptions: additionalFilterOptionsProps,
  setRowEntries: setRowEntriesProps,
  handleResetData: handleResetDataProps,
  setTabValue: setTabValueProps,
  setFilterInfo: setFilterInfoProps,
};

D3Container.defaultProps = {
  store: [],
  activeMeasure: defaultActiveMeasure,
  filterDrawerOpen: false,
  isLoading: true,
  toggleFilterDrawer: false,
  handleFilteredDataUpdate: () => undefined,
  setCurrentFilters: () => undefined,
  selectedMeasures: [],
  currentTimeline: [],
  currentFilters: [],
  setCurrentTimeline: () => undefined,
  isComposite: true,
  setComposite: () => undefined,
  setTableFilter: () => undefined,
  currentResults: [],
  filterDisabled: true,
  displayData: [],
  colorMap: [],
  graphWidth: 500,
  setFilterActivated: () => undefined,
  setIsLoading: () => undefined,
  additionalFilterOptions: {},
  setRowEntries: () => undefined,
  handleResetData: () => undefined,
  setFilterInfo: () => undefined,
  setTabValue: () => undefined,
};

export default D3Container;
