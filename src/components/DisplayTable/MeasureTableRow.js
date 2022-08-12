import { useState } from 'react'
import {
  Grid, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import CheckBoxCell from './CheckBoxCell';
import Alert from '../Utilities/Alert'

function MeasureTableRow({
  rowDataItem, headerInfo, useCheckBox, handleCheckBoxEvent, rowSelected, color, measureInfo,
}) {
  const compositeCheck = headerInfo[0].header === 'Measure'

  const alertTitle = 'Leaving Saraswati'
  const alertPath = (info) => {
    if (measureInfo[info].link) {
      return {
        target: '_blank',
        rel: 'noopener noreferrer',
        pathto: measureInfo[info].link,
      }
    }
    return {
      target: '_blank',
      rel: 'noopener noreferrer',
      pathto: null,
    }
  }
  const [openAlert, setOpenAlert] = useState(false);
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
                    <Typography
                      variant="caption"
                      className="measure-table-row__data"
                      onClick={() => setOpenAlert(true)}
                    >
                      {rowDataItem[fieldInfo.key]}
                    </Typography>
                  </Tooltip>

                  <Alert
                    openAlert={openAlert}
                    setOpenAlert={setOpenAlert}
                    title={alertTitle}
                    options={alertPath(rowDataItem.value)}
                  >
                    You are now leaving Saraswati and entering a site hosted by
                    a different Federal agency or company. If you are not
                    automatically forwarded, please proceed to:
                  </Alert>

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
