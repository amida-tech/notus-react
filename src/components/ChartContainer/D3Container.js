import { Grid, Typography } from '@mui/material';
import { createContext } from 'react';

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
  setTabValueProps,
  setTableFilterProps,
  historyProps,
  currentResultsProps,
  filterDisabledProps,
  displayDataProps,
  colorMapProps,
  graphWidthProps,
  setMemberResultsProps,
  setRowEntriesProps,
  setFilterActivatedProps,
  setIsLoadingProps,
  additionalFilterOptionsProps,
} from './D3Props';

export const firstRenderContext = createContext(true);

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
  setTabValue,
  setTableFilter,
  history,
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
  setMemberResults,
  setRowEntries,
}) {
  const handleFilterChange = (filterOptions) => {
    setCurrentFilters(filterOptions);
    handleFilteredDataUpdate(selectedMeasures, filterOptions, currentTimeline);
  }
  const handleTimelineChange = (timelineUpdate) => {
    setCurrentTimeline(timelineUpdate);
    handleFilteredDataUpdate(selectedMeasures, currentFilters, timelineUpdate);
  }
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
        setMemberResults={setMemberResults}
        setTableFilter={setTableFilter}
        setRowEntries={setRowEntries}
      />
      <ChartHeader
        isComposite={isComposite}
        setComposite={setComposite}
        setTabValue={setTabValue}
        setTableFilter={setTableFilter}
        history={history}
        isLoading={isLoading}
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
        <D3Chart
          displayData={displayData}
          colorMapping={colorMap}
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
  setTabValue: setTabValueProps,
  setTableFilter: setTableFilterProps,
  history: historyProps,
  currentResults: currentResultsProps,
  filterDisabled: filterDisabledProps,
  displayData: displayDataProps,
  colorMap: colorMapProps,
  graphWidth: graphWidthProps,
  setFilterActivated: setFilterActivatedProps,
  setIsLoading: setIsLoadingProps,
  additionalFilterOptions: additionalFilterOptionsProps,
  setMemberResults: setMemberResultsProps,
  setRowEntries: setRowEntriesProps,
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
  setTabValue: () => undefined,
  setTableFilter: () => undefined,
  history: {},
  currentResults: [],
  filterDisabled: true,
  displayData: [],
  colorMap: [],
  graphWidth: 500,
  setFilterActivated: () => undefined,
  setIsLoading: () => undefined,
  additionalFilterOptions: {},
  setMemberResults: () => undefined,
  setRowEntries: () => undefined,
};

export default D3Container;
