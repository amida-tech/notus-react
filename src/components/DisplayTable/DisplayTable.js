import {
  Divider, Grid,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pageData = usePagination(rowData, pageSize);
<<<<<<< HEAD

  const handleChangePage = (_e, p) => {
    setPage(p);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
=======
  const handleChange = (_e, p) => {
    setCurrentPage(p);
    pageData.jump(p);
>>>>>>> 3e66e5090cae6d04232707678221c7c1ff00c062
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
<<<<<<< HEAD
      {pageData.currentData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
=======
      {tableType === 'measure'
        ? pageData.currentData().map((item) => (
>>>>>>> 3e66e5090cae6d04232707678221c7c1ff00c062
          <Grid
            item
            className="display-table__row"
            key={`chart-container-grid-measure-${item.value}`}
          >
<<<<<<< HEAD
            <TableRow
              rowDataItem={item}
              headerInfo={headerInfo}
              useCheckBox={useCheckBox}
              handleCheckBoxEvent={handleCheckBoxEvent}
              rowSelected={selectedRows.includes(item.value)}
              color={colorMapping.find((mapping) => mapping.value === item.value).color}
            />
          </Grid>

        ))}
=======
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
        : pageData.currentData().map((item) => (
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
      {pageCount > 0 && (
>>>>>>> 3e66e5090cae6d04232707678221c7c1ff00c062
      <StyledEngineProvider injectFirst>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10]}
          count={pageData.currentData().length}
          page={page}
          className="display-table__pagination"
          onPageChange={handleChangePage}
          classes={{
            input: { backgroundColor: 'red' },
          }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
