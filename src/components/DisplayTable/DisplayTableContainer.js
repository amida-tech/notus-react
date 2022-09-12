import {
  Grid, Typography, Box, Tab, Button,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import MemberTable from '../Utilities/MemberTable';
import MeasureTable from '../Utilities/MeasureTable';

import {
  storeProps,
  activeMeasureProps,
  defaultActiveMeasure,
  tabValueProps,
  isCompositeProps,
  handleSelectedMeasureChangeProps,
  headerInfoProps,
  selectedMeasuresProps,
  currentResultsProps,
  colorMapProps,
  tableFilterProps,
  handleTableFilterChangeProps,
  rowEntriesProps,
  setTableFilterProps,
  handleTabChangeProps,

} from '../ChartContainer/D3Props';
import MemberTableRow from './MemberTableRow';
import TableFilterPanel from './TableFilterPanel';
import DisplayTable from './DisplayTable';
import MeasureSelector from '../Common/MeasureSelector';
import MeasureTableRow from './MeasureTableRow';

// TODO: REMOVE DEFAULT COLOR LOGIC

function DisplayTableContainer({
  activeMeasure,
  store,
  tabValue,
  isComposite,
  headerInfo,
  handleSelectedMeasureChange,
  selectedMeasures,
  currentResults,
  colorMap,
  tableFilter,
  handleTableFilterChange,
  rowEntries,
  setTableFilter,
  handleTabChange,
}) {
  return (
    <Grid className="d3-container__bottom-display">
      <Box className="d3-container__overview-member-chart">
        <TabContext value={tabValue}>
          <Box className="d3-container__table-tab-bar">
            {isComposite ? (
              <TabList TabIndicatorProps={{ style: { backgroundColor: 'transparent', gap: '1rem' } }} sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }} onChange={handleTabChange} aria-label="overview and members tabs">
                <Tab className="d3-container__table-selection-button" label="Overview" value="overview" />
              </TabList>
            ) : (
              <TabList TabIndicatorProps={{ style: { backgroundColor: 'transparent', gap: '1rem' } }} sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }} onChange={handleTabChange} aria-label="overview and members tabs">
                <Tab className="d3-container__table-selection-button" label="Overview" value="overview" />
                <Tab className="d3-container__table-selection-button" label="Members" value="members" />
              </TabList>
            )}
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

  )
}

DisplayTableContainer.propTypes = {
  activeMeasure: activeMeasureProps,
  store: storeProps,
  tabValue: tabValueProps,
  isComposite: isCompositeProps,
  handleSelectedMeasureChange: handleSelectedMeasureChangeProps,
  headerInfo: headerInfoProps,
  selectedMeasures: selectedMeasuresProps,
  currentResults: currentResultsProps,
  colorMap: colorMapProps,
  tableFilter: tableFilterProps,
  handleTableFilterChange: handleTableFilterChangeProps,
  rowEntries: rowEntriesProps,
  setTableFilter: setTableFilterProps,
  handleTabChange: handleTabChangeProps,
};

DisplayTableContainer.defaultProps = {
  store: [],
  activeMeasure: defaultActiveMeasure,
  tabValue: 'overview',
  isComposite: true,
  handleSelectedMeasureChange: () => undefined,
  headerInfo: [],
  selectedMeasures: [],
  currentResults: [],
  colorMap: [],
  tableFilter: [],
  handleTableFilterChange: () => undefined,
  rowEntries: [],
  setTableFilter: () => undefined,
  handleTabChange: () => undefined,
};

export default DisplayTableContainer
