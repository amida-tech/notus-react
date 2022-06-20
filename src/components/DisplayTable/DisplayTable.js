import {
  Divider, Grid, Pagination, PaginationItem,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { colorMappingProps } from '../ChartContainer/D3Props';
import usePagination from '../Utilities/PaginationUtil';
import CheckBoxCell from './CheckBoxCell';
import HeaderCell from './HeaderCell';

function DisplayTable({
  invertedColor,
  rowData,
  headerInfo,
  pageSize,
  useCheckBox,
  selectedRows,
  colorMapping,
  handleCheckBoxChange,
  children,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(rowData.length / pageSize);
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
          checked={rowData.length === selectedRows.length}
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
      {/* {tableType === 'measure' && pageData.currentData().map((item) => (
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
      ))} */}
      { pageData.currentData().map((child) => (
        <Grid
          item
          className="display-table__row"
          key={`display-table-grid-item-${child.value}`}
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
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
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
  colorMapping: colorMappingProps,
  handleCheckBoxChange: PropTypes.func,
};

DisplayTable.defaultProps = {
  children: [],
  invertedColor: false,
  rowData: [],
  headerInfo: [],
  pageSize: 0,
  useCheckBox: false,
  selectedRows: [],
  colorMapping: [],
  handleCheckBoxChange: () => undefined,
}

export default DisplayTable;
