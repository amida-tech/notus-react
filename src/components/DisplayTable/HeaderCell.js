import {
  Grid, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip';

function HeaderCell({
  text, tooltip, flexBasis,
}) {
  return (
    <Grid
      item
      className="measure-results-table__title-align"
      sx={{ flexBasis: `${flexBasis}%` }}
    >
      <Typography className="measure-results-table__title">
        {text}
      </Typography>
      <ToolTip title={tooltip}>
        <HelpIcon className="measure-results-table__help-icon" />
      </ToolTip>
    </Grid>
  )
}

HeaderCell.propTypes = {
  text: PropTypes.string,
  tooltip: PropTypes.string,
  flexBasis: PropTypes.number,
};

HeaderCell.defaultProps = {
  text: '',
  tooltip: '',
  flexBasis: 0,
}

export default HeaderCell;
