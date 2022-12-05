import { useContext } from 'react'
import {
  Grid, Typography, Box, Button,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme'

import { TableTab } from '../Utilities/TableTab'

import { DatastoreContext } from '../../context/DatastoreProvider';

import {
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
import TableFilterPanel from './TableFilterPanel';
import MeasureSelector from '../Common/MeasureSelector';
import EntriesFound from './EntriesFound'
import OverviewTable from './OverviewTable'
import MemberTable from './MemberTable'

function DisplayTableContainer({
  activeMeasure,
  tabValue,
  isComposite,
  headerInfo,
  currentResults,
  colorMap,
  tableFilter,
  handleTableFilterChange,
  handleSelectedMeasureChange,
  rowEntries,
  handleTabChange,
}) {
  const { datastore } = useContext(DatastoreContext);

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
                    currentResults={datastore.currentResults}
                    handleMeasureChange={handleSelectedMeasureChange}
                  />
                </Grid>
              ) : null}

            {/* NEW TABLE */}
            <OverviewTable
              activeMeasure={activeMeasure}
              headerInfo={headerInfo}
              currentResults={currentResults}
              colorMap={colorMap}
              handleSelectedMeasureChange={handleSelectedMeasureChange}
            />

          </TabPanel>

          <TabPanel value="members">

            <TableFilterPanel
              tableFilter={tableFilter}
              handleTableFilterChange={handleTableFilterChange}
            />
            <EntriesFound total={rowEntries.length} />

            <MemberTable
              activeMeasure={activeMeasure}
              headerInfo={headerInfo}
              rowEntries={rowEntries}
            />

          </TabPanel>

        </TabContext>
      </Box>
    </Grid>

  )
}

DisplayTableContainer.propTypes = {
  activeMeasure: activeMeasureProps,
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
