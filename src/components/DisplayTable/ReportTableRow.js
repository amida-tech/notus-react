import {
  Grid, Box, Typography,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme';

function TextRowGenerator(text) {
  return (
    <Grid className="report-table-row__text-cell">
      {text}
    </Grid>
  );
}

function IconRowGenerator(result, extraInfo) {
  if (result === true) {
    return (
      <Grid color={theme.palette?.success} className="report-table-row__icon-cell">
        <CheckBoxIcon className="report-table-row__compliance-icon" />
        {extraInfo && 'Compliant'}
      </Grid>
    );
  }
  return (
    <Grid color={theme.palette?.error} className="report-table-row__icon-cell">
      <DisabledByDefaultRoundedIcon className="report-table-row__compliance-icon" />
      {extraInfo && 'Not Compliant'}
    </Grid>
  );
}

function ArrayRowGenerator(info, extraInfo) {
  return (
    <Grid className="report-table-row__array-cell">
      {extraInfo && <CheckCircleIcon color={theme.palette?.success} />}
      {info}
    </Grid>
  );
}

function rowSelector(rowDataItem, fieldInfo) {
  if (fieldInfo.rowType === 'text') {
    return (TextRowGenerator(rowDataItem[fieldInfo.key]));
  }
  if (fieldInfo.rowType === 'icon') {
    return (IconRowGenerator(rowDataItem[fieldInfo.key], fieldInfo.extraInfo));
  }
  return (ArrayRowGenerator(rowDataItem[fieldInfo.key], fieldInfo.extraInfo));
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
            className={`report-table-row__data-align report-table-row__data-align--${fieldInfo.flexBasis}`}
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
          >
            <Typography variant="caption" color={theme.palette?.bluegray.D4} className="report-table-row__data">
              {rowSelector(rowDataItem, fieldInfo)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

ReportTableRow.propTypes = {
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
};

ReportTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
};

export default ReportTableRow;
