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
  const [filterInfo, setFilterInfo] = useState({
    members: [],
    currentResults: [],
    displayData: [],
    results: [],
    filters: {},
  });
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
      console.log('1', 'DATASTORE Current Results found ACTIVE MEASURE SET TO: ', datastore.currentResults.find(
        (result) => result.measure === currentMeasure,
      ) || defaultActiveMeasure)

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
    console.log("3: SET IT OFFFFFFFFF")
    const baseColorMap = filterInfo.currentResults.length === 0
      ? datastore.currentResults.map((item, index) => ({
        value: item.measure,
        color: index <= 11
          ? datastore.chartColorArray[index]
          : datastore.chartColorArray[index % 11],
      }))
      : filterInfo.currentResults.map((item, index) => ({
        value: item.measure,
        color: index <= 11
          ? datastore.chartColorArray[index]
          : datastore.chartColorArray[index % 11],
      }));

    setCurrentTimeline(
      filterInfo.currentResults.length === 0
        ? datastore.defaultTimelineState
        : filterInfo.timeline,
    );
    setCurrentFilters(
      filterInfo.currentResults.length === 0
        ? datastore.defaultFilterState
        : filterInfo.filters,
    );
    setAdditionalFilterOptions(datastore.filterOptions);
    const ActiveMeasureTest = activeMeasure.measure === 'composite' || activeMeasure.measure === '';
    if (ActiveMeasureTest && filterInfo.currentResults.length === 0) {
      console.log('3-1', 'composite')
      setComposite(true);
      setDisplayData(datastore.results.map((result) => ({ ...result })));
      setCurrentResults(datastore.currentResults);
      setSelectedMeasures(datastore.currentResults.map((result) => result.measure));
      setColorMap(baseColorMap);
      setFilterDisabled(false);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(true));
    } else if (ActiveMeasureTest && filterInfo.currentResults.length > 0) {
      console.log('3-1', 'composite')
      setComposite(true);
      setColorMap(baseColorMap);
      setFilterDisabled(false);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(true));
    } else if (!ActiveMeasureTest && filterInfo.currentResults.length === 0) {
      console.log('3-2', 'NON COMPOSITE')
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
    } else if (!ActiveMeasureTest && filterInfo.currentResults.length > 0) {
      console.log('3-2', 'NON COMPOSITE')
      setComposite(false);
      setColorMap(
        ColorMapping(baseColorMap, datastore.chartColorArray, filterInfo.subMeasureCurrentResults),
      );
      setFilterDisabled(false);
      setTableFilter([]);
      setHeaderInfo(MeasureTable.headerData(false));
    }
  }, [setTableFilter, history, activeMeasure, isComposite, datastore]);

  useEffect(() => {
    async function fetchData() {
      const records = await measureDataFetch(activeMeasure.measure)
      console.log('4-2', 'NON COMPOSITE MEMBER RESULTS WAS EMPTY NOW IS: ', { records })
      setMemberResults(records)
    }
    if (!isComposite && memberResults.length === 0) {
      if (filterInfo.members.length > 0) {
        console.log('4-1', 'NON COMPOSITE MEMBER RESULTS WAS EMPTY NOW IS: ', filterInfo.members.length)
        setMemberResults(filterInfo.members)
      } else {
        fetchData()
      }
    }
  }, [
    isComposite,
    memberResults,
    filterInfo,
    activeMeasure.measure,
  ])

  useEffect(() => {
    setRowEntries(MemberTable.formatData(
      memberResults,
      activeMeasure.measure,
      datastore.info,
      tableFilter,
    ))
  }, [tableFilter, memberResults, activeMeasure.measure, datastore.info])

  useEffect(() => {
    const path = window.location.pathname
    if (path.includes('members')) {
      const pathMeasure = path.replace('/', '').replace('/members', '');
      const subMeasures = Object.keys(datastore.info).filter((item) => item.includes(pathMeasure));
      setHeaderInfo(MemberTable.headerData(subMeasures, datastore.info));
      setRowEntries(MemberTable.formatData(
        memberResults,
        pathMeasure,
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
    activeMeasure.measure,
    memberResults,
    selectedMeasures,
    datastore.info,
    tabValue,
    tableFilter,
  ]);

  // If control needs to be shared across multiple components,
  // add them through useState above and append them to these.
  const handleFilteredDataUpdate = async (measures, filters, timeline) => {
    let newDisplayData
    let cloneDailyMeasureResults
    let cloneMembers = []
    if (
      filters.healthcareCoverages.length > 0
        || filters.healthcareProviders.length > 0
        || filters.payors.length > 0
        || filters.healthcarePractitioners.length > 0
    ) {
      const currentMeasure = measure || 'composite';
      const searchResults = await filterSearch(currentMeasure === 'composite' ? false : currentMeasure, filters, isComposite)
      cloneDailyMeasureResults = structuredClone(searchResults.dailyMeasureResults)
      cloneMembers = structuredClone(searchResults.members)
      newDisplayData = isComposite
        ? cloneDailyMeasureResults
        : expandSubMeasureResults(activeMeasure, cloneDailyMeasureResults);
    } else {
      newDisplayData = isComposite
        ? datastore.results.map((result) => ({ ...result }))
        : expandSubMeasureResults(activeMeasure, datastore.results);
    }
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
    // console.log({newDisplayData});

    const calcResults = calcMemberResults(newDisplayData, datastore.info)
    const subMeasureCurrentResults = getSubMeasureCurrentResults(
      activeMeasure,
      calcResults.currentResults,
    );
    const newFilterInfo = {
      members: cloneMembers,
      currentResults: isComposite ? calcResults.currentResults : subMeasureCurrentResults,
      results: calcResults.results,
      filters,
      timeline,
      subMeasureCurrentResults,
    }
    setFilterInfo(newFilterInfo)
    setCurrentResults(newFilterInfo.currentResults)
    setSelectedMeasures(newFilterInfo.currentResults.map((result) => result.measure));
    setDisplayData(newFilterInfo.results.map((result) => ({ ...result })));
    setIsLoading(false)
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
  const handleResetData = () => {
    const baseColorMap = datastore.currentResults.map((item, index) => ({
      value: item.measure,
      color: index <= 11 ? datastore.chartColorArray[index] : datastore.chartColorArray[index % 11],
    }));
    setCurrentTimeline(datastore.defaultTimelineState);
    setCurrentFilters(datastore.defaultFilterState);
    if (activeMeasure.measure === 'composite' || activeMeasure.measure === '') {
      setComposite(true);
      setCurrentResults(datastore.currentResults);
      setSelectedMeasures(datastore.currentResults.map((result) => result.measure));
      setDisplayData(datastore.results.map((result) => ({ ...result })));
      setColorMap(baseColorMap);
      setFilterDisabled(false);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(true));
    } else {
      setComposite(false);
      const subMeasureCurrentResults = getSubMeasureCurrentResults(activeMeasure, datastore);
      setDisplayData(expandSubMeasureResults(activeMeasure, datastore));
      setCurrentResults(subMeasureCurrentResults);
      setSelectedMeasures(subMeasureCurrentResults.map((result) => result.measure));
      setColorMap(ColorMapping(baseColorMap, datastore.chartColorArray, subMeasureCurrentResults));
      setFilterDisabled(true);
      setMemberResults([]);
      setTableFilter([]);
      setRowEntries([])
      setHeaderInfo(MeasureTable.headerData(false));
    }
  }
  console.log({selectedMeasures})
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
                    setMemberResults={setMemberResults}
                    setRowEntries={setRowEntries}
                    handleResetData={handleResetData}
                    setFilterInfo={setFilterInfo}
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
