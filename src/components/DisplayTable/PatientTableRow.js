import {
  Divider, Grid, Box, Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RowGenerator(link, key, rowDataItem) {
  if (link) {
    return (
      <Link
        to={{ pathname: `/member/${rowDataItem.value}` }}
      >
        {rowDataItem[key]}
      </Link>
    );
  }
  if (rowDataItem[key] === 'true') {
    return (
      <Grid className="patient-table-row__compliance-panel--matched">
        <CheckCircleIcon className="patient-table-row__compliance-icon" />
        Matched
      </Grid>
    )
  }
  return (
    <Grid className="patient-table-row__compliance-panel--unmatched">
      <CancelIcon className="patient-table-row__compliance-icon" />
      Unmatched
    </Grid>
  )
}

function PatientTableRow({
  rowDataItem, headerInfo,
}) {
  return (
    <Box className="patient-table-row">
      <Grid container className="patient-table-row__row-section">
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className="patient-table-row__data-align"
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
            sx={{
              flexBasis: `${fieldInfo.flexBasis}%`,
              justifyContent: fieldInfo.alignContent,
              textAlign: fieldInfo.alignContent,
            }}
          >
            <Typography variant="caption" className="patient-table-row__data">
              {RowGenerator(fieldInfo.link, fieldInfo.key, rowDataItem)}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider className="patient-table-row__divider" />
    </Box>
  )
}

PatientTableRow.propTypes = {
  rowDataItem: PropTypes.shape({
    value: PropTypes.string,
  }),
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.number,
    }),
  ),
};

PatientTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
}

export default PatientTableRow;
