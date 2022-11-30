import {
  Grid, Typography, Box, Button,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme'

import { TableTab } from '../Utilities/TableTab'
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
  handleTabChangeProps,
} from '../ChartContainer/D3Props';
import MemberTableRow from './MemberTableRow';
import TableFilterPanel from './TableFilterPanel';
import DisplayTable from './DisplayTable';
import MeasureSelector from '../Common/MeasureSelector';
import MeasureTableRow from './MeasureTableRow';
import EntriesFound from './EntriesFound'
import NewOverviewTable from './NewOverviewTable'
import NewMemberTable from './NewMemberTable'

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
  handleTabChange,
  handleResetData,
}) {
  return (
    <Grid
      sx={{ outline: `${theme.palette?.primary.dark} solid 1px` }}
      className="d3-container__bottom-display"
    >
      <Box className="d3-container__overview-member-chart">
        <TabContext value={tabValue}>
          <Box
            sx={{
              height: '4rem',
              outline: `${theme.palette?.primary.dark} solid 1px`,
              backgroundColor: theme.palette?.primary.main,
            }}
          >
            {isComposite ? (
              <TabList
                TabIndicatorProps={{ style: { backgroundColor: 'transparent', gap: '1rem' } }}
                sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }}
                onChange={handleTabChange}
                aria-label="overview and members tabs"
              >
                <TableTab
                  className="d3-container__table-selection-button"
                  sx={{
                    color: theme.palette?.primary.light,
                  }}
                  label="Overview"
                  value="overview"
                />
              </TabList>
            ) : (
              <TabList TabIndicatorProps={{ style: { backgroundColor: 'transparent', gap: '1rem' } }} sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }} onChange={handleTabChange} aria-label="overview and members tabs">
                <TableTab
                  className="d3-container__table-selection-button"
                  label="Overview"
                  value="overview"
                />
                <TableTab
                  className="d3-container__table-selection-button"
                  label="Members"
                  value="members"
                />
              </TabList>
            )}
          </Box>

          <TabPanel value="overview">

            {headerInfo[0].header !== 'Sub-Measure'
              ? (
                <Grid className="d3-container__measure-selector">
                  <Typography
                    color={theme.palette?.bluegray.D4}
                    className="d3-container__selector-title"
                  >
                    Detailed View:
                  </Typography>
                  <MeasureSelector
                    measure={activeMeasure.measure}
                    currentResults={store.currentResults}
                    handleMeasureChange={handleSelectedMeasureChange}
                  />
                </Grid>
              ) : null}
            {/* NEW TABLE */}
            <NewOverviewTable />
            {/* OLD TABLE */}
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
                  color={
                    colorMap.find((mapping) => mapping.value === item.value)?.color
                    || theme.palette?.primary.main
                  }
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
            <EntriesFound total={rowEntries.length} />

            <NewMemberTable />

            <DisplayTable
              headerInfo={headerInfo}
              pageSize={MemberTable.pageSize}
              useCheckBox={false}
            >
              {/* NO ENTRIES? */}
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
                        handleResetData()
                      }}
                    >
                      Reset Table Filters
                    </Button>
                  </Box>
                )
                // ENTRIES FOUND
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
  handleTabChange: handleTabChangeProps,
  handleResetData: PropTypes.func,
};

DisplayTableContainer.defaultProps = {
  store: {},
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
  handleTabChange: () => undefined,
  handleResetData: () => undefined,
};

export default DisplayTableContainer
