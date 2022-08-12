import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography,
} from '@mui/material';

export default function Alert({
  openAlert,
  setOpenAlert,
  title,
  options,
  children,
}) {
  function handleAlert() {
    return openAlert ? setOpenAlert(false) : setOpenAlert(true)
  }

  return (
    <Dialog
      open={openAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: '1rem' }}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ lineHeight: '2rem', marginBottom: '1rem' }} id="alert-dialog-description">
          {children}
        </DialogContentText>
        
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleAlert()}>Go Back</Button>
        <Button variant="contained" onClick={() => handleAlert()}>
          <Link
            target={options.target}
            rel={options.rel}
            to={{ pathname: options.pathto }}
          >
            Continue
          </Link>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Alert.propTypes = {
  openAlert: PropTypes.bool,
  setOpenAlert: PropTypes.func,
  title: PropTypes.string,
  options: PropTypes.shape({
    target: PropTypes.string,
    rel: PropTypes.string,
    pathto: PropTypes.string,
  }),
  children: PropTypes.string,
};

Alert.defaultProps = {
  openAlert: false,
  setOpenAlert: () => undefined,
  title: '',
  options: {},
  children: '',
}
