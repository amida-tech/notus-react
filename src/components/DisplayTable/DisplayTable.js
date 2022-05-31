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
import TableRow from './TableRow';

function DisplayTable({
  rowData,
  headerInfo,
  pageSize,
  useCheckBox,
  handleCheckBoxEvent,
  selectedRows,
  colorMapping,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pageData = usePagination(rowData, pageSize);

  const handleChangePage = (_e, p) => {
    setPage(p);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container className="display-table">
      <TableHeader
        headerInfo={headerInfo}
        dataCount={rowData.length}
        useCheckBox={useCheckBox}
        handleCheckBoxEvent={handleCheckBoxEvent}
        selectedRows={selectedRows}
      />
      <Divider className="display-table__header-divider" />
      {pageData.currentData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
          <Grid
            item
            className="display-table__row"
            key={`chart-container-grid-measure-${item.value}`}
          >
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
  handleCheckBoxEvent: PropTypes.func,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
  colorMapping: colorMappingProps,
};

DisplayTable.defaultProps = {
  rowData: [],
  headerInfo: [],
  pageSize: 0,
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  selectedRows: [],
  colorMapping: [],
}

export default DisplayTable;
