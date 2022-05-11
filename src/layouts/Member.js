import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Box,
} from '@mui/material';

function Member({ id }) {
  return (
    <Box>
      <Typography variant="h2" className="rating-trends__h2-header">
        {`Member Info ${id}`}
      </Typography>
    </Box>
  )
}

Member.propTypes = {
  id: PropTypes.string,
}

Member.defaultProps = {
  id: '',
}

export default Member;
