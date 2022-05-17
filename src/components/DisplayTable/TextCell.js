import {
  Grid, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function TextCell({
  text, flexBasis,
}) {
  return (
    <Grid
      item
      className="measure-results-row__data-align"
      sx={{ flexBasis: `${flexBasis}%` }}
    >
      <Typography variant="caption" className="measure-results-row__data">
        {text}
      </Typography>
    </Grid>
  )
}

TextCell.propTypes = {
  text: PropTypes.string,
  flexBasis: PropTypes.number,
};

TextCell.defaultProps = {
  text: '',
  flexBasis: 0,
}

export default TextCell;
