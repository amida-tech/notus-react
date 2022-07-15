import { useState } from 'react';
import {
  Grid, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxCell from './CheckBoxCell';

function MeasureTableRow({
  rowDataItem, headerInfo, useCheckBox, handleCheckBoxEvent, rowSelected, color, measureInfo,
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const compositeCheck = headerInfo[0].header === 'Measure'

  const handleAlert = () => (openAlert ? setOpenAlert(false) : setOpenAlert(true))

  if (compositeCheck) {
    return (
      <Box className="measure-table-row">
        <Grid container className="measure-table-row__row-section">
          {useCheckBox && (
            <CheckBoxCell
              handleCheckBoxEvent={handleCheckBoxEvent}
              checked={rowSelected}
              value={rowDataItem.value}
              color={color}
            />
          )}

          {headerInfo.map((fieldInfo) => (
            <Grid
              item
              className={`measure-table-row__data-align measure-table-row__data-align--${fieldInfo.flexBasis}`}
              key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
            >
              <Typography variant="caption" className="measure-table-row__data">
                {fieldInfo.header === 'Measure'
                  ? (
                    <Grid
                      item
                      className={`measure-table-row__data-align measure-table-row__data-align--${fieldInfo.flexBasis}`}
                      key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
                    >
                      <Typography variant="caption" className="measure-table-row__data">
                        <Tooltip title={measureInfo[rowDataItem.value].title} arrow>
                          <Link to={{ pathname: `/${rowDataItem.value}` }}>
                            {rowDataItem[fieldInfo.key]}
                          </Link>
                        </Tooltip>
                      </Typography>
                    </Grid>
                  )
                  : rowDataItem[fieldInfo.key]}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  // NON-COMPOSITE ROW DATA
  return (
    <Box className="measure-table-row">
      <Grid container className="measure-table-row__row-section">
        {useCheckBox && (
          <CheckBoxCell
            handleCheckBoxEvent={handleCheckBoxEvent}
            checked={rowSelected}
            value={rowDataItem.value}
            color={color}
          />
        )}
        {headerInfo.map((fieldInfo) => (
          <Grid
            item
            className={`measure-table-row__data-align measure-table-row__data-align--${fieldInfo.flexBasis}`}
            key={`${rowDataItem[fieldInfo.key]}-${fieldInfo.header}`}
          >
            { fieldInfo.header === 'Sub-Measure'
              ? (
                <>
                  <Tooltip
                    title="Click for more information from NCQA"
                    arrow
                  >
                    <Typography variant="caption" className="measure-table-row__data" onClick={() => handleAlert()}>
                      {rowDataItem[fieldInfo.key]}
                    </Typography>
                  </Tooltip>
                  <Dialog
                    open={openAlert}
                    onClose={handleAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{ padding: '1rem' }}
                  >

                    <DialogTitle id="alert-dialog-title">
                      Leaving Saraswati
                    </DialogTitle>

                    <DialogContent>
                      <DialogContentText sx={{ lineHeight: '2rem' }} id="alert-dialog-description">
                        You are now leaving Saraswati and entering a site hosted by
                        a different Federal agency or company.
                        If you are not automatically forwarded, please proceed to:&nbsp;
                        <Link to="https://www.ncqa.org/hedis/measures/">
                          https://www.ncqa.org/hedis/measures/
                        </Link>

                      </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleAlert}>Go Back</Button>
                      <Button onClick={handleAlert}>
                        <Link
                          target="_blank"
                          to="https://www.ncqa.org/hedis/measures/"
                          rel="noreferrer"
                        >
                          Continue
                        </Link>
                      </Button>

                    </DialogActions>
                  </Dialog>
                </>
              )
              : rowDataItem[fieldInfo.key]}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

MeasureTableRow.propTypes = {
  rowDataItem: PropTypes.shape({
    value: PropTypes.string,
  }),
  headerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      text: PropTypes.string,
      tooltip: PropTypes.string,
      flexBasis: PropTypes.string,
    }),
  ),
  useCheckBox: PropTypes.bool,
  handleCheckBoxEvent: PropTypes.func,
  rowSelected: PropTypes.bool,
  color: PropTypes.string,
  measureInfo: PropTypes.shape({
    value: PropTypes.string,
  }),
};

MeasureTableRow.defaultProps = {
  rowDataItem: {},
  headerInfo: [],
  useCheckBox: false,
  handleCheckBoxEvent: () => undefined,
  rowSelected: false,
  color: '',
  measureInfo: {},
}

export default MeasureTableRow;
