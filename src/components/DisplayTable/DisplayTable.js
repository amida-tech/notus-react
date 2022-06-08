import {
  Divider, Grid, PaginationItem,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import TablePagination from '@mui/material/TablePagination';
import { colorMappingProps } from '../ChartContainer/D3Props';
import usePagination from '../Utilites/PaginationUtil';
import TableHeader from './TableHeader';
import MeasureTableRow from './MeasureTableRow';
import PatientTableRow from './PatientTableRow';

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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const pageData = usePagination(rowData, pageSize);

  const handlePageChange = (_e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }
  // const [currentPage, setCurrentPage] = useState(1);

  // let pageCount = 0;
  // if (pageSize) {
  //   pageCount = Math.ceil(rowData.length / pageSize);
  // }

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
      {tableType === 'measure'
        ? pageData.currentData()
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
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
          ))
        : pageData.currentData()
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
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
      <StyledEngineProvider injectFirst>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10]}
          count={pageData.currentData().length}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onPageChange={handlePageChange}
          // classes={{ root: '.MuiPagination-root' }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          renderItem={(item) => (
            <PaginationItem
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...item}
              classes={{ root: '.MuiPaginationItem-root' }}
            />
          )}
        />
      </StyledEngineProvider>
    </Grid>
  )
}

DisplayTable.propTypes = {
  tableType: PropTypes.oneOf(['measure', 'patient']),
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
  isComposite: PropTypes.bool,
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
  isComposite: false,
  useCheckBox: false,
  selectedRows: [],
  colorMapping: [],
  handleCheckBoxChange: () => undefined,
}

export default DisplayTable;
