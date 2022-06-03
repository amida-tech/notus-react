import {
  Divider, Grid, Pagination, PaginationItem,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { colorMappingProps } from '../ChartContainer/D3Props';
import usePagination from '../Utilites/PaginationUtil';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

function DisplayTable({
  rowData,
  headerInfo,
  pageSize,
  useCheckBox,
  handleCheckBoxChange,
  selectedRows,
  colorMapping,
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
      {pageData.currentData().map((item) => (
        <Grid
          item
          className="display-table__row"
          key={`chart-container-grid-measure-${item.value}`}
        >
          <TableRow
            rowDataItem={item}
            headerInfo={headerInfo}
            useCheckBox={useCheckBox}
            handleCheckBoxEvent={handleCheckBoxChange}
            rowSelected={selectedRows.includes(item.value)}
            color={colorMapping.find((mapping) => mapping.value === item.value)?.color || '#000'}
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
  handleCheckBoxChange: PropTypes.func,
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
  handleCheckBoxChange: () => undefined,
  selectedRows: [],
  colorMapping: [],
}

export default DisplayTable;
