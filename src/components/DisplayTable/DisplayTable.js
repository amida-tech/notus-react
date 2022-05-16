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
  currentResults, headerInfo, pageSize, handleMeasureChange, selectedMeasures, colorMapping,
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
        useCheckBox
        handleCheckBoxEvent={handleMeasureChange}
        selectedMeasures={selectedMeasures}
      />
      <Divider className="measure-results-table__divider" />
      {pageData.currentData().map((item) => (

        <Grid
          item
          className="measure-results-table__row"
          key={`chart-container-grid-measure-${item.measure}`}
        >
          <MeasureResultsRow
            measureResult={generateMeasureRowValues(item)}
            handleMeasureChange={handleMeasureChange}
            selectedMeasure={selectedMeasures.includes(item.measure)}
            measureColor={colorMapping.find((mapping) => mapping.measure === item.measure)}
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
  handleMeasureChange: PropTypes.func,
  selectedMeasures: PropTypes.arrayOf(
    PropTypes.string,
  ),
  colorMapping: colorMappingProps,
};

DisplayTable.defaultProps = {
  currentResults: [],
  headerInfo: [],
  pageSize: 0,
  handleMeasureChange: () => undefined,
  selectedMeasures: [],
  colorMapping: [],
}

export default DisplayTable;
