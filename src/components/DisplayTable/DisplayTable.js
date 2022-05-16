import {
  Divider, Grid, Pagination, PaginationItem,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { colorMappingProps } from '../ChartContainer/D3Props';
import MeasureResultsRow from '../MeasureResults/MeasureResultsRow';
import usePagination from '../Utilites/PaginationUtil';
import TableHeader from './TableHeader';

function DisplayTable({
  currentResults,
  headerInfo,
  pageSize,
  useCheckBox,
  handleMeasureChange,
  selectedRows,
  colorMapping,
}) {
  const [page, setPage] = useState(1);

  const count = Math.ceil(currentResults.length / pageSize);
  const pageData = usePagination(currentResults, pageSize);

  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Grid container className="measure-results-table">
      <TableHeader
        headerInfo={headerInfo}
        dataCount={currentResults.length}
        useCheckBox={useCheckBox}
        handleCheckBoxEvent={handleMeasureChange}
        selectedRows={selectedRows}
      />
      <Divider className="measure-results-table__divider" />
      {pageData.currentData().map((item) => (

        <Grid
          item
          className="measure-results-table__row"
          key={`chart-container-grid-measure-${item.value}`}
        >
          <MeasureResultsRow
            measureResult={item}
            handleMeasureChange={handleMeasureChange}
            selectedMeasure={selectedRows.includes(item.value)}
            measureColor={colorMapping.find((mapping) => mapping.measure === item.value)}
          />

        </Grid>

      ))}
      <StyledEngineProvider injectFirst>
        <Pagination
          count={count}
          size="large"
          page={page}
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
    </Grid>
  )
}

DisplayTable.propTypes = {
  currentResults: PropTypes.arrayOf(
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
  handleMeasureChange: PropTypes.func,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
  colorMapping: colorMappingProps,
};

DisplayTable.defaultProps = {
  currentResults: [],
  headerInfo: [],
  pageSize: 0,
  useCheckBox: false,
  handleMeasureChange: () => undefined,
  selectedRows: [],
  colorMapping: [],
}

export default DisplayTable;
