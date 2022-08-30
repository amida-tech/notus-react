import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useParams, useHistory } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { DatastoreContext } from '../context/DatastoreProvider';
import { defaultActiveMeasure } from '../components/ChartContainer/D3Props';

import Banner from '../components/Common/Banner';
import D3Container from '../components/ChartContainer';
import DisplayTableContainer from '../components/DisplayTable/DisplayTableContainer';
import RatingTrends from '../components/Summary/RatingTrends';
import ColorMapping from '../components/Utilities/ColorMapping';
import MeasureTable from '../components/Utilities/MeasureTable';
import MemberTable from '../components/Utilities/MemberTable';

import {
  calcMemberResults,
  expandSubMeasureResults, filterByDOC,
  filterByPercentage,
  filterByStars,
  filterByTimeline,
  getSubMeasureCurrentResults,
} from '../components/ChartContainer/D3ContainerUtils';

import {
  measureDataFetch,
  filterSearch,
} from '../components/Common/Controller'

export default function Dashboard() {
  const { datastore } = useContext(DatastoreContext);
  const [filterDrawerOpen, toggleFilterDrawer] = useState(false);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filterInfo, setFilterInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeMeasure, setActiveMeasure] = useState(defaultActiveMeasure);
  const history = useHistory();
  const [displayData, setDisplayData] = useState(
    datastore.results.map((result) => ({ ...result })),
  );
  const [isComposite, setComposite] = useState(true);
  const [currentResults, setCurrentResults] = useState([]);
  const [colorMap, setColorMap] = useState([]);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(datastore.defaultFilterState);
  const [additionalFilterOptions, setAdditionalFilterOptions] = useState(datastore.filterOptions)
  const [currentTimeline, setCurrentTimeline] = useState(datastore.defaultTimelineState);
  const [graphWidth, setGraphWidth] = useState(window.innerWidth);
  const [filterDisabled, setFilterDisabled] = useState(true);
  const [memberResults, setMemberResults] = useState([]);
  const [tableFilter, setTableFilter] = useState([]);
  const [headerInfo, setHeaderInfo] = useState([])
  const [rowEntries, setRowEntries] = useState([])
  const [tabValue, setTabValue] = useState('overview');
  const { measure } = useParams();

  useEffect(() => {
    if (datastore.currentResults !== undefined) {
      const currentMeasure = measure || 'composite';
      setActiveMeasure(datastore.currentResults.find(
        (result) => result.measure === currentMeasure,
      ) || defaultActiveMeasure);
      setIsLoading(datastore.datastoreLoading);
    }
  }, [datastore.currentResults, datastore.datastoreLoading, measure]);

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
    const baseColorMap = filterActivated ? datastore.currentResults.map((item, index) => ({
      value: item.measure,
      color: index <= 11 ? datastore.chartColorArray[index] : datastore.chartColorArray[index % 11],
    })) : datastore.currentResults.map((item, index) => ({
      value: item.measure,
      color: index <= 11 ? datastore.chartColorArray[index] : datastore.chartColorArray[index % 11],
    }));
    setCurrentTimeline(datastore.defaultTimelineState);
    setCurrentFilters(datastore.defaultFilterState);
    setAdditionalFilterOptions(datastore.filterOptions);
    if (activeMeasure.measure === 'composite' || activeMeasure.measure === '') {
      if (filterActivated) {
        const filterInfoCurrentResults = calcMemberResults(
          filterInfo.members,
          datastore.info,
        ).currentResults
        setComposite(true);
        setDisplayData(filterInfo.members);
        setCurrentResults(filterInfoCurrentResults);
        setSelectedMeasures(filterInfoCurrentResults.map((result) => result.measure));
        setColorMap(baseColorMap);
      } else {
        setComposite(true);
        setDisplayData(datastore.results.map((result) => ({ ...result })));
        setCurrentResults(datastore.currentResults);
        setSelectedMeasures(datastore.currentResults.map((result) => result.measure));
        setColorMap(baseColorMap);
      }
      setFilterDisabled(false);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([]);
      setHeaderInfo(MeasureTable.headerData(true));
    } else {
      if (filterActivated) {
        setComposite(false);
        const filterInfoCurrentResults = calcMemberResults(
          filterInfo.members,
          datastore.info,
        ).currentResults
        const subMeasureCurrentResults = getSubMeasureCurrentResults(
          activeMeasure,
          filterInfoCurrentResults,
        );
        setDisplayData(expandSubMeasureResults(activeMeasure, datastore.results));
        setCurrentResults(subMeasureCurrentResults);
        setSelectedMeasures(subMeasureCurrentResults.map((result) => result.measure));
        setColorMap(
          ColorMapping(baseColorMap, datastore.chartColorArray, subMeasureCurrentResults),
        );
        setFilterDisabled(false);
        setMemberResults([]);
        setTableFilter([]);
        setRowEntries([])
        setHeaderInfo(MeasureTable.headerData(false));
      }
      setComposite(false);
      const subMeasureCurrentResults = getSubMeasureCurrentResults(
        activeMeasure,
        datastore.currentResults,
      );
      setDisplayData(expandSubMeasureResults(activeMeasure, datastore.results));
      setCurrentResults(subMeasureCurrentResults);
      setSelectedMeasures(subMeasureCurrentResults.map((result) => result.measure));
      setColorMap(ColorMapping(baseColorMap, datastore.chartColorArray, subMeasureCurrentResults));
      setFilterDisabled(false);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(false));
    }
  }, [setTableFilter, history, activeMeasure, isComposite, datastore, filterActivated]);

  useEffect(() => {
    async function fetchData() {
      const records = await measureDataFetch(activeMeasure.measure)
      setMemberResults(records)
    }
    if (!isComposite && memberResults.length === 0) {
      fetchData()
    }
  })

  useEffect(() => {
    if (datastore.currentResults !== undefined) {
      setSelectedMeasures(datastore.currentResults.map((result) => result.measure));
    }
  }, [datastore.currentResults]);

  useEffect(() => {
    if (filterActivated) {
      setRowEntries(MemberTable.formatData(
        filterInfo.members,
        activeMeasure.measure,
        datastore.info,
        tableFilter,
      ))
    } else {
      setRowEntries(MemberTable.formatData(
        memberResults,
        activeMeasure.measure,
        datastore.info,
        tableFilter,
      ))
    }
  }, [tableFilter, memberResults, activeMeasure.measure, datastore.info, filterActivated])

  useEffect(() => {
    const path = window.location.pathname
    if (filterActivated) {
      if (path.includes('members')) {
        const subMeasures = Object.keys(datastore.info).filter((item) => item.includes(measure));
        setHeaderInfo(MemberTable.headerData(subMeasures, datastore.info));
        setRowEntries(MemberTable.formatData(
          filterInfo.members,
          measure,
          datastore.info,
          tableFilter,
        ))
        setComposite(false)
        setTabValue('members')
      } else if (path === '/') {
        setTabValue('overview')
      } else {
        setTabValue('overview')
      }
    }
    if (path.includes('members')) {
      const subMeasures = Object.keys(datastore.info).filter((item) => item.includes(measure));
      setHeaderInfo(MemberTable.headerData(subMeasures, datastore.info));
      setRowEntries(MemberTable.formatData(
        memberResults,
        measure,
        datastore.info,
        tableFilter,
      ))
      setComposite(false)
      setTabValue('members')
    } else if (path === '/') {
      setTabValue('overview')
    } else {
      setTabValue('overview')
    }
  }, [
    measure,
    memberResults,
    selectedMeasures,
    datastore.info,
    tabValue,
    tableFilter,
  ]);

  // If control needs to be shared across multiple components,
  // add them through useState above and append them to these.
  const handleFilteredDataUpdate = async (measures, filters, timeline) => {
    const searchResults = await filterSearch(measures[0], filters, isComposite)
    if (searchResults.status !== 'Failed') {
      setFilterInfo({
        ...searchResults,
        currentResults: calcMemberResults(
          searchResults.members,
          datastore.info,
        ).currentResults,
      })
      const compositeDisplayData = calcMemberResults(
        searchResults.dailyMeasureResults,
        datastore.info,
      ).results

      const nonCompositeDisplayData = expandSubMeasureResults(activeMeasure, compositeDisplayData)

      let newDisplayData = isComposite
        ? compositeDisplayData
        : nonCompositeDisplayData
      newDisplayData = newDisplayData.filter((result) => measures.includes(result.measure));

      if (filters.domainsOfCare.length > 0) {
        newDisplayData = filterByDOC(newDisplayData, filters, datastore);
      }

      if (filters.stars.length > 0) {
        newDisplayData = filterByStars(newDisplayData, filters, datastore);
      }

      if (filters.percentRange[0] > 0 || filters.percentRange[1] < 100) {
        newDisplayData = filterByPercentage(newDisplayData, filters, datastore);
      }

      newDisplayData = filterByTimeline(newDisplayData, timeline);
      setFilterActivated(true)
      setDisplayData(newDisplayData);
      setIsLoading(false)
      // eslint-disable-next-line no-else-return
    } else {
      // eslint-disable-next-line no-alert
      alert('No Patients Found with given search parameters. Filters will be reset to original state ')
      window.location.reload();
    }
  };

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
    const MeasureSelectorCheck = event.target.name === 'Select Measure';
    if (MeasureSelectorCheck) {
      history.push(`/${event.target.value === 'composite' ? '' : event.target.value}`)
    }
  };

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
      setHeaderInfo(MemberTable.headerData(selectedMeasures, datastore.info));
      setRowEntries(MemberTable.formatData(
        memberResults,
        activeMeasure.measure,
        datastore.info,
        tableFilter,
      ))
    } else {
      history.push(`/${activeMeasure.measure}`)
      setHeaderInfo(MeasureTable.headerData(isComposite));
    }
  };
  return (
    <Box className="dashboard">
      <Paper elevation={0} className="dashboard__paper">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={4}>
            <Grid item className="dashboard__summary" sm={12}>
              <Banner headerText="HEDIS Dashboard" lastUpdated={datastore.lastUpdated} />
            </Grid>
            <Grid item xs={12}>
              { isLoading
                ? <Skeleton variant="rectangular" height={300} />
                : (
                  <D3Container
                    additionalFilterOptions={additionalFilterOptions}
                    setCurrentFilters={setCurrentFilters}
                    selectedMeasures={selectedMeasures}
                    currentTimeline={currentTimeline}
                    currentFilters={currentFilters}
                    handleFilteredDataUpdate={handleFilteredDataUpdate}
                    setCurrentTimeline={setCurrentTimeline}
                    filterDrawerOpen={filterDrawerOpen}
                    toggleFilterDrawer={toggleFilterDrawer}
                    isComposite={isComposite}
                    setComposite={setComposite}
                    setTabValue={setTabValue}
                    setTableFilter={setTableFilter}
                    history={history}
                    isLoading={isLoading}
                    currentResults={currentResults}
                    activeMeasure={activeMeasure}
                    filterDisabled={filterDisabled}
                    displayData={displayData}
                    colorMap={colorMap}
                    store={datastore}
                    graphWidth={graphWidth}
                    setFilterActivated={setFilterActivated}
                    setIsLoading={setIsLoading}
                  />
                )}
            </Grid>
            <Grid item xs={12}>
              { isLoading
                ? <Skeleton variant="rectangular" height={200} />
                : (
                  <RatingTrends
                    activeMeasure={activeMeasure}
                    trends={datastore.trends}
                    info={datastore.info}
                  />
                )}
            </Grid>
            <Grid item xs={12}>
              { isLoading
                ? <Skeleton variant="rectangular" height={500} />
                : (
                  <div className="d3-container">

                    <DisplayTableContainer
                      activeMeasure={activeMeasure}
                      store={datastore}
                      tabValue={tabValue}
                      isComposite={isComposite}
                      headerInfo={headerInfo}
                      handleSelectedMeasureChange={handleSelectedMeasureChange}
                      selectedMeasures={selectedMeasures}
                      currentResults={currentResults}
                      colorMap={colorMap}
                      tableFilter={tableFilter}
                      handleTableFilterChange={handleTableFilterChange}
                      rowEntries={rowEntries}
                      setTableFilter={setTableFilter}
                      handleTabChange={handleTabChange}
                    />
                  </div>
                )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}
