import {
  Divider, Grid,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { colorMappingProps } from '../ChartContainer/D3Props';
import TableHeader from './TableHeader';
import MeasureTableRow from './MeasureTableRow';
import PatientTableRow from './PatientTableRow';

function DisplayTable({
  tableType,
  rowData,
  headerInfo,
  useCheckBox,
  selectedRows,
  colorMapping,
  handleCheckBoxChange,
  pageData,
}) {
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
      {tableType === 'measure'
        ? pageData.currentData()
          .map((item) => (
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
          ))
        : pageData.currentData()
          .map((item) => (
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
          ))}
    </Grid>
  )
}

DisplayTable.propTypes = {
  tableType: PropTypes.oneOf(['measure', 'patient']),
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
  pageData: PropTypes.arrayOf(
    PropTypes.shape({
      currentPage: PropTypes.number,
      maxPage: PropTypes.number,
      rowsPerPage: PropTypes.number,
      currentData: PropTypes.func,
    }),
  ),

  useCheckBox: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
  colorMapping: colorMappingProps,
  handleCheckBoxChange: PropTypes.func,
};

DisplayTable.defaultProps = {
  tableType: 'measure',
  rowData: [],
  headerInfo: [],
  useCheckBox: false,
  selectedRows: [],
  colorMapping: [],
  pageData: [],
  handleCheckBoxChange: () => undefined,
}

export default DisplayTable;
