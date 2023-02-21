import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link,
} from '@mui/material';

export default function Alert({
  openAlert,
  setOpenAlert,
  title,
  options,
  children,
  noResultsALERT,
  handleResetData,
  forwardBtn,
}) {
  function handleAlert() {
    return openAlert ? setOpenAlert(false) : setOpenAlert(true);
  }
  if (noResultsALERT) {
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
          <Button variant="contained" onClick={() => handleResetData()}>
            {forwardBtn}
          </Button>
        </DialogActions>
      </Dialog>
    );
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
        <DialogContentText sx={{ lineHeight: '2rem', marginBottom: '1rem' }} id="alert-dialog-description">
          {options.pathto}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleAlert()}>Go Back</Button>
        <Button variant="contained" onClick={() => handleAlert()}>
          <Link
            color="primary.light"
            target={options.target}
            rel={options.rel}
            href={options.pathto}
          >
            Continue
          </Link>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  forwardBtn: PropTypes.string,
  openAlert: PropTypes.bool,
  setOpenAlert: PropTypes.func,
  title: PropTypes.string,
  options: PropTypes.shape({
    target: PropTypes.string,
    rel: PropTypes.string,
    pathto: PropTypes.string,
  }),
  children: PropTypes.string,
  noResultsALERT: PropTypes.bool,
  handleResetData: PropTypes.func,
};

Alert.defaultProps = {
  forwardBtn: '',
  openAlert: false,
  setOpenAlert: () => undefined,
  title: '',
  options: {},
  children: '',
  noResultsALERT: false,
  handleResetData: () => undefined,
};
