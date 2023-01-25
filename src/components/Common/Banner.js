import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme';

function Banner({ headerText, lastUpdated }) {
  return (
    <Box className="banner">
      <Typography variant="h1" color={theme.palette?.bluegray.D2} className="banner__header">
        { headerText }
      </Typography>
      { lastUpdated && (
      <Box className="banner__update-box">
        <Typography color={theme.palette?.bluegray.D1} className="banner__update-label">
          Last Updated:
        </Typography>
        <Typography color={theme.palette?.bluegray.L1} className="banner__update-time">
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
