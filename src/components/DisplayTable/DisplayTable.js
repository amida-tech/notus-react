import {
  Divider, Grid, Pagination, PaginationItem,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import usePagination from '../Utilities/PaginationUtil';
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
  const [currentPage, setCurrentPage] = useState(1);

  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(children.length / pageSize);
  }
  const pageData = usePagination(children, pageSize);
  const handleChange = (_e, p) => {
    setCurrentPage(p);
    pageData.jump(p);
  };

  return (
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
      { pageData.currentData().map((child) => (
        <Grid
          item
          className="display-table__row"
          key={`display-table-grid-for-${child.key}`}
        >
          {child}
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
