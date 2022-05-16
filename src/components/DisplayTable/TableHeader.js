import { Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxHeaderCell from './CheckBoxHeaderCell';
import HeaderCell from './HeaderCell';

function TableHeader({
  headerInfo, dataCount, useCheckBox, handleCheckBoxEvent, selectedMeasures,
}) {
  return (
    <Grid container item className="measure-results-table__header-section">
      {useCheckBox && (
      <CheckBoxHeaderCell
        dataCount={dataCount}
        handleCheckBoxEvent={handleCheckBoxEvent}
        selectedRows={selectedMeasures}
      />
      )}
      {headerInfo.map((item) => (
        <HeaderCell text={item.text} tooltip={item.tooltip} flexBasis={item.flexBasis} />
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
  selectedMeasures: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

TableHeader.defaultProps = {
  headerInfo: [],
  dataCount: 0,
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  selectedMeasures: [],
}

export default TableHeader;
