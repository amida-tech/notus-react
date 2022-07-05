import {
  Grid, Box, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import CheckBoxCell from './CheckBoxCell';

function MeasureTableRow({
  rowDataItem, headerInfo, useCheckBox, handleCheckBoxEvent, rowSelected, color, measureInfo,
}) {
  function subMeasureCheck(field, rowData) {
    if (field.header === 'Sub-Measure') {
      return (
        <Tooltip
          title="Click for more information from NCQA"
          arrow
        >
          <a
            target="_blank"
            href="https://www.ncqa.org/hedis/measures/"
            onClick={() => alert('You are now leaving Saraswati and entering a site hosted by a different Federal agency or company. If you are not automatically forwarded please proceed to https://www.ncqa.org/hedis/measures/')}
            rel="noreferrer"
          >
            {rowData[field.key]}
          </a>
        </Tooltip>
      )
    }
    return rowData[field.key]
  }
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
            <Typography
              variant="caption"
              className="measure-table-row__data"
            >

              {fieldInfo.link && rowDataItem.value !== 'composite'
                ? (
                  <Tooltip
                    title={measureInfo[rowDataItem.value].description}
                    arrow
                  >
                    <Link
                      to={{ pathname: `/${rowDataItem.value}` }}
                    >
                      {rowDataItem[fieldInfo.key]}
                    </Link>
                  </Tooltip>
                )
                : subMeasureCheck(fieldInfo, rowDataItem)}
            </Typography>
          </Grid>
        ))}
      </Grid>
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
  measureInfo: PropTypes.shape({
    value: PropTypes.string,
  }),
};

MeasureTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  rowSelected: false,
  color: '',
  measureInfo: {},
}

export default MeasureTableRow;
