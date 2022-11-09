import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme';

console.log()
// BY MANUALLY IMPORTING THEME, WE ARE CIRCUMVENTING THE THEME PROVIDER...
// NEED TO HAVE A GLOBAL VALUE PROVIDING WHAT THEME WE ARE USING OR
// FIND ANOTHER WAY TO DO A MUIJSX-Y INLINE STYLE, ICK
// CONTEXT/JAMESDUX WOULD BE CLUNKY, BUT SO IS PASSING IT THROUGH ALL THE PARENT/CHILD COMPONENTS
// I COULD ALSO DO SOMETHING INSANE WITH A REF

// JAMESDUX IT IS
// DETERMINE THEME TYPE
// JAMESDUX PAYLOAD [chosentheme].palette
// IMPORT THEME
// color={theme?.bluegray.main}

// WE CAN UPDATE TO THIS IN THE DARK MODE TICKET

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
