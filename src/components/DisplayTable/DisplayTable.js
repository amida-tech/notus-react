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

  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(rowData.length / pageSize);
  }
  const pageData = usePagination(rowData, pageSize);

  const handleChangePage = (_e, p) => {
    setPage(p);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const rowsPerPageOptions = () => {
    const MeasureLength = pageData.currentData().length
    const optionRegular = [1, 2, 3, MeasureLength]
    const optionXL = [1, 3, 5, 10, 15, 20, 25, MeasureLength]
    const optionL = [1, 3, 5, 10, 15, 20, MeasureLength]
    const optionM = [1, 3, 5, 10, 15, MeasureLength]
    const optionS = [1, 3, 5, 10, MeasureLength]
    const optionXS = [1, 3, 5, MeasureLength]

    if (MeasureLength >= 45) {
      return optionXL
    } if (MeasureLength < 44 && MeasureLength > 30) {
      return optionL
    } if (MeasureLength < 29 && MeasureLength > 19) {
      return optionM
    } if (MeasureLength < 18 && MeasureLength > 12) {
      return optionS
    } if (MeasureLength < 11 && MeasureLength > 6) {
      return optionXS
    }
    return optionRegular
  }

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
      {pageCount > 0 && (
      <StyledEngineProvider injectFirst>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions()}
          count={pageData.currentData().length}
          page={page}
          className="display-table__pagination"
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledEngineProvider>
      )}
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
