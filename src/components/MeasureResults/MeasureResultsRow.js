import {
  Checkbox, Divider, FormGroup, Grid, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

function MeasureResultsRow({
  measureResult, handleMeasureChange, selectedMeasure, measureColor,
}) {
  return (
    <Box className="measure-results-row">
      <Divider className="measure-results-row__divider" />
      <Grid container className="measure-results-row__row-section">
        <Grid item className="measure-results-row__data-align-small">
          <FormGroup className="measure-results-row__form-group">
            <Checkbox
              style={{ color: measureColor.color }}
              disableRipple
              checked={selectedMeasure}
              size="medium"
              value={measureResult.value}
              onChange={(event) => handleMeasureChange(event)}
            />
          </FormGroup>
        </Grid>
        <Grid item className="measure-results-row__data-align-measure">
          <Typography variant="caption" className="measure-results-row__data">
            {measureResult.label}
          </Typography>
        </Grid>
        <Grid item className="measure-results-row__data-align">
          <Typography variant="caption" className="measure-results-row__data">
            {measureResult.included}
          </Typography>
        </Grid>
        <Grid item className="measure-results-row__data-align">
          <Typography variant="caption" className="measure-results-row__data">
            {measureResult.eligible}
          </Typography>
        </Grid>
        <Grid item className="measure-results-row__data-align">
          <Typography variant="caption" className="measure-results-row__data">
            {measureResult.numerator}
          </Typography>
        </Grid>
        <Grid item className="measure-results-row__data-align">
          <Typography variant="caption" className="measure-results-row__data">
            {measureResult.denominator}
          </Typography>
        </Grid>
        <Grid item className="measure-results-row__data-align">
          <Typography variant="caption" className="measure-results-row__data">
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
  selectedMeasure: PropTypes.bool,
  measureColor: PropTypes.shape({
    color: PropTypes.string,
  }),
}

MeasureResultsRow.defaultProps = {
  measureResult: {},
  handleMeasureChange: () => undefined,
  selectedMeasure: true,
  measureColor: {},
}

export default MeasureResultsRow;
