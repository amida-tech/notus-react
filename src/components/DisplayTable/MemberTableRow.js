import {
  Grid, Box, Typography,
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
      <Grid className="member-table-row__compliance-panel member-table-row__compliance-panel--matched">
        <CheckCircleIcon className="member-table-row__compliance-icon" />
        Matched
      </Grid>
    )
  }
  return (
    <Grid className="member-table-row__compliance-panel member-table-row__compliance-panel--unmatched">
      <CancelIcon className="member-table-row__compliance-icon" />
      Unmatched
    </Grid>
  )
}

function MemberTableRow({
  rowDataItem, headerInfo,
}) {
  return (
    <Box className="member-table-row">
      <Grid container className={`member-table-row__row-section ${headerInfo.length > 10 && 'member-table-row__row-section--wide'} `}>
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className={`member-table-row__data-align member-table-row__data-align--${fieldInfo.flexBasis}`}
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
          >
            <Typography variant="caption" className="member-table-row__data">
              {RowGenerator(fieldInfo.link, fieldInfo.key, rowDataItem)}
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
