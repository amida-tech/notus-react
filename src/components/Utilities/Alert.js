import { Link } from 'react-router-dom';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

export default function Alert({
  openAlert,
  setOpenAlert,
  title,
  options,
  children
}) {

  const handleAlert = () => {
    openAlert ? setOpenAlert(false) : setOpenAlert(true)
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
        <DialogContentText sx={{ lineHeight: '2rem' }} id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleAlert()}>Go Back</Button>
        <Button onClick={() => handleAlert()}>
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
