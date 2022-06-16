import { Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxCell from './CheckBoxCell';
import HeaderCell from './HeaderCell';

// TODO: Refactor the PatientTable and MeasureTable to use this in future.
function TableHeaderNew({
  headerInfo, dataCount, useCheckBox, handleCheckBoxEvent, selectedRows,
}) {
  return (
    <Grid container item className="table-header">
      {useCheckBox && (
      <CheckBoxCell
        handleCheckBoxEvent={handleCheckBoxEvent}
        checked={dataCount === selectedRows.length}
        value="all"
      />
      )}
      {headerInfo.map((item) => (
        <Grid
          item
          className={`table-header__header-item table-header__header-item--${item.flexBasis}`}
          key={item.header}
        >
          <HeaderCell text={item.header} tooltip={item.tooltip} />
        </Grid>
      ))}
    </Grid>
  );
}

TableHeaderNew.propTypes = {
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.string,
    }),
  ),
  dataCount: PropTypes.number,
  useCheckBox: PropTypes.bool,
  handleCheckBoxEvent: PropTypes.func,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

TableHeaderNew.defaultProps = {
  headerInfo: [],
  dataCount: 0,
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  selectedRows: [],
}

export default TableHeaderNew;
