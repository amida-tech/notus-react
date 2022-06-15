import {
  Divider, Grid, Pagination, PaginationItem,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { colorMappingProps } from '../ChartContainer/D3Props';
import usePagination from '../Utilities/PaginationUtil';
import TableHeader from './TableHeader';
import MeasureTableRow from './MeasureTableRow';
import PatientTableRow from './PatientTableRow';
import ReportTableRow from './ReportTableRow';

function DisplayTable({
  tableType,
  rowData,
  headerInfo,
  pageSize,
  useCheckBox,
  selectedRows,
  colorMapping,
  handleCheckBoxChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(rowData.length / pageSize);
  }
  const pageData = usePagination(rowData, pageSize);
  const handleChange = (_e, p) => {
    setCurrentPage(p);
    pageData.jump(p);
  };

  return (
    <Grid container className="display-table">
      <TableHeader
        headerInfo={headerInfo}
        dataCount={rowData.length}
        useCheckBox={useCheckBox}
        handleCheckBoxEvent={handleCheckBoxChange}
        selectedRows={selectedRows}
      />
      <Divider className="display-table__header-divider" />
      {tableType === 'measure' && pageData.currentData().map((item) => (
        <Grid
          item
          className="display-table__row"
          key={`chart-container-grid-measure-${item.value}`}
        >
          <MeasureTableRow
            rowDataItem={item}
            headerInfo={headerInfo}
            useCheckBox={useCheckBox}
            handleCheckBoxEvent={handleCheckBoxChange}
            rowSelected={selectedRows.includes(item.value)}
            color={colorMapping.find((mapping) => mapping.value === item.value)?.color || '#000'}
          />
        </Grid>
      ))}
      { tableType === 'patient' && pageData.currentData().map((item) => (
        <Grid
          item
          className="display-table__row"
          key={`chart-container-grid-measure-${item.value}`}
        >
          <PatientTableRow
            rowDataItem={item}
            headerInfo={headerInfo}
          />
        </Grid>
      ))}
      { tableType === 'report' && pageData.currentData().map((item) => (
        <Grid
          item
          className="display-table__row"
          key={`chart-container-grid-measure-${item.value}`}
        >
          <ReportTableRow
            rowDataItem={item}
            headerInfo={headerInfo}
          />
        </Grid>
      ))}
      {pageCount > 0 && (
      <StyledEngineProvider injectFirst>
        <Pagination
          count={pageCount}
          size="large"
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          classes={{ root: '.MuiPagination-root' }}
          renderItem={(item) => (
            <PaginationItem
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...item}
              classes={{ root: '.MuiPaginationItem-root' }}
            />
          )}
        />
      </StyledEngineProvider>
      )}
    </Grid>
  )
}

DisplayTable.propTypes = {
  tableType: PropTypes.oneOf(['measure', 'patient', 'report']),
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.number,
    }),
  ),
  pageSize: PropTypes.number,
  useCheckBox: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
  colorMapping: colorMappingProps,
  handleCheckBoxChange: PropTypes.func,
};

DisplayTable.defaultProps = {
  tableType: 'measure',
  rowData: [],
  headerInfo: [],
  pageSize: 0,
  useCheckBox: false,
  selectedRows: [],
  colorMapping: [],
  handleCheckBoxChange: () => undefined,
}

export default DisplayTable;
