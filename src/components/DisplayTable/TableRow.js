import {
  Divider, Grid, Box,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxCell from './CheckBoxCell';
import TextCell from './TextCell';

function TableRow({
  rowData, headerInfo, useCheckBox, handleCheckBoxEvent, rowSelected, color,
}) {
  return (
    <Box className="measure-results-row">
      <Divider className="measure-results-row__divider" />
      <Grid container className="measure-results-row__row-section">
        {useCheckBox && (
          <CheckBoxCell
            handleCheckBoxEvent={handleCheckBoxEvent}
            checked={rowSelected}
            value={rowData.value}
            color={color}
          />
        )}
        {headerInfo.map((fieldInfo) => (
          <TextCell
            text={rowData[fieldInfo.key]}
            flexBasis={fieldInfo.flexBasis}
          />
        ))}
      </Grid>
      <Divider className="measure-results-row__divider" />
    </Box>
  )
}

TableRow.propTypes = {
  rowData: PropTypes.shape({
    value: PropTypes.string,
  }),
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.number,
    }),
  ),
  useCheckBox: PropTypes.bool,
  handleCheckBoxEvent: PropTypes.func,
  rowSelected: PropTypes.bool,
  color: PropTypes.string,
};

TableRow.defaultProps = {
  rowData: {},
  headerInfo: [],
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  rowSelected: false,
  color: '',
}

export default TableRow;
