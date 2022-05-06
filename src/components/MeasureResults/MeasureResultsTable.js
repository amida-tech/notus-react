/* eslint-disable no-undef */
import {
  Checkbox, Divider, FormGroup, Grid, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import ToolTip from '@mui/material/Tooltip';
import { colorMappingProps } from '../ChartContainer/D3Props';
import MeasureResultsRow from './MeasureResultsRow';

function generateMeasureRowValues(measureResult) {
  return {
    value: measureResult.measure,
    label: measureResult.label,
    type: 'measure',
    included: measureResult.initialPopulation - measureResult.exclusions,
    eligible: measureResult.initialPopulation,
    numerator: measureResult.numerator,
    denominator: measureResult.denominator,
    exclusions: measureResult.exclusions,
  }
}
const measureTip = 'The actual measure. At the moment, these are always HEDIS measures.';
const remainingInclusionsTip = 'The population remaining after exclusions are removed.';
const eligiblePopulationTip = 'The population of patients who are eligible for this measure.';
const numeratorTip = 'The number of patients who have satisfied the criteria for this measure.';
const denominatorTip = 'The population of patients who are eligible for this measure. Currently the same as Eligible Population.';
const availableExclusionsTip = 'The population that can be excluded based on criteria.';

function MeasureResultsTable({
  currentResults, handleMeasureChange, selectedMeasures, colorMapping,
}) {
  return (
    <Grid container className="measure-results-table">
      <Grid container item className="measure-results-table__header-section">
        <Grid item className="measure-results-table__title-align-small">
          <FormGroup className="measure-results-table__form-group">
            <Checkbox
              disableRipple
              checked={currentResults.length === selectedMeasures.length}
              size="medium"
              value="all"
              data-testid="checkbox_Table"
              onChange={(event) => handleMeasureChange(event)}
            />
          </FormGroup>
        </Grid>
        <Grid item className="measure-results-table__title-align-measure">
          <Typography className="measure-results-table__title">
            Measure
          </Typography>
          <ToolTip title={measureTip}>
            <HelpIcon className="measure-results-table__help-icon" />
          </ToolTip>
        </Grid>
        <Grid item className="measure-results-table__title-align">
          <Typography className="measure-results-table__title">
            Remaining Inclusions
          </Typography>
          <ToolTip title={remainingInclusionsTip}>
            <HelpIcon className="measure-results-table__help-icon" />
          </ToolTip>
        </Grid>
        <Grid item className="measure-results-table__title-align">
          <Typography className="measure-results-table__title">
            Eligible Population
          </Typography>
          <ToolTip title={eligiblePopulationTip}>
            <HelpIcon className="measure-results-table__help-icon" />
          </ToolTip>
        </Grid>
        <Grid item className="measure-results-table__title-align">
          <Typography className="measure-results-table__title">
            Numerator
          </Typography>
          <ToolTip title={numeratorTip}>
            <HelpIcon className="measure-results-table__help-icon" />
          </ToolTip>
        </Grid>
        <Grid item className="measure-results-table__title-align">
          <Typography className="measure-results-table__title">
            Denominator
          </Typography>
          <ToolTip title={denominatorTip}>
            <HelpIcon className="measure-results-table__help-icon" />
          </ToolTip>
        </Grid>
        <Grid item className="measure-results-table__title-align">
          <Typography className="measure-results-table__title">
            Available Exclusions
          </Typography>
          <ToolTip title={availableExclusionsTip}>
            <HelpIcon className="measure-results-table__help-icon" />
          </ToolTip>
        </Grid>
      </Grid>

      {currentResults.map((item) => (
        <Grid
          item
          className="measure-results-table__row"
          key={`chart-container-grid-measure-${item.measure}`}
        >
          <MeasureResultsRow
            measureResult={generateMeasureRowValues(item)}
            handleMeasureChange={handleMeasureChange}
            selectedMeasure={selectedMeasures.includes(item.measure)}
            measureColor={colorMapping.find((mapping) => mapping.measure === item.measure)}
          />
        </Grid>
      ))}
      <Divider className="measure-results-table__divider" />
    </Grid>
  )
}

MeasureResultsTable.propTypes = {
  currentResults: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
  handleMeasureChange: PropTypes.func,
  selectedMeasures: PropTypes.arrayOf(
    PropTypes.string,
  ),
  colorMapping: colorMappingProps,
};

MeasureResultsTable.defaultProps = {
  currentResults: [],
  handleMeasureChange: () => undefined,
  selectedMeasures: [],
  colorMapping: [],
}

export default MeasureResultsTable;
