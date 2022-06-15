import {
  Divider, Grid, Box, Typography,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import React from 'react';
import PropTypes from 'prop-types';

function ComplianceRowGenerator(result) {
  if (result === 'true') {
    return (
      <Grid className="report-table-row__compliance-panel report-table-row__compliance-panel--matched">
        <CheckBoxIcon className="report-table-row__compliance-icon" />
        Compliant
      </Grid>
    )
  }
  return (
    <Grid className="report-table-row__compliance-panel report-table-row__compliance-panel--unmatched">
      <DisabledByDefaultRoundedIcon className="report-table-row__compliance-icon" />
      Not Compliant
    </Grid>
  )
}

function ReportTableRow({
  rowDataItem, headerInfo,
}) {
  return (
    <Box className="report-table-row">
      <Grid container className="report-table-row__row-section">
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className="report-table-row__data-align"
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
            sx={{
              flexBasis: `${fieldInfo.flexBasis}%`,
              justifyContent: fieldInfo.alignContent,
              textAlign: fieldInfo.alignContent,
            }}
          >
            <Typography variant="caption" className="report-table-row__data">
              {ComplianceRowGenerator(rowDataItem[fieldInfo.key])}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider className="report-table-row__divider" />
    </Box>
  )
}

ReportTableRow.propTypes = {
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

ReportTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
}

export default ReportTableRow;
