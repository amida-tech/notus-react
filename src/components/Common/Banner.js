import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import PropTypes from 'prop-types';

function Banner({ headerText, lastUpdated }) {
  return (
    <Box className="banner">
      <Typography variant="h1" color={blueGrey[700]} className="banner__header">
        { headerText }
      </Typography>
      { lastUpdated && (
      <Box className="banner__update-box">
        <Typography color={blueGrey[500]} className="banner__update-label">
          Last Updated:
        </Typography>
        <Typography color={blueGrey[400]} className="banner__update-time">
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
