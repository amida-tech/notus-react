import {
  Divider, Grid, Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CheckBoxCell from './CheckBoxCell';

function MeasureTableRow({
  rowDataItem, headerInfo, useCheckBox, handleCheckBoxEvent, rowSelected, color,
}) {
  return (
    <Box className="measure-table-row">
      <Grid container className="measure-table-row__row-section">
        {useCheckBox && (
          <CheckBoxCell
            handleCheckBoxEvent={handleCheckBoxEvent}
            checked={rowSelected}
            value={rowDataItem.value}
            color={color}
          />
        )}
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className={`measure-table-row__data-align measure-table-row__data-align--${fieldInfo.flexBasis}`}
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
          >
            <Typography variant="caption" className="measure-table-row__data">
              {fieldInfo.link && rowDataItem.value !== 'composite'
                ? (
                  <Link
                    to={{ pathname: `/${rowDataItem.value}` }}
                  >
                    {rowDataItem[fieldInfo.key]}
                  </Link>
                )
                : rowDataItem[fieldInfo.key]}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider className="measure-table-row__divider" />
    </Box>
  )
}

MeasureTableRow.propTypes = {
  rowDataItem: PropTypes.shape({
    value: PropTypes.string,
  }),
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.string,
    }),
  ),
  useCheckBox: PropTypes.bool,
  handleCheckBoxEvent: PropTypes.func,
  rowSelected: PropTypes.bool,
  color: PropTypes.string,
};

MeasureTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  rowSelected: false,
  color: '',
}

export default MeasureTableRow;
