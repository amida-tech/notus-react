import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Info from './Info';

function SubBanner({ title, infoText }) {
  return (
    <Box className="sub-banner">
      <Typography variant="h2" className="sub-banner__header">
        {title}
      </Typography>
      <Info infoText={infoText} />
    </Box>
  );
}

SubBanner.propTypes = {
  title: PropTypes.string,
  infoText: PropTypes.string,
}

SubBanner.defaultProps = {
  title: '',
  infoText: '',
}
export default SubBanner;
