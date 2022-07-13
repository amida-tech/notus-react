import {
  Grid,
  Box,
} from '@mui/material';
import React, { useState, useRef } from 'react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);

  const scrollPosition = useRef(0)
  const hScroll = useRef(null)
  const vScroll = useRef(null)

  // const overviewCheck = !!(children[0]?.props?.headerInfo[0].header === 'Sub-Measure' ||
  // children[0]?.props?.headerInfo[0].header === 'Measure')
  const ciseOverviewCheck = children[0]?.props?.rowDataItem.value === 'cise'
  const ciseTableCheck = children[0]?.props.headerInfo[1].header === 'CIS-E'
  const tableCheck = children[0]?.props.headerInfo[0].header === 'MemberID'
  let nonCiseOverviewCheck = 'column'

  if (ciseOverviewCheck || (tableCheck && !ciseTableCheck)) {
    nonCiseOverviewCheck = 'row'
  }

  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(children.length / pageSize);
  }

  const handleChangePage = (_event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleScroll = () => {
    scrollPosition.current = vScroll.current.scrollLeft
  }

  return (
    <>
      {ciseTableCheck
        ? (
          <Grid container className="cise-table" ref={hScroll}>
            <Box
              onScroll={() => handleScroll()}
              sx={{ overflow: 'auto', width: '100%' }}
            >
              <Grid container item className={`cise-table__header-section ${headerInfo.length > 10 && 'cise-table__header-section--wide'} ${invertedColor && 'cise-table__header-section--inverted'}`}>
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
                    className={`cise-table__header-item cise-table__header-item--${item.flexBasis}`}
                    key={item.header}
                  >
                    <HeaderCell
                      text={item.header}
                      tooltip={item.tooltip}
                      ciseCheck={ciseTableCheck}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  height: '32rem',
                  width: '120rem',
                }}
                ref={vScroll}
                className="cise-table__data-display"
              >
                { children.length > 1 ? children.slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage,
                ).map((child) => (
                  <Grid
                    item
                    className="cise-table__row"
                    key={`cise-table-grid-for-${child.key}`}
                  >
                    {child}
                  </Grid>
                ))
                  : (
                    <Grid
                      item
                      className="cise-table__row"
                      key={`cise-table-grid-for-${children.className}`}
                    >
                      {children}
                    </Grid>
                  )}
              </Box>
            </Box>
          </Grid>
        )
        : (
          <Grid container className="display-table" sx={{ flexDirection: nonCiseOverviewCheck }}>
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
            { children.length > 1 ? children.slice(
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
            ))
              : (
                <Grid
                  item
                  className="display-table__row"
                  key={`display-table-grid-for-${children.className}`}
                >
                  {children}
                </Grid>
              )}
          </Grid>
        )}

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
  children: PropTypes.node,
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
