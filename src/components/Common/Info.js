import { useState } from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import {
  Typography, Box, IconButton, Button,
} from '@mui/material';
import theme from '../../assets/styles/AppTheme'

function Info({ infoText }) {
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <Box className="info">
      <IconButton
        className="info__info-button"
        disableFocusRipple
        disableRipple
        aria-label="info-button"
        onClick={() => setDisplayInfo(!displayInfo)}
      >
        <InfoIcon
          color="primary"
          sx={{
            '&:hover': {
              fill: theme.palette?.primary.dark,
            },
          }}
          className="info__info-icon"
          fontSize="small"
        />
      </IconButton>
      { displayInfo && (
      <Box sx={{ backgroundColor: theme.palette?.primary.light}} className="info__info-box">
        <Typography className="info__text">
          {infoText}
        </Typography>
        <Button
          className="info__button"
          disableFocusRipple
          disableRipple
          onClick={() => setDisplayInfo(false)}
        >
          CLOSE
        </Button>
      </Box>
      )}
    </Box>
  );
}

Info.propTypes = {
  infoText: PropTypes.string,
}

Info.defaultProps = {
  infoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
}

export default Info;
