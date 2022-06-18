import { Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxCell from './CheckBoxCell';
import HeaderCell from './HeaderCell';

function TableHeader({
  headerInfo, dataCount, useCheckBox, handleCheckBoxEvent, selectedRows,
}) {
  return (
    <Grid container item className="display-table__header-section">
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
          className="display-table__header-item"
          key={item.key}
          sx={{ flexBasis: `${item.flexBasis}%` }}
        >
          <HeaderCell text={item.header} tooltip={item.tooltip} />
        </Grid>
      ))}
    </Grid>
  );
}

TableHeader.propTypes = {
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.number,
    }),
  ),
  dataCount: PropTypes.number,
  useCheckBox: PropTypes.bool,
  handleCheckBoxEvent: PropTypes.func,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

TableHeader.defaultProps = {
  headerInfo: [],
  dataCount: 0,
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  selectedRows: [],
}

export default TableHeader;
