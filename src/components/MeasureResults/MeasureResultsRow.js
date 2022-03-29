import {
  Checkbox, Divider, FormGroup, Grid, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

function MeasureResultsRow({ measureResult, handleMeasureChange, measureColor }) {
  return (
    <Box>
      <Divider color="#78909C" stroke={2} />
      <Grid container justifyContent="space-evenly" align-items="center" direction="row" spacing={2} sx={{ width: '100%', p: '3px', m: '0px' }}>
        <Grid item xs={1}>
          <FormGroup sx={{ ml: '0' }}>
            <Checkbox
              style={{ color: measureColor.color }}
              disableRipple
              defaultChecked
              size="medium"
              value={measureResult.value}
              onChange={(event) => handleMeasureChange(event)}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="caption" className="measure-results-table__data-measure-title">
            {measureResult.label}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="caption" className="measure-results-table__data">
            {measureResult.included}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="caption" className="measure-results-table__data">
            {measureResult.eligible}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="caption" className="measure-results-table__data">
            {measureResult.numerator}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="caption" className="measure-results-table__data">
            {measureResult.denominator}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="caption" className="measure-results-table__data">
            {measureResult.exclusions}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

MeasureResultsRow.propTypes = {
  measureResult: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    included: PropTypes.number,
    eligible: PropTypes.number,
    numerator: PropTypes.number,
    denominator: PropTypes.number,
    exclusions: PropTypes.number,
  }),
  handleMeasureChange: PropTypes.func,
  measureColor: PropTypes.shape({
    color: PropTypes.string,
  }),
}

MeasureResultsRow.defaultProps = {
  measureResult: {},
  handleMeasureChange: () => undefined,
  measureColor: {},
}

export default MeasureResultsRow;
