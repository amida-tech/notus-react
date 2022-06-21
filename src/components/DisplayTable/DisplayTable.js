import {
  Divider, Grid,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import TablePagination from '@mui/material/TablePagination';
import CheckBoxCell from './CheckBoxCell';
import HeaderCell from './HeaderCell';

function DisplayTable({
  invertedColor,
  headerInfo,
  pageSize,
  useCheckBox,
  selectedRows,
  handleCheckBoxChange,
  children,
}) {
  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(children.length / pageSize);
  }
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);

  const handleChangePage = (_event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <>
    <Grid container className="display-table">
      <Grid container item className={`display-table__header-section ${headerInfo.length > 10 && 'display-table__header-section--wide'} ${invertedColor && 'display-table__header-section--inverted'}`}>
        {useCheckBox && (
        <CheckBoxCell
          handleCheckBoxEvent={handleCheckBoxChange}
          checked={children.length === selectedRows.length}
          value="all"
        />
        )}
        {headerInfo.map((item) => (
          <Grid
            item
            className={`display-table__header-item display-table__header-item--${item.flexBasis}`}
            key={item.header}
          >
            <HeaderCell text={item.header} tooltip={item.tooltip} />
          </Grid>
        ))}
      </Grid>
      <Divider className="display-table__header-divider" />
      { children.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage,
      ).map((child) => (
        <Grid
          item
          className="display-table__row"
          key={`display-table-grid-for-${child.key}`}
        >
          {child}
        </Grid>
      ))}
    </Grid>
    
    {pageCount > 1 && (
      <StyledEngineProvider injectFirst>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          count={children.length}
          page={currentPage}
          onPageChange={handleChangePage}
          className="display-table__pagination"
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledEngineProvider>
      )}
    </>
  )
}

DisplayTable.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  invertedColor: PropTypes.bool,
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
      ]),
    }),
  ),
  pageSize: PropTypes.number,
  useCheckBox: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
  handleCheckBoxChange: PropTypes.func,
};

DisplayTable.defaultProps = {
  children: [],
  invertedColor: false,
  headerInfo: [],
  pageSize: 0,
  useCheckBox: false,
  selectedRows: [],
  handleCheckBoxChange: () => undefined,
}

export default DisplayTable;
