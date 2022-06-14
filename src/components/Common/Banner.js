import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Banner({ headerText, lastUpdated }) {
  return (
    <Box className="banner">
      <Typography variant="h1" className="banner__header">
        { headerText }
      </Typography>
      { lastUpdated && (
      <Box className="banner__update-box">
        <Typography className="banner__update-label">
          Last Updated:
        </Typography>
        <Typography className="banner__update-time">
          {' '}
          {lastUpdated}
        </Typography>
      </Box>
      ) }
    </Box>
  );
}

Banner.propTypes = {
  headerText: PropTypes.string,
  lastUpdated: PropTypes.string,
};

Banner.defaultProps = {
  headerText: '',
  lastUpdated: '',
};

export default Banner;
