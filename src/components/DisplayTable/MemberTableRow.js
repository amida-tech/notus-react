import {
  Grid, Box, Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RowGenerator(link, key, rowDataItem, ciseCheck) {
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
      <Grid className={`${ciseCheck}-table-row__compliance-panel ${ciseCheck}-table-row__compliance-panel--matched`}>
        <CheckCircleIcon className={`${ciseCheck}-table-row__compliance-icon`} />
        Matched
      </Grid>
    )
  }
  return (
    <Grid className={`${ciseCheck}-table-row__compliance-panel ${ciseCheck}-table-row__compliance-panel--unmatched`}>
      <CancelIcon className={`${ciseCheck}-table-row__compliance-icon`} />
      Unmatched
    </Grid>
  )
}

function MemberTableRow({
  rowDataItem, headerInfo,
}) {
  const ciseCheck = headerInfo[1].header === 'CIS-E' ? 'cise' : 'member'

  return (
    <Box className={`${ciseCheck}-table-row`}>
      <Grid container className={`${ciseCheck}-table-row__row-section ${ciseCheck}-table-row__row-section--wide`}>
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className={`${ciseCheck}-table-row__data-align ${ciseCheck}-table-row__data-align--${fieldInfo.flexBasis}`}
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
          >
            <Typography variant="caption" className={`${ciseCheck}-table-row__data`}>
              {RowGenerator(fieldInfo.link, fieldInfo.key, rowDataItem, ciseCheck)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

MemberTableRow.propTypes = {
  rowDataItem: PropTypes.shape({
    value: PropTypes.string,
  }),
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.string,
    }),
  ),
};

MemberTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
}

export default MemberTableRow;
