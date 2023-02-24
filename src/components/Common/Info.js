import { useState } from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import {
  Typography, Box, IconButton, Button,
} from '@mui/material';
import theme from '../../assets/styles/AppTheme';

function Info({ infoText }) {
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <Box sx={{ ml: '1rem' }}>
      <IconButton
        disableFocusRipple
        disableRipple
        aria-label="info-button"
        onPointerEnter={() => setDisplayInfo(!displayInfo)}
        onPointerLeave={() => setDisplayInfo(!displayInfo)}
        sx={{ display: 'flex' }}
      >
        <InfoIcon
          color="primary"
          sx={{
            marginLeft: '-1rem',
            '&:hover': {
              fill: theme.palette?.primary.dark,
            },
          }}
          className="info__info-icon"
          fontSize="small"
        />
      </IconButton>
      { displayInfo && (
      <Box sx={{ backgroundColor: theme.palette?.primary.light, m: '-3rem 1rem 1rem 2.5rem', }} className="info__info-box">
        <Typography className="info__text">
          {infoText}
        </Typography>
      </Box>
      )}
    </Box>
  );
}

Info.propTypes = {
  infoText: PropTypes.string,
};

Info.defaultProps = {
  infoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

export default Info;
