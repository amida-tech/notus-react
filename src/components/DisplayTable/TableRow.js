import {
  Divider, Grid, Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxCell from './CheckBoxCell';

function TableRow({
  rowData, headerInfo, useCheckBox, handleCheckBoxEvent, rowSelected, color,
}) {
  return (
    <Box className="display-table-row">
      <Grid container className="display-table-row__row-section">
        {useCheckBox && (
          <CheckBoxCell
            handleCheckBoxEvent={handleCheckBoxEvent}
            checked={rowSelected}
            value={rowData.value}
            color={color}
          />
        )}
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className="display-table-row__data-align"
            key={`${rowData[fieldInfo.key]}-${fieldInfo.header}`}
            sx={{
              flexBasis: `${fieldInfo.flexBasis}%`,
              justifyContent: fieldInfo.alignContent,
              textAlign: fieldInfo.alignContent,
            }}
          >
            <Typography variant="caption" className="display-table-row__data">
              {rowData[fieldInfo.key]}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider className="display-table-row__divider" />
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
