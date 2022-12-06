import {
  Grid,
  Box,
} from '@mui/material';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import TablePagination from '@mui/material/TablePagination';
import { measureDataFetch } from 'components/Common/Controller';
import theme from '../../assets/styles/AppTheme'

import CheckBoxCell from './CheckBoxCell';
import HeaderCell from './HeaderCell';

function DisplayTable({
  headerInfo,
  pageSize,
  useCheckBox,
  selectedRows,
  handleCheckBoxChange,
  children,
  currentMemberCount,
  totalCountMember,
  handlePagination,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const scrollPosition = useRef(0)
  const hScroll = useRef(null)
  const vScroll = useRef(null)

  const ciseOverviewCheck = children[0]?.props?.rowDataItem.value === 'cise'
  const ciseTableCheck = children[0]?.props.headerInfo[1].header === 'CIS-E'
  const tableCheck = children[0]?.props.headerInfo[0].header === 'MemberID'
  const overviewCheck = children[0]?.props.headerInfo[0].header === 'Measure'
  let nonCiseOverviewCheck = 'column'

  if (ciseOverviewCheck || (tableCheck && !ciseTableCheck) || overviewCheck) {
    nonCiseOverviewCheck = 'row'
  }

  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(children.length / pageSize);
  }

  const handleChangePage = (_event, newPage) => {
    console.log({
      newPage, currentPage, rowsPerPage, currentMemberCount, totalCountMember,
    })
    const EntriesBeforeCall = currentMemberCount / rowsPerPage
    // const EntriesLeftBeforeCall = rowsPerPage * newPage
    if (EntriesBeforeCall - newPage === 1) {
      handlePagination(newPage, rowsPerPage)
    }
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleScroll = () => {
    scrollPosition.current = vScroll.current.scrollLeft
  }

  if (ciseTableCheck) {
    return (
      <>
        <Grid container className="cise-table" ref={hScroll}>
          <Box
            onScroll={() => handleScroll()}
            sx={{ overflow: 'auto', width: '100%' }}
          >
            <Grid
              container
              item
              className="cise-table__header-section"
              sx={{
                backgroundColor: theme.palette?.background.main,
                color: theme.palette?.bluegray.D1,
                padding: '.5rem 0',
              }}
            >
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
        {pageCount > 1 && (
        <StyledEngineProvider injectFirst>
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 25, 50]}
            count={children.length}
            page={currentPage}
            onPageChange={handleChangePage}
            className="display-table__pagination"
            sx={{
              color: theme.palette?.bluegray.D4,
              marginLeft: 'auto',
            }}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </StyledEngineProvider>
        )}
      </>
    )
  }
  return (
    <>
      <Grid
        container
        className="display-table"
        sx={{ flexDirection: nonCiseOverviewCheck, color: theme.palette?.bluegray.D1 }}
      >
        <Grid
          sx={{
            backgroundColor: theme.palette?.background.main,
          }}
          container
          item
          className="display-table__header-section"
        >
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
      {pageCount > 1 && (
        <StyledEngineProvider injectFirst>
          <TablePagination
            component="div"
            sx={{
              '.MuiTablePagination-toolbar': {
                color: theme.palette?.bluegray.L1,
                fontWeight: 700,
              },
              '.MuiPaginationItem-root': {
                color: theme.palette?.bluegray.D1,
                border: `.1rem solid ${theme.palette?.bluegray.L3}`,
              },
            }}
            rowsPerPageOptions={[10, 25, 50]}
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
  handlePagination: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  currentMemberCount: PropTypes.number,
  totalCountMember: PropTypes.number,
};

DisplayTable.defaultProps = {
  children: [],
  headerInfo: [],
  pageSize: 0,
  currentMemberCount: 0,
  totalCountMember: 0,
  useCheckBox: false,
  selectedRows: [],
  handlePagination: () => undefined,
  handleCheckBoxChange: () => undefined,
}

export default DisplayTable;
